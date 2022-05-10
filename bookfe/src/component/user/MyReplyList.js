import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PORT } from '../../set';
import ModalReplyDel from '../modal/ModalReplyDel';

const MyReplyList = () => {
	const [replyList, setReplyList] = useState([]);
	const [reload, setReload] = useState(false);
	
	const tableTitle = ['no', '도서 정보', '작성 내용', '작성 일자', '삭제'];

	var idx = 0;
	useEffect(() => {
		fetch(`${PORT}/user/reply`, {
			method: "get",
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
		}).then((res) => res.json())
			.then((res) => {
				setReplyList(res);
			});

	}, [reload]);

	const getReload = (isReload) => {
		setReload(isReload);
	}
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					{tableTitle.map((tableName, index) => <th scope="col" key={index}>{tableName}</th>)}
				</tr>
			</thead>
			<tbody>
				{replyList.map(function (res, index) {
					return <tr key={index}>
						<td>{++idx}</td>
						<td><Link to={`/bookdetail/${res.book_no}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>{res.title}</Link><br />
							<span style={{ fontSize: '12px' }}>{res.writer}</span></td>
						<td style={{ width: '350px' }}>{res.comment}</td>
						<td>{res.reg_date}</td>
						<td><ModalReplyDel no={res.no} reload={reload} getReload={getReload} /></td>
					</tr>
				})}
			</tbody>
		</Table>
	);
};

export default MyReplyList;