import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DaumPost from '../DaumPost';

const Signup = () => {

	const [user, setUser] = useState({
		id: "",
		pwd: "",
		name: "",
		team: "",
		addr: ""
	});

	// 셀렉트 박스에 추가할 팀 정보 -- 반복문으로 자동 추가
	const teamList = ['경영기획팀', '메타버스플랫폼팀', '연구개발1팀', '연구개발2팀', '연구개발3팀',
		'영업사업팀', '응용모바일개발팀', '전략사업팀', '제품기획관리팀', '컨셉아트개발팀', '컨텐츠생산1팀',
		'컨텐츠생산2팀', '하드웨어생산팀', 'R&D개발팀'];

	var getUserinfo = () => {
		fetch(`http://localhost:8080/signup`, {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			}
			// res에 결과가 들어옴
			// 수정사항 // success받아도 알림창 안띄워줌 ============================================
		}).then((res) => res.text())
			.then((res) => {
				if (res == 'success') {
					alert("회원가입 되었습니다.");
					window.location.replace("/");
				} else {
					alert("회원가입 실패하였습니다.");
				}
			});
	};

	// input value값 받기 이벤트 
	const onChange = (e) => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};

	// 가입 버튼 클릭시
	const handelClick = () => {
		getUserinfo();
	}

	// 카카오 주소 API 추가
	const getPost = (post) => {
		setUser({ ...user, addr: post });
	}

	return (
		<Row>
			<Col xl="4"></Col>
			<Col xl="4">
				<br />
				<h2>Signup</h2> <br />
				{/* ID */}
				<Form.Floating className="mb-3">
					<Form.Control
						id="id"
						type="text"
						placeholder="Id"
						onChange={onChange}
					/>
					<label htmlFor="floatingInputCustom">ID</label>
				</Form.Floating>

				{/* PWD */}
				<Form.Floating className="mb-3">
					<Form.Control
						id="pwd"
						type="password"
						placeholder="Password"
						onChange={onChange}
					/>
					<label htmlFor="floatingPasswordCustom">Password</label>
				</Form.Floating>
				{/* Name */}
				<Form.Floating className="mb-3">
					<Form.Control
						id="name"
						type="text"
						placeholder="Name"
						onChange={onChange}
					/>
					<label htmlFor="floatingInputCustom">Name</label>
				</Form.Floating>
				{/* Team */}
				<Form.Select size="lg" className="mb-3" id="team" onChange={onChange} style={{ fontSize: '16px', padding: '14px' }}>
					<option>소속 부서 선택</option>
					{teamList.map((teamName, index) => <option key={index}>{teamName}</option>)}
				</Form.Select>
				{/* Addr */}
				<Form.Floating className="mb-3">
					<Form.Control
						id="addr"
						type="text"
						placeholder="Address"
						value={user.addr || ""}
						onChange={onChange}
					/>
					<label htmlFor="floatingInputCustom">Address</label>
				</Form.Floating>
				<DaumPost getPost={getPost} /> <br /><br />
				<Button variant="secondary" onClick={handelClick}>Signup</Button>
			</Col>
		</Row>

	);
};

export default Signup;