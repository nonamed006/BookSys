package com.example.demo.repository;

import java.util.HashMap;
import java.util.Map;

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
	public int countById(String id) {
		return sqlSession.selectOne("user.countById", id);
	}
	
	public User findByIdAndPwd(String id, String pwd) {
		Map<String, Object> map = new HashMap<>();
		map.put("id", id);
		map.put("pwd", pwd);
		return sqlSession.selectOne("user.findByIdAndPwd", map);
	}
	
	public User findById(int personId) {
		return sqlSession.selectOne("user.findById", personId);
	}
	
}
