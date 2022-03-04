package com.example.demo.service;

import org.springframework.stereotype.Service;

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
	// 유저 - 로그인
	public User findById(String id) {
		return userRepository.findById(id);
	}
	}
