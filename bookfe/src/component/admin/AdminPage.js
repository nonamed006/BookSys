import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PORT } from '../../set';
import ModalDelete from '../modal/ModalDelete';

const AdminPage = () => {

	const tableTitle = ['no', 'Id', '이름', '소속 부서', '삭제'];
	const [userlist, setUserlist] = useState([]);
	const [search, setSearch] = useState("");
	const [reload, setReload] = useState();


	// 전체 회원 목록 조회
	var getUser = () => {
		fetch(`${PORT}/user/selectuser/${search == '' ? 'notSearch' : search}`, {
			method: "get",
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setUserlist(res);
			});
	};

	useEffect(() => {
		getUser();
	}, [reload]);

	// 검색창 값 받기
	var onChange = (e) => {
		setSearch(e.target.value);
	}

	// 검색 버튼 입력 시 reload
	var handelClick = (e) => {
		setReload(!reload);
	}

	// 엔터키 이벤트
	function enterkey() {
		if (window.event.keyCode == 13) {
			getUser();
			setReload(!reload);
		}
	}

	var idx = 0;

	useEffect(() => {
		getUser();
	}, [reload]);

	return (
		<div>
			<br />
			<Row>
				<Col xl='1'></Col>
				<Col >
					<Button variant="secondary"as={Link} to="/adminpage">사용자 관리</Button>
					<Button variant="outline-secondary" as={Link} to="/adminbookadd">도서등록</Button>
					<Button variant="outline-secondary" as={Link} to="/adminbookdel">도서삭제/수정</Button>
				</Col>
			</Row>
			<br />
			<Row>
				<Col xl='3'></Col>
				<Col>
					<InputGroup>
						<FormControl
							placeholder="사용자 이름으로 검색"
							aria-label="findByName"
							aria-describedby="basic-addon2"
							onChange={onChange}
							onKeyUp={enterkey}
						/>
						<Button variant="secondary" id="button-addon2" onClick={handelClick}>
							Search
						</Button>
					</InputGroup>
				</Col>
				<Col xl='3'></Col>

			</Row>
			<br />
			<Row>
				<Col xl='1'></Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								{tableTitle.map((tableName, index) => <th scope="col" key={index}>{tableName}</th>)}
							</tr>
						</thead>
						<tbody>
							{userlist.map(function (res, index) {
								return <tr key={index}>
									<td>{++idx}</td>
									<td>{res.id}</td>
									<td>{res.name}</td>
									<td>{res.team || '-'}</td>
									<td>{res.role == 'U' ? <ModalDelete no={res.no} name={res.name}></ModalDelete> : '-'}</td>
								</tr>
							})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</div>
	);
};

export default AdminPage;