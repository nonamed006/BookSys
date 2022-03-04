package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.UserService;
import com.example.demo.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	// 회원가입 - 성공시 success 반환
	@PostMapping("/signup")
	public String insertUser(@RequestBody User user) {
		System.out.println(user);
		userService.insert(user);
		return "success";
	}
	
	// 로그인
	@GetMapping("/login/{id}/{pwd}")
	public User login(@PathVariable String id, @PathVariable String pwd) {
		System.out.println("로그인 들어옴");
		userService.findById(id);
		return userService.findById(id);
	}
}
