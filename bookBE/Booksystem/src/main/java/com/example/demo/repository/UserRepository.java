package com.example.demo.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.RentDto;
import com.example.demo.dto.RentMailDto;
import com.example.demo.dto.RentUserDto;
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
	
	//복호화된 암호 얻기
	public User findByDecrypt(int no, String pwd) {
		Map<String, Object> map = new HashMap<>();
		map.put("no", no);
		map.put("pwd", pwd);
		return sqlSession.selectOne("user.findByDecrypt", map);
	}
	
	// 유저- 회원 정보 수정
	public boolean udpate(User user) {
		return sqlSession.update("user.update", user) == 1;
	}
	// no로 유저 찾기
	public User findById(int personId) {
		return sqlSession.selectOne("user.findById", personId);
	}
	
	// mypage에 사용자가 대여한 책 목록 조회
	public List<RentDto> findByUserNo(int user_no){
		return sqlSession.selectList("rent.findByUserNo", user_no);
	}
	
	// 반납일 지난 회원에게 메일 발송 위한 조회
		public List<RentMailDto> sendMail(){
			return sqlSession.selectList("rent.sendMail");
		}
	
	// 책 no로 대여자 조회
	public RentUserDto findByRentUser(int book_no) {
		return sqlSession.selectOne("rent.findByRentUser", book_no);
	}
		
	// 전체 유저 목록 조회
	public List<User> findAll(String name){
		return sqlSession.selectList("user.findAll", name);
	}
	
	// 회원 삭제
	public boolean delete(int no) {
		return sqlSession.delete("user.delete", no) == 1;
	}
	
}
