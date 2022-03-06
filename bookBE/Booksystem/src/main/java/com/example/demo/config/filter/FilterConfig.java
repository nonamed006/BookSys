package com.example.demo.config.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class FilterConfig {
	
	private final UserRepository userRepository;

	
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		System.out.println("[FilterConfig.java] CORS 필터 등록");
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter());
		bean.addUrlPatterns("/*");		// 전체
		
		bean.setOrder(0); // 낮은 번호부터 실행됨.
		return bean;
	}
	
	// Login
		@Bean
		public FilterRegistrationBean<JwtAuthenticationFilter> jwtAuthenticationFilter(){
			System.out.println("[FilterConfig.java] Jwt Authentication Filter 필터 등록");
			FilterRegistrationBean<JwtAuthenticationFilter> bean = 
					new FilterRegistrationBean<>(new JwtAuthenticationFilter(userRepository));
			bean.addUrlPatterns("/login");
			bean.setOrder(1);
			return bean;
		}
		
		// 인증이 필요한 요청
		@Bean
		public FilterRegistrationBean<JwtAuthorizationFilter> jwtAuthorizationFilter(){
			System.out.println("[FilterConfig.java] Jwt Authorization Filter 필터 등록");
			FilterRegistrationBean<JwtAuthorizationFilter> bean = 
					new FilterRegistrationBean<>(new JwtAuthorizationFilter(userRepository));
			bean.addUrlPatterns("/user/*");
			bean.setOrder(2);
			return bean;
		}
}
