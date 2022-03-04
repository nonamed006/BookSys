package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BookService;
import com.example.demo.vo.Book;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MainController {

	private final BookService bookService;
	
	// 책 리스트 불러옴
	@GetMapping("/main")
	public List<Book> findBookList2() {
		List<Book> book = bookService.getBookList();
		System.out.println(book);
		return book;
	}
	
	// 책 제목으로 책 리스트 불러옴 + 검색
		@GetMapping("/main/{title}")
		public List<Book> findBookList(@PathVariable String title) {
			
			if(title.equals("notSearch")) title = "";
			
			title = "%" + title + "%";
			List<Book> book = bookService.findByTitle(title);
			
			System.out.println(book);
			return book;
		}
}
