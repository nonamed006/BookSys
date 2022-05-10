import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { PORT } from '../../set';
import DaumPost from '../DaumPost';

const UserUpdate = () => {

	const [user, setUser] = useState({
		id: "",
		pwd: "",
		name: "",
		addr: ""
	});

	// 사용자 정보 불러오기 ================================
	useEffect(() => {
		fetch(`${PORT}/user/head`, {
			method: "get",
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': localStorage.getItem('Authorization')
			}
		}).then((res) => res.json())
			.then((res) => {
				setUser(res);
			});

	}, [])

	// 수정 보내기
	const updateUser = () => {
		fetch(`${PORT}/user/updateuser/${user.pwd}/${user.addr}`, {
			method: "get",
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': localStorage.getItem('Authorization')
			}
		}).then((res) => res.text())
			.then((res) => {
				if (res == 'success') {
					alert('수정되었습니다.');
					window.location.reload();
				} else {
					alert('실패하였습니다.');
				}
			});

	}

	// input value값 받기 이벤트 
	const onChange = (e) => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};


	// 수정 버튼 클릭시
	const handelClick = () => {
		updateUser();
	}

	// 카카오 주소 API 추가
	const getPost = (post) => {
		setUser({ ...user, addr: "" });
		setUser({ ...user, addr: post });
	}


	return (
		<Row>
			<Col xl="4"></Col>
			<Col xl="4">
				<br />
				<h2>회원 정보 수정하기</h2> <br />
				{/* ID */}
				<Form.Floating className="mb-3">
					<Form.Control
						id="id"
						type="text"
						placeholder="Id"
						value={user.id}
						disabled
						readOnly
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
						value={user.name || ''}
						disabled
						readOnly
					/>
					<label htmlFor="floatingInputCustom">Name</label>
				</Form.Floating>
				{/* Team */}
				<Form.Floating className="mb-3">
					<Form.Control
						id="team"
						type="text"
						placeholder="Team"
						value={user.team || ''}
						disabled
						readOnly
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
						value={user.addr}
					/>
					<label htmlFor="floatingInputCustom">Address</label> <br /><br />
					<DaumPost getPost={getPost} />
				</Form.Floating>
				<Button variant="secondary" onClick={handelClick}>수정하기</Button>
			</Col>
		</Row>

	);
};

export default UserUpdate;