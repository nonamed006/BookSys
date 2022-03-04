import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

const DivContainer = styled.div`
    margin : 0px 500px 0px 500px;
`

const DivBox = styled.div`
    margin:250px 100px 300px 250px;
`

const SpanStyle1 = styled.span`
	/border: 1px solid black;
	margin: 10px;
	width: 200px;
`



const Signup = () => {

	const [user, setUser] = useState({
		id: "",
		pwd: "",
		name: "",
		addr: ""
	});

	//input 값 받기위한 state
	const [id, setId] = useState();
	const [pwd, setPwd] = useState();
	const [name, setName] = useState();
	const [addr, setAddr] = useState();

	// 유저 가입하는거 json.body에 넣어보낼 body만들어야 함 O
	// 가입성공하고 response에 success도 있는데 왜 ok안띄우니...
	var getUserinfo = () => {
		fetch(`http://localhost:8080/signup`, {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json'
			}
			// res에 결과가 들어옴
			// 수정사항 // success받아도 알림창 안띄워줌 ============================================
		}).then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res == 'success') {
					alert("ok");
					debugger;
					console.log("ok");
				} else {
					alert("fail");
					console.log("fail");
				}
			});
	};

	// 이따가 여기 정리

	// input value값 받기 이벤트 - id
	const onChangeID = (e) => {
		setUser({ ...user, id: e.target.value });
		console.log(e.target.value);
	}

	// input value값 받기 이벤트 - pwd
	const onChangePWD = (e) => {
		setUser({ ...user, pwd: e.target.value });
		console.log(e.target.value);
	}

	// input value값 받기 이벤트 - name
	const onChangeName = (e) => {
		setUser({ ...user, name: e.target.value });
		console.log(e.target.value);
	}

	// input value값 받기 이벤트 - addr
	const onChangeAddr = (e) => {
		setUser({ ...user, addr: e.target.value });
		console.log(e.target.value);
	}


	// 가입 버튼 클릭시
	const handelClick = () => {
		getUserinfo();
		console.log("클릭됨");
	}


	return (
		<DivContainer>
			<DivBox>
				<h2>Signup</h2> <br />
				{/*회원가입폼*/}
				<Row>
						<Col xl='8'>
					<Form.Floating className="mb-3">
						<Form.Control
							id="id"
							type="text"
							placeholder="Id"
							onChange={onChangeID}
						/>
						<label htmlFor="floatingInputCustom">ID</label>
					</Form.Floating>
					</Col>
					</Row>

					<Row>
						<Col xl='8'>
					<Form.Floating className="mb-3">
						<Form.Control
							id="pwd"
							type="password"
							placeholder="Password"
							onChange={onChangePWD}
						/>
						<label htmlFor="floatingPasswordCustom">Password</label>
					</Form.Floating>
					</Col>
					</Row>

					<Row>
						<Col xl='8'>
					<Form.Floating className="mb-3">
						<Form.Control
							id="name"
							type="text"
							placeholder="Name"
							onChange={onChangeName}
						/>
						<label htmlFor="floatingInputCustom">Name</label>
					</Form.Floating>
					</Col>
					</Row>

					<Row>
						<Col xl='8'>
					<Form.Floating className="mb-3">
						<Form.Control
							id="addr"
							type="text"
							placeholder="Address"
							onChange={onChangeAddr}
						/>
						<label htmlFor="floatingInputCustom">Address</label>
					</Form.Floating>
					</Col>
					</Row>
				<Button variant="secondary" onClick={handelClick}>Signup</Button>
			</DivBox>

		</DivContainer>
	);
};

export default Signup;