package com.example.demo.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RentDto;
import com.example.demo.dto.RentUserDto;
import com.example.demo.service.BookService;
import com.example.demo.service.UserService;
import com.example.demo.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final BookService bookService;
	private final HttpSession session;
	
	// 회원가입 - 성공시 success 반환 -----------------------------------------------
	@PostMapping("/signup")
	public String insertUser(@RequestBody User user) {
		System.out.println(user.getTeam() == "");
		if(user.getId() == "") {
			return "noID";
		} else if(user.getPwd() == "") {
			return "noPWD";
		} else if(user.getName() == "") {
			return "noName";
		} else if(user.getTeam() == "") {
			return "noTeam";
		} else if(user.getAddr() == "") {
			return "noAddr";
		}
		userService.insert(user);
		return "success";
	}
	
	// mypage 대여 도서 목록 조회 -----------------------------------------------
	@GetMapping("user/rentlist")
	public List<RentDto> rentList(Integer user_no){
		
		User userinfo = (User)session.getAttribute("userinfo");
		user_no = userinfo.getNo();
		
		List<RentDto> rentList = userService.findByUserNo(user_no);
		return rentList;
	}
	
	// 복호화 된 암호 얻기
	
	
	// book_no로 대여자 조회
	@GetMapping("/rentbook/{book_no}")
	public RentUserDto rentUser(@PathVariable int book_no) {
		
		RentUserDto rendto = new RentUserDto();
		System.out.println(rendto);
		if(userService.findByRentUser(book_no) == null) {
			return rendto;
		}else {
			return userService.findByRentUser(book_no);
		}
	}
	
	// 유저 - 회원 정보 수정 -----------------------------------------------
	@GetMapping("/user/updateuser/{pwd}/{addr}")
	public String update(@PathVariable String pwd, @PathVariable String addr){
		
		User userinfo = (User)session.getAttribute("userinfo");
		User user = new User();
		
		user.setNo(userinfo.getNo());
		user.setPwd(pwd);
		user.setAddr(addr);
		
		if(userService.udpate(user)) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 전체 유저 조회 -----------------------------------------------
	@GetMapping("/user/selectuser/{name}")
	public List<User> findAll(@PathVariable String name){
		
		if(name.equals("notSearch")) name = "";
		
		name = "%" + name + "%";
		List<User> user = userService.findAll(name);
		return user;
	}
	
	// 회원 삭제 -----------------------------------------------
	@GetMapping("/adminpage/deleteuser/{no}")
	public String returnBook(@PathVariable int no) {
		
		int cnt = bookService.rentCnt(no);
		if(cnt>=1) {
			return "useBook";
		}
		if(userService.delete(no)) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	
}
