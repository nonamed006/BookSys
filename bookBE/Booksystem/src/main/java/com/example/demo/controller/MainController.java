package com.example.demo.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BookService;
import com.example.demo.service.UserService;
import com.example.demo.vo.Book;
import com.example.demo.vo.Rent;
import com.example.demo.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MainController {

	private final BookService bookService;
	private final UserService userService;
	private final HttpSession session;
	
	// 헤더에 사용자 정보 담기
	@GetMapping("/user/head")
	public User findById(Integer personId) {
		User userinfo = (User)session.getAttribute("userinfo");
		personId = userinfo.getNo();
		return userService.findById(personId);
	}
	
	// 책 리스트 불러옴
	@GetMapping("/main")
	public List<Book> findBookList2() {
		List<Book> book = bookService.getBookList();
		return book;
	}
	
	// 책 제목으로 책 리스트 불러옴 + 검색
		@GetMapping("/main/{title}")
		public List<Book> findBookList(@PathVariable String title) {
			
			if(title.equals("notSearch")) title = "";
			
			title = "%" + title + "%";
			List<Book> book = bookService.findByTitle(title);
			return book;
		}
	 // 책 대여
		@GetMapping("/user/main/{bookno}")
		public String rentBook(@PathVariable int bookno) {
			
			Rent rent = new Rent();
			
			User userinfo = (User)session.getAttribute("userinfo");
			
			int cnt = bookService.rentCnt(userinfo.getNo());
			
			rent.setUser_no(userinfo.getNo());
			rent.setUser_id(userinfo.getId());
			rent.setBook_no(bookno);
			
			// 사용자가 대여한 책이 3권 미만일 경우 대여가능
			if(cnt < 3) {
				if(bookService.insert(rent)) {
					// 책 대여시 usebook에 카운트 +1
					bookService.update(bookno);
					return "success";
				} else {
					return "fail";
				}
			} else {
				return "failCnt";
			}
			
		}
		
	// 책 반납
		@GetMapping("/mypage/delete/{no}")
		public String returnBook(@PathVariable int no) {
			
			if(bookService.delete(no)) {
				// 책 대여시 usebook에 카운트 +1
				bookService.update(no);
				return "success";
			}else {
				return "fail";
			}
		}
		
}
