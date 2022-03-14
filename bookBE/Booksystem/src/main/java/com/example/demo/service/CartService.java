package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.CartReopository;
import com.example.demo.vo.Cart;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

	private final CartReopository cartReopository;
	
	// 유저 - 회원가입 / 가입 성공시 1 반환
		public boolean insert(Cart cart) {
			return cartReopository.insert(cart);
		}
		
	// no로 장바구니 조회
	public List<Cart> findByNo(int user_no) {
		return cartReopository.findByNo(user_no);
	}
}
