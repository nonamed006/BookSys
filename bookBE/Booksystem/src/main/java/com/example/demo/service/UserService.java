package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.RentDto;
import com.example.demo.repository.UserRepository;
import com.example.demo.vo.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserRepository userRepository;
	
	// 유저 - 회원가입
	public void insert(User user) {
		userRepository.insert(user);
	}
	
	// no로 유저 찾기
	public User findById(int personId) {
		return userRepository.findById(personId);
	}
	
	// mypage에 사용자가 대여한 책 목록 조회
	public List<RentDto> findByUserNo(int user_no){
		return userRepository.findByUserNo(user_no);
	}
	// 유저- 회원 정보 수정
	public boolean udpate(User user) {
		return userRepository.udpate(user);
	}
		
	// 전체 유저 목록 조회
	public List<User> findAll(String name){
		return userRepository.findAll(name);
	}
	
	// 회원 삭제
	public boolean delete(int no) {
		return userRepository.delete(no);
	}
	
	}
