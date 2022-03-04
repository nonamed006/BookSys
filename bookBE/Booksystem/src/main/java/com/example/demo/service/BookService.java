package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.BookRepository;
import com.example.demo.vo.Book;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
	
	private final BookRepository bookRepository;
	
	// 책 목록 불러오기
	public List<Book> getBookList(){
		return bookRepository.findAll();
	}
	
	// 책 제목으로 책 목록 불러오기
		public List<Book> findByTitle(String title){
			return bookRepository.findByTitle(title);
		}
}
