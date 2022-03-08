import React, { useEffect, useState } from 'react';
import { Button, Col, Nav, Row, Tab, Table } from 'react-bootstrap';
import ModalDelete from './ModalDelete';

const AdminPage = () => {

	const tableTitle = ['no', 'Id', '이름', '삭제'];
	const [userlist, setUserlist] = useState([]);
	const [reload, setReload] = useState();


	// 전체 회원 목록 조회
  var getUser = () => {
    fetch(`http://localhost:8080/selectuser`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setUserlist(res);
        console.log(res);

      });
  };


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
					<Button variant="secondary" href="/adminpage">회원관리</Button>
					<Button variant="outline-secondary" href="/adminbookadd">도서추가</Button>
					<Button variant="outline-secondary" href="/adminbookdel">도서삭제</Button>
					</Col>
				</Row>
				<br/>
				<Row>
				<Col xl='1'></Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
							{tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
							</tr>
						</thead>
						<tbody>
							{userlist.map(function(res){
							return<tr>
								<td>{++idx}</td>
								<td>{res.id}</td>
								<td>{res.name}</td>
								<td><ModalDelete no={res.no} name={res.name}></ModalDelete></td>
							</tr>})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</div>
	);
};

export default AdminPage;