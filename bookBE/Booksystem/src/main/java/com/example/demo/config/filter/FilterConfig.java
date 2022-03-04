package com.example.demo.config.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class FilterConfig {
	
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		System.out.println("[FilterConfig.java] CORS 필터 등록");
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter());
		bean.addUrlPatterns("/*");		// 전체
		/*
		bean.addUrlPatterns("/user/*");			// 유저
		bean.addUrlPatterns("/patient/*");		// 환자
		bean.addUrlPatterns("/reservation/*");	// 접수, 예약
		bean.addUrlPatterns("/receipt/*");	//예약
		bean.addUrlPatterns("/chat/*");			// 채팅
		bean.addUrlPatterns("/diagnosis/*");			// 진료
		bean.addUrlPatterns("/acceptance/*");			// 수납
		bean.addUrlPatterns("/kanban/*");			// 칸반 
		bean.addUrlPatterns("/mail/*");			// 메일 
		bean.addUrlPatterns("/todolist/*");			// 메일 
		bean.addUrlPatterns("/untact/*");			// 메일
		
		bean.addUrlPatterns("/login/*");		 
		bean.addUrlPatterns("/logout/*");
		*/
		bean.setOrder(0); // 낮은 번호부터 실행됨.
		return bean;
	}
}
