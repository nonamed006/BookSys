import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import ModalReturn from './ModalReturn';

const Mypage = () => {

	const [booklist, setBooklist] = useState([]);
	const tableTitle = ['no', '제목', '글쓴이', '대여일자','반납일자', '반납'];

	useEffect(() => {
		fetch("http://localhost:8080/user/rentlist", {
			method: "get",
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
		}).then((res) => res.json())
			.then((res) => {
				setBooklist(res);
				console.log(res);
			});

	}, [])

	var idx = 0;

	return (
		<div>
			<Container>
				<br />
				<h3>대여중인 책</h3>
				<br/>
				<Table striped bordered hover>
					<thead>
						<tr>
							{tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
						</tr>
					</thead>
					<tbody>
						{booklist.map(function(res){
						return <tr>
							<td>{++idx}</td>
							<td>{res.title}</td>
							<td>{res.writer}</td>
							<td>{res.rent_date}</td>
							<td>{res.return_date}</td>
							<td><ModalReturn bookNo={res.book_no} bookTitle={res.title}></ModalReturn></td>
						</tr>
						})}
					</tbody>
				</Table>

			</Container>
		</div>
	);
};

export default Mypage;