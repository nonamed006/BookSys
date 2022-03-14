import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const Signup = () => {

	const [user, setUser] = useState({
		id: "",
		pwd: "",
		name: "",
		addr: ""
	});

	// 유저 가입하는거 json.body에 넣어보낼 body만들어야 함 O
	// 가입성공하고 response에 success도 있는데 왜 ok안띄우니... O
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
				console.log(res);
				if (res == 'success') {
					alert("회원가입 되었습니다.");
					window.location.replace("/");
					console.log("ok");
				} else {
					alert("회원가입 실패하였습니다.");
					console.log("fail");
				}
			});
	};

	// input value값 받기 이벤트 
	const onChange = (e) => {
		setUser({ ...user, [e.target.id]: e.target.value });
		console.log(e.target.value);
	};

	// 가입 버튼 클릭시
	const handelClick = () => {
		getUserinfo();
		console.log("클릭됨");
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
			{/* Addr */}
			<Form.Floating className="mb-3">
				<Form.Control
					id="addr"
					type="text"
					placeholder="Address"
					onChange={onChange}
				/>
				<label htmlFor="floatingInputCustom">Address</label>
			</Form.Floating>
			<Button variant="secondary" onClick={handelClick}>Signup</Button>
			</Col>
		</Row>

	);
};

export default Signup;