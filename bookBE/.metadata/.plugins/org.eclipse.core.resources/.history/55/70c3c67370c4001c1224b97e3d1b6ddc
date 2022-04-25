package com.example.demo.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.RentDto;
import com.example.demo.vo.Book;
import com.example.demo.vo.Rent;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BookRepository {
	
	private final SqlSession sqlSession;
	
	//책 목록 불러오기 
	public List<Book> findAll() {
		return sqlSession.selectList("book.findAll");
	}
	
	// 책 제목으로 책 목록 불러오기 + 검색
	public List<Book> findByTitle(String title) {
		return sqlSession.selectList("book.findByTitle", title);
	}
	
	// 책 제목으로 책 목록 불러오기 + 검색
	public RentDto findByBookNo(int book_no) {
		return sqlSession.selectOne("book.findByBookNo", book_no);
	}
	
	// no로 책 조회
	public Book findByNo(int no) {
		return sqlSession.selectOne("book.findByNo", no);
	}
	
	// 책 대여하기
	public boolean insert(Rent rent) {
		return sqlSession.insert("rent.insert", rent) == 1;
	}
	// 책 대여시 카운트 +1
	public boolean update(int no) {
		return sqlSession.update("book.update", no) == 1;
	}
	
	// 대여 3권 제한
	public int rentCnt(int no) {
		return sqlSession.selectOne("rent.findByNo", no);
	}
		
	// 대여도서 반납
	public boolean delete(int no) {
		return sqlSession.delete("rent.delete", no) == 1;
	}
		
	/* ============= 관리자 ===============*/
		
	// 관리자가 도서 삭제
	public boolean deletebook(int no) {
		return sqlSession.delete("book.deletebook", no) == 1;
	}
		
	// 관리자가 도서 등록
	public boolean insertbook(Book book) {
		return sqlSession.insert("book.insert", book) == 1;
	}
	// 관리자가 도서 수정
		public boolean updatebook(Book book) {
			return sqlSession.insert("book.updateBook", book) == 1;
		}
}
