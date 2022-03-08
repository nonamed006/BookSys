package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.BookRepository;
import com.example.demo.vo.Book;
import com.example.demo.vo.Rent;

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
		
	// 책 대여하기
	public boolean insert(Rent rent) {
		return bookRepository.insert(rent);
	}
	// 책 대여, 반납시 카운트 +1
	public boolean update(int no) {
		return bookRepository.update(no);
	}
	
	// 대여 3권 제한
	public int rentCnt(int no) {
		return bookRepository.rentCnt(no);
	}
	
	// 대여도서 반납
		public boolean delete(int no) {
			return bookRepository.delete(no);
		}
}
