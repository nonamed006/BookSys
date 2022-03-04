package com.example.demo.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.example.demo.vo.User;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository {

	private final SqlSession sqlSession;
	
	// 유저 - 회원가입 / 가입 성공시 1 반환
	public boolean insert(User user) {
		return sqlSession.insert("user.insert", user) == 1;
	}
	
	// 유저 - 로그인
	public User findById(String id) {
		return sqlSession.selectOne("user.findByID", id);
	}
}
