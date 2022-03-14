package com.example.demo.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.example.demo.vo.Cart;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CartReopository {
	
	private final SqlSession sqlSession;
	
	// 유저 - 회원가입 / 가입 성공시 1 반환
	public boolean insert(Cart cart) {
		return sqlSession.insert("cart.insert", cart) == 1;
	}
	
	// no로 장바구니 조회
	public List<Cart> findByNo(int user_no) {
		return sqlSession.selectList("cart.findByNo", user_no);
	}
}
