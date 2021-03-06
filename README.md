# BookSystem

<p align="center">
  <br>
  <img src="https://user-images.githubusercontent.com/62851841/167341171-3b430edb-cac2-4314-a83f-e777374c605c.png">
  <br>
</p>


## 프로젝트 소개

**1. 개발기간**<br>
<p>2022.03.03~2022.03.14 </p>
<p>2022.04.28~2022.05.03(기능 추가)</p>

**2. 프로젝트 개요**<br>
<p>도서 대여, 반납 및 도서 관리 기능을 제공하는 시스템</p>
<p>사용자와 관리자로 구분. </p>
<p>사용자에게 도서 대여, 반납, 검색, 댓글 달기 기능을 제공</p>
<p>관리자에게 사용자 조회, 수정, 삭제 관리 및 도서 등록, 삭제, 수정 관리, 댓글 삭제 기능 제공</p>


<br>

## 기술 스택
**DB**
<br>
<img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=MariaDB&logoColor=white"/>
<br>
**Use**<br>
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=Spring%20Boot&logoColor=white"/>
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"/>
<br>
**Tool**<br>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual%20Studio%20Code&logoColor=white"/>
<img src="https://img.shields.io/badge/Eclipse IDE-2C2255?style=flat-square&logo=Eclipse%20IDE&logoColor=white"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white"/>


<br>

## 구현 기능

### [공통기능]
1.  검색
    

	1.  도서명으로 검색
	  
	2.  도서명 클릭시 해당 도서 상세페이지로 이동 
	    
	3.  출판사명 클릭시 해당 출판사 도서 목록 조회
	    
	4.  빈칸으로 검색시 전체 도서 목록 조회
    

3.  도서 상세보기
    

	1.  댓글 작성 및 댓글 목록 보기
	    
	2.  해당 도서 대여중일 경우 페이지 내에서 대여자 확인, 대여일자 확인 가능
	    
	3.  뒤로가기 버튼
	    

5.  댓글 작성
    

	1.  비회원은 댓글 작성 불가
	    
	2.  빈칸으로 댓글 작성 불가
	    
	3.  본인 댓글 삭제 가능
	    
	4.  관리자는 모든 댓글 삭제 가능
    

7.  도서 목록
    

	1.  페이지당 10개 목록 조회
	    
	2.  페이징 버튼 기본 5개, 존재하는 페이지만 버튼 활성화
	    
	3.  보기 방식 변경 가능(이미지 없이 보기, 이미지와 보기)
	    
	4.  카테고리별 도서 조회
	    
	5.  출판사명 클릭시 출판사별 도서 조회
	
	6.  도서명 클릭시 해당 도서 상세페이지로 이동 
    

9.  신간 도서
    

	1.  도서 등록순으로 10개 나열
    

11.  인기 많은 도서
    

		1.  대여순으로 5개 나열

### [사용자]
1.  회원가입
    

	1.  빈칸으로 회원가입 불가
	 
	2.  회원가입시 비밀번호는 DB에 암호화되어 추가됨

	3.  가입시 다음 주소 API로 주소 입력  
    

3.  로그인
    

	1.  존재하는 아이디 여부 확인
	    
	2.  비밀번호 일치 여부 확인
    

5.  댓글 작성
    

	1.  도서 상세 보기 페이지내에서 작성 및 내 댓글 삭제 가능
	    
	2.  마이페이지의 ‘내가 쓴 댓글’에서 확인 및 삭제 가능
	    
	3.  댓글 삭제 후 페이지 바로 반영
    

7.  도서 대여
    
	
	1.  날짜 선택 후 대여 가능(무기한과 원하는 날짜 라디오 버튼으로 선택)
	    
	2.  날짜 선택하지 않으면 대여 불가
	    

		1.  달력에서 날짜는 선택해도 라디오 버튼 선택하지 않으면 대여 불가
	    

	4.  도서는 3권까지 대여 가능
	    
	5.  비회원은 대여 불가
    

9.  도서 반납
    
	1.  도서 반납일 지나면 대여자는 반납 알림 메일 전송 받음
    
11.  도서 대여후 현재 페이지로 리로드

### [관리자]
1.  회원 삭제
    

	1.  도서 대여중인 회원은 삭제 불가
    

3.  도서 등록 및 목록 페이지
    

	1.  페이지 내에서 사용자가 대여중인 도서 확인 가능
    
	2.  빈칸으로 등록 불가
	    
	3.  이미지 파일 첨부시 이미지 미리보기 제공
	
	4.  확장자 jpg, png, jpeg만 등록 가능(잘못된 확장자 알림 메시지 띄움)
    

5.  도서 수정
    

	1.  사용자가 대여중인 도서 수정 불가
    

7.  도서 삭제
    

	1.  사용자가 대여중인 도서 삭제 불가
    

9.  댓글 관리
    

	1.  관리자가 댓글 작성시 (괄호)안에 관리자 표시
	    
	2.  관리자는 모든 댓글 삭제 가능
    

11.  관리자 계정은 도서 대여 불가

