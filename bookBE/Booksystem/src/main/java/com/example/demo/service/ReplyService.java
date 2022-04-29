package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.ReplyRepository;
import com.example.demo.vo.Reply;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReplyService {
	
	private final ReplyRepository replyRepository;
	
	// 댓글 작성
	public boolean insert(Reply reply) {
		return replyRepository.insert(reply);
	}
	
	// no로 댓글 조회
	public List<Reply> findByNo(int book_no){
		return replyRepository.findByNo(book_no);
	}
	
	// 유저 no로 댓글 조회
	public List<Reply> findByUserNo(int user_no){
		return replyRepository.findByUserNo(user_no);
	}
	
	// 댓글 삭제
	public boolean deleteReply(int no) {
		return replyRepository.deleteReply(no);
	}
}
