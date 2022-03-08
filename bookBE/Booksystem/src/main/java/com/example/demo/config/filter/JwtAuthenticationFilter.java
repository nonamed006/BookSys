package com.example.demo.config.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.repository.UserRepository;
import com.example.demo.vo.User;
import com.fasterxml.jackson.databind.ObjectMapper;


/*
로그인 
- method : post
- succsess : "ok" return
	- JWT 생성에 사용되는 변수 (JwtProps.java)
	  secret = "비밀키"
  auth   = "Bearer "
  header = "Authorization"
*/
public class JwtAuthenticationFilter implements Filter{

private UserRepository userRepository;


public JwtAuthenticationFilter(UserRepository userRepository) {
	this.userRepository = userRepository;
}

@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
		throws IOException, ServletException {
	System.out.println("[JwtAuthenticationFilter.java] JwtAuthenticationFilter 작동");
	
	HttpServletRequest req = (HttpServletRequest) request;
	HttpServletResponse resp = (HttpServletResponse) response;
	resp.setContentType("text/html; charset=UTF-8"); 
	PrintWriter out = resp.getWriter();
	
	String method = req.getMethod();
	// System.out.println(method);
	
	if(!method.equals("POST")) {
		out.print("POST요청 아님");
		out.flush();
	}else {
		ObjectMapper om = new ObjectMapper();
		try {
			
			System.out.println("ddddd");
			User person = om.readValue(req.getInputStream(), User.class);
			System.out.println(person.getId());
			// 입력한 ID의 개수 == 0 => ID가 없음
			if(userRepository.countById(person.getId())==0) {
				System.out.println("111");
				out.print("존재하지 않는 ID 입니다");
				out.flush();
			// ID가 존재하는 경우
			}else {
				System.out.println("222");
				// ID, PWD에 해당하는 User를 조회
				User personEntity = 
						userRepository.findByIdAndPwd(person.getId(), person.getPwd());
				// 조회가 안 되는 경우는 비밀번호가 틀린 경우
				if(personEntity == null) {
					out.print("비밀번호가 틀렸습니다");
					out.flush();
				// 로그인에 성공한 경우
				}else {
					System.out.println("[JwtAuthenticationFilter.java]" + personEntity.getName() + "로그인");
					// 토큰 생성 (입력된 값들을 토대로 암호화 해서 토큰을 준다)
					String jwtToken = 
							JWT.create()
							.withSubject("토큰제목")
							// 토큰의 유효시간 설정(1000*60*60*24*365)
							// 1시간으로 설정
							.withExpiresAt(new Date(System.currentTimeMillis()+1000*60*60))
							//.withExpiresAt(new Date(System.currentTimeMillis()+1000*5))
							.withClaim("no", personEntity.getNo())
							.sign(Algorithm.HMAC512(JwtProps.secret));
					
					// 생성된 토큰을 헤더에 넘겨줌. Bearer + 암호화 된 값을 넘겨주기 때문에 FE에서는 Bearer를 활용해 구분할 수 있다
					resp.addHeader(JwtProps.header, JwtProps.auth+jwtToken);
					String name = personEntity.getName();
					out.print("success "+name);
					out.flush();
					
				}
			}
		} catch (Exception e) {
			System.out.println("오류 : " + e.getMessage());
		}
	}
}
}
