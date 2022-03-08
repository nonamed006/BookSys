package com.example.demo.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RentDto;
import com.example.demo.service.UserService;
import com.example.demo.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final HttpSession session;
	
	// 회원가입 - 성공시 success 반환
	@PostMapping("/signup")
	public String insertUser(@RequestBody User user) {
		System.out.println(user);
		userService.insert(user);
		return "success";
	}
	
	// mypage 대여 도서 목록 조회
	@GetMapping("user/rentlist")
	public List<RentDto> rentList(Integer user_no){
		
		User userinfo = (User)session.getAttribute("userinfo");
		user_no = userinfo.getNo();
		
		List<RentDto> rentList = userService.findByUserNo(user_no);
		
		return rentList;
	}
	
	// 전체 유저 조회
	@GetMapping("/selectuser/{name}")
	public List<User> findAll(@PathVariable String name){
		
		if(name.equals("notSearch")) name = "";
		
		name = "%" + name + "%";
		List<User> user = userService.findAll(name);
		return user;
	}
	
	// 회원 삭제
	@GetMapping("/adminpage/deleteuser/{no}")
	public String returnBook(@PathVariable int no) {
		
		if(userService.delete(no)) {
			return "success";
		}else {
			return "fail";
		}
	}
}
