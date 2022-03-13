package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.RentDto;
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
	
	// no로 책 조회
	public Book findByNo(int no) {
		return bookRepository.findByNo(no);
	}
	
	// 책 제목으로 책 목록 불러오기 + 검색
	public RentDto findByBookNo(int book_no) {
		return bookRepository.findByBookNo(book_no);
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
	// 관리자가 도서 삭제
	public boolean deletebook(int no) {
		return bookRepository.deletebook(no);
	}
	// 관리자가 도서 등록
	public boolean insertbook(Book book) {
		return bookRepository.insertbook(book);
	}
	// 관리자가 도서 수정
	public boolean updatebook(Book book) {
		return bookRepository.updatebook(book);
	}
}
