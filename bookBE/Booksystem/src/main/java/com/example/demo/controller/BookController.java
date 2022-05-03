package com.example.demo.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BookService;
import com.example.demo.service.ReplyService;
import com.example.demo.vo.Reply;
import com.example.demo.vo.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BookController {
	
	private final ReplyService replyService;
	private final BookService bookService;
	private final HttpSession session;
	
	// 댓글 작성
	@PostMapping("/user/reply")
	public String insert(@RequestBody Reply reply) {
		
		User userinfo = (User) session.getAttribute("userinfo");
		Reply reply2 = new Reply();
		
		reply2.setComment(reply.getComment());
		reply2.setBook_no(reply.getBook_no());
		reply2.setUser_no(userinfo.getNo());
		
		if(reply.getComment() == "") {
			return "noComments";
		} 
		 
		if(replyService.insert(reply2)) {
			return "success";
		}else {
			return "fail";
		}
		
	}
	
	// no로 댓글 조회
	@GetMapping("/bookdetail/reply/{book_no}")
	public List<Reply> findByNo(@PathVariable int book_no){
		return replyService.findByNo(book_no);
	}
	
	// 유저 no로 댓글 조회
	@GetMapping("/user/reply")
	public List<Reply> findByUserNo(){
		User userinfo = (User) session.getAttribute("userinfo");
		return replyService.findByUserNo(userinfo.getNo());
	}
	
	// 댓글 삭제
	@GetMapping("/user/reply/del/{no}")
	public String deleteReply(@PathVariable int no) {
		if(replyService.deleteReply(no)) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	// 페이징위한 도서 총 개수 
	@GetMapping("/bookcount/{category}")
	public int bookCount(@PathVariable String category) {
		if (category.equals("notSearch"))
			category = "";

		category = "%" + category + "%";
		return bookService.getCountRes(category);
	}
	

}
