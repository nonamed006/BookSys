package com.example.demo.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.RentDto;
import com.example.demo.vo.Book;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BookRepository {
	
	private final SqlSession sqlSession;
	
	//책 목록 불러오기 
	public List<Book> findAll() {
		return sqlSession.selectList("book.findAll");
	}
	//신간도서 
	public List<Book> findNewBook() {
		return sqlSession.selectList("book.findNewBook");
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
	public boolean insert(int bookno, int user_no, String user_id, String return_date) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("book_no", bookno);
		map.put("user_no", user_no);
		map.put("user_id", user_id);
		map.put("return_date", return_date);
		
		return sqlSession.insert("rent.insert", map) == 1;
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
	
	//책 목록 대여순으로 불러오기 
		public List<Book> findRank() {
			return sqlSession.selectList("book.findRank");
		}
		
	// 카테고리로 책 목록 불러오기  
		public List<RentDto> findBookByCat(String category, int pageNum) {
			Map<String, Object> map = new HashMap<String, Object>();
			
			map.put("category", category);
			map.put("pageNum", pageNum);
			return sqlSession.selectList("book.findBookByCat", map);
		}
	// 출판사로 책 목록 불러오기  
		public List<Book> findBookByPub(String publisher) {
			return sqlSession.selectList("book.findBookByPub", publisher);
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
		
//	페이징
		
	// 페이징 위한 총 데이터 카운트
	public int getCountRes(String category) {
		return sqlSession.selectOne("book.pageBookCount", category);
	}
}
