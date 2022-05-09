# BookSystem

<p align="center">
  <br>
  <img src="./images/common/logo-sample.jpeg">
  <br>
</p>


## 프로젝트 소개

<p align="justify">
프로젝트 개요/동기
</p>

<p align="center">
GIF Images
</p>

<br>

## 기술 스택
**DB**
<br>
<img src="https://img.shields.io/badge/MariaDB-003545?style=flat&logo=MariaDB&logoColor=white"/>
<br>
**Use**<br>
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat&logo=Spring%20Boot&logoColor=white"/>
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=Bootstrap&logoColor=white"/>
<br>
**Tool**<br>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual%20Studio%20Code&logoColor=white"/>
<img src="https://img.shields.io/badge/Eclipse IDE-2C2255?style=flat&logo=Eclipse%20IDE&logoColor=white"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white"/>


<br>

## 구현 기능

### [공통기능]
1.  검색
    

	1.  도서명으로 검색
	    
	2.  출판사명 클릭시 해당 출판사 도서 목록 조회
	    
	3.  빈칸으로 검색시 전체 도서 목록 조회
    

3.  도서 상세보기
    

	1.  댓글 작성
	    
	2.  대여자 확인, 대여일자 확인
	    
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
	    
	5.  출판사별 도서 조회
    

9.  신간 도서
    

	1.  도서 등록순으로 10개 나열
    

11.  인기 많은 도서
    

		1.  대여순으로 5개 나열

### [사용자]
1.  회원가입
    

	1.  빈칸으로 회원가입 불가
	    
	2.  회원가입시 비밀번호는 DB에 암호화되어 추가됨
    

3.  로그인
    

	1.  존재하는 아이디 여부 확인
	    
	2.  비밀번호 일치 여부 확인
    

5.  댓글 작성
    

	1.  도서 상세 보기 페이지내에서 작성 및 삭제 가능
	    
	2.  마이페이지의 ‘내가 쓴 댓글’에서 확인 및 삭제 가능
	    
	3.  댓글 삭제 후 페이지 바로 반영
    

7.  도서 대여
    
	
	1.  날짜 선택 후 대여 가능(무기한, 원하는 날짜 선택)
	    
	2.  날짜 선택하지 않으면 대여 불가
	    

		1.  달력에서 날짜는 선택해도 라디오 버튼 선택하지 않으면 대여 불가
	    

	4.  도서는 3권까지 대여 가능
	    
	5.  비회원은 대여 불가
    

9.  도서 반납
    
	10.  도서 반납일 지나면 대여자는 반납 알림 메일 전송 받음
    
11.  도서 대여후 현재 페이지로 리로드

### 기능 3

### 기능 4

<br>

## 배운 점 & 아쉬운 점

<p align="justify">

</p>

<br>

## 라이센스

MIT &copy; [NoHack](mailto:lbjp114@gmail.com)

<!-- Stack Icon Refernces -->

[js]: <img src="https://user-images.githubusercontent.com/62851841/165425240-df1d1ea1-264f-400e-93c5-55ed12fdcb70.jpg" width="100" height="100"/>
[ts]: /images/stack/typescript.svg
[react]: <img src="https://user-images.githubusercontent.com/62851841/165424102-201aec1b-e34c-4cb2-bcdc-9fc8aa1f4e77.jpeg" width="200" height="400"/>
[node]: /images/stack/node.svg
