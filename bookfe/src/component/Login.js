import { Button, Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const DivContainer = styled.div`
    /margin : 0px 500px 0px 500px;
`

const DivBox = styled.div`
    margin:250px 100px 300px 150px;
    /background-color: #1971c2;
`

const Login = (props) => {

	const user = props.user;
	const setUser = props.setUser;

	const [id, setId] = useState();
	const [pwd, setPwd] = useState();


	// 버튼 클릭시 로그인
	const handelClick = () => {
		let person = {
			id: id,
			pwd: pwd,
		}
		fetch("http://localhost:8080/login", {
			method: "POST",
			body: JSON.stringify(person),
			headers: {
				'Content-Type': "application/json; charset=utf-8"
			}
		}).then(res => {
			for (let header of res.headers.entries()) {
				if (header[0] === "authorization") {
					let data = header[1];
					//data = data.substring(7);
					localStorage.setItem("Authorization", data);
					console.log(res);

					fetch("http://localhost:8080/user/head", {
						method: "get",
						headers: {
							'Content-Type': "application/json; charset=utf-8",
							'Authorization': localStorage.getItem("Authorization")
						}
					}).then((res) => res.json())
						.then((res) => {
							setUser(res);
							console.log(res);
						});
					//setToken();
				}
			}
			return res.text();
		}).then(
			res => {
				if (res.substring(0, 7) != 'success') alert(res);
				else {
					// 로그인 성공하면 이동
					//history.push('/');
					var name = res.substring(8)
					alert(name + "님 환영합니다.");
					window.location.replace("/");
				}
			});

		console.log("클릭됨");
	}

	// input 값 받기 - id
	const onChangeId = (e) => {
		setId(e.target.value);
	}

	// input 값 받기 - pwd
	const onChangePwd = (e) => {
		setPwd(e.target.value);
	}

	// 엔터키 이벤트
	function enterkey() {
		if (window.event.keyCode == 13) {
			handelClick();
		}
	}

	return (
		<Row>
			<Col xl="4"></Col>
			<Col xl='4'>
				<br />
				<h2>login</h2> <br />
				<Form.Floating className="mb-3">
					<Form.Control
						id="id"
						type="text"
						placeholder="Id"
						onChange={onChangeId}
						onKeyUp={enterkey}
					/>
					<label htmlFor="floatingInputCustom">ID</label>
				</Form.Floating>
				<Form.Floating>
					<Form.Control
						id="pwd"
						type="password"
						placeholder="Password"
						onChange={onChangePwd}
						onKeyUp={enterkey}
					/>
					<label htmlFor="floatingPasswordCustom">Password</label>
				</Form.Floating>
				<br />
				<Button variant="secondary" onClick={handelClick}>login</Button>

			</Col>

		</Row>
	);

};

export default Login;