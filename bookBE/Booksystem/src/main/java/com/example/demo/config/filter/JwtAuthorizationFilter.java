package com.example.demo.config.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.repository.UserRepository;
import com.example.demo.vo.User;

/*
인증
- FE
  header JWT [key:"Authorization", value:token]
- JWT 생성에 사용되는 변수 (JwtProps.java)
	  secret = "비밀키"
  auth   = "Bearer "
  header = "Authorization" 
- 인증이 필요한 경우 반드시 JwtAuthorizationFilter를 태워서 session에 user정보를 담아가야 한다
  url : bean.addUrlPatterns("/user/*") => FilterConfig.java
*/
public class JwtAuthorizationFilter implements Filter {

private UserRepository userRepository;

public JwtAuthorizationFilter(UserRepository userRepository) {
	this.userRepository = userRepository;
}

@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
		throws IOException, ServletException {
	System.out.println("[JwtAuthorizationFilter.java] JwtAuthorizationFilter 작동");

	HttpServletRequest req = (HttpServletRequest) request;
	HttpServletResponse resp = (HttpServletResponse) response;
	resp.setContentType("text/html; charset=UTF-8"); 

	// header = "Authorization" 이기 때문에 FE에서 JWT를 담을 때 key를 "Authorization"로 달아야 한다
	String jwtToken = req.getHeader(JwtProps.header);

	// header에 token이 없는 경우
	if (jwtToken == null) {
		PrintWriter out = resp.getWriter();
		out.print("[JwtAuthorizationFilter.java] jwtToken not found");
		out.flush();
	// token이 있는 경우
	} else {
		try {
			// "Bearer " 부분 지워주기 
			jwtToken = jwtToken.replace(JwtProps.auth, "");
			// token으로 UserId 찾기
			int personId = JWT.require(Algorithm.HMAC512(JwtProps.secret)).build().verify(jwtToken).getClaim("no").asInt();
			System.out.println("[JwtAuthorizationFilter.java] UserId : " + personId);
			HttpSession session = req.getSession();
			//User personEntity = (User)(userRepository.findById(personId).orElseThrow(()-> new IllegalArgumentException("는 존재하지 않습니다.")));
			User personEntity = userRepository.findById(personId);
			// token으로 User를 찾아서 session에 담아둠으로써 이후 Controller 등에서 session에 있는 userinfo을 가져오면 로그인 한 유저가 누군지 알 수 있다 
			System.out.println("#####" + personEntity);
			
			session.setAttribute("userinfo", personEntity);
		}catch(Exception e){
			PrintWriter out = resp.getWriter();
			out.print("[JwtAuthorizationFilter.java] verify fail");
			out.flush();
			e.printStackTrace();
		}
		
		try {
			chain.doFilter(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
}
