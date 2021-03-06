package com.example.demo.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.example.demo.vo.Reply;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReplyRepository {
	
	private final SqlSession sqlSession;
	
	// 댓글 작성
	public boolean insert(Reply reply) {
		return sqlSession.insert("reply.insert", reply) == 1;
	}
	
	// no로 댓글 조회
	public List<Reply> findByNo(int book_no){
		return sqlSession.selectList("reply.findByNo", book_no);
	}
	
	// 유저 no로 댓글 조회
	public List<Reply> findByUserNo(int user_no){
		return sqlSession.selectList("reply.findByUserNo", user_no);
	}
	
	// 댓글 삭제
	public boolean deleteReply(int no) {
		return sqlSession.delete("reply.deleteReply", no) == 1;
	}
}
