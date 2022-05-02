package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.RentDto;
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
	
	// 신간도서
	public List<Book> findNewBook(){
		return bookRepository.findNewBook();
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
	public boolean insert(int bookno, int user_no, String user_id, String return_date) {
		return bookRepository.insert(bookno, user_no, user_id, return_date);
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
	
	// 책 목록 불러오기
		public List<Book> getBookRank(){
			return bookRepository.findRank();
		}
		
	// 카테고리로 책 목록 조회
		public List<RentDto> getBookCategory(String category, int pageNum){
			return bookRepository.findBookByCat(category, pageNum);
		}
	// 카테고리로 책 목록 조회
		public List<Book> findBookByPub(String publisher){
			return bookRepository.findBookByPub(publisher);
		}
	// ====================== 관리자 ==================================
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
	
	// 페이징
	// 페이징 위한 도서 개수 카운트
	public int getCountRes(String category) {
		return bookRepository.getCountRes(category);
	}
}
