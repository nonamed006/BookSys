package com.example.demo.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

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
	
	// 책 제목으로 책 목록 불러오기 + 검색
	public List<Book> findByTitle(String title) {
		return sqlSession.selectList("book.findByTitle", title);
	}
}
