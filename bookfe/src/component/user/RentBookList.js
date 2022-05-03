import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalReturn from '../modal/ModalReturn';

const RentBookList = () => {
	const [booklist, setBooklist] = useState([]);
	const tableTitle = ['no', '제목', '글쓴이', '대여일자', '반납일자', '반납'];

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
			});
	}, []);

	var idx = 0;

	// 반납 일자 지났을 때 글자에 빨간색으로 경고 표시
	const checkReturn = (reDate) => {
		var arr = reDate.split('-');

		var reYear = arr[0];
		var reMonth = arr[1];
		var reDay = arr[2];

		var dateReturn = new Date(reYear + '-' + reMonth + '-' + reDay);

		if(new Date() < dateReturn) {
			return true;
		}
	}

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					{tableTitle.map((tableName, index) => <th scope="col" key={index}>{tableName}</th>)}
				</tr>
			</thead>
			<tbody>
				{booklist.map(function (res, index) {
					return <tr key={index}>
						<td>{++idx}</td>
						<td><Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>{res.title}</Link></td>
						<td>{res.writer}</td>
						<td>{res.rent_date}</td>
						<td>{res.return_date == '9999-12-31' ? '무기한 대여' : checkReturn(res.return_date) ? res.return_date : <b style={{ color: 'red' }}>{res.return_date}</b>}</td>
						<td><ModalReturn bookNo={res.no} bookTitle={res.title}></ModalReturn></td>
					</tr>
				})}
			</tbody>
		</Table>
	);
};

export default RentBookList;