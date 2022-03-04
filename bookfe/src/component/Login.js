import { Button, Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import styled from 'styled-components';
import Main from './Main';


const DivContainer = styled.div`
    margin : 0px 500px 0px 500px;
`

const DivBox = styled.div`
    margin:250px 100px 300px 150px;
    /background-color: #1971c2;
`

const Login = () => {

	const [id, setId] = useState();
	const [pwd, setPwd] = useState();
	const [status, setStatus] = useState('1');

	var getuser = () => {
		fetch(`http://localhost:8080/login/${id}/${pwd}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				if (res) {
					console.log(res);
					alert(res.id + "님 환영합니다.");
				} else {
					// 수정사항 알림창 안뜸 ====================================
					alert("아이디/비밀번호를 확인해주세요");
				}
			});
	};

	// 버튼 클릭시 로그인
	const handelClick = () => {
		getuser();
		setStatus('2');
		console.log("클릭됨");
	}

	// input 값 받기 - id
	const onChangeId = (e) => {
		setId(e.target.value);
		console.log(e.target.value);
	}

	// input 값 받기 - pwd
	const onChangePwd = (e) => {
		setPwd(e.target.value);
	}
	if (status == '1') {
		return (
			<DivContainer>
				<DivBox>
					<h2>login</h2> <br />
					<Row>
						<Col xl='7'>
					<Form.Floating className="mb-3">
						<Form.Control
							id="id"
							type="text"
							placeholder="Id"
							onChange={onChangeId}
						/>
						<label htmlFor="floatingInputCustom">ID</label>
					</Form.Floating>
					</Col>
					</Row>
					<Row>
						<Col xl='7'>
					<Form.Floating>
						<Form.Control
							id="pwd"
							type="password"
							placeholder="Password"
							onChange={onChangePwd}
						/>
						<label htmlFor="floatingPasswordCustom">Password</label>
					</Form.Floating>
					</Col>
					</Row>
					<br/>
					<Button variant="secondary" onClick={handelClick}>login</Button>
				</DivBox>
			</DivContainer>
		);
	} else if (status == '2') {
		<Main />
	}

};

export default Login;