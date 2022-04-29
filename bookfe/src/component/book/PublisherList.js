import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ModalRent from '../modal/ModalRent';

const PublisherList = () => {

	let { publisher } = useParams();
	const [book, setBook] = useState([]);
	const [reload, setReload] = useState(false);

	// 책 목록 조회
	const getBookCategory = () => {
		fetch(`http://localhost:8080/publisher/${publisher}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setBook(res);
			});
	};

	useEffect(() => {
		getBookCategory();
	}, [reload]);

	// 대여 가능 여부 체크 / 홀수 => 대여가능, 짝수 => 대여중
	var checkUse = (state) => {
		if (state % 2 == 0) {
			return "y";
		} else {
			return "n";
		}
	}


	return (
		<>
			<Container>
				<br />
				<Row>
					<Col xl='2'>
					</Col>
					<Col>
						<h3>| 출판사 '{publisher}' 검색결과</h3>
					</Col>
				</Row>
				<br />
				<Row>
					<Col xl='2'></Col>
					<Col>
						<Table hover style={{ width: '90%' }}>
							<thead>
								<tr>
								</tr>
							</thead>
							<tbody>
								{book.map(function (res, index) {
									const img = '/img/' + res.img;
									return <tr key={index}>
										<td>{++index}</td>
										<td>
											<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none' }}><img src={img} width='90px' height='110px' /></Link>
										</td>
										<td><span>
											<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color: 'darkblue', fontWeight: 'bolder' }}>{res.title}</Link>
										</span>
											<br /><p>{res.writer}(지은이) | {res.publisher}</p></td>
										<td></td>
										<td>
											{checkUse(res.usebook) == 'y' ?
												<ModalRent booktitle={res.title} no={res.no} reload={reload}></ModalRent> :
												<Button size='sm' variant="secondary" disabled="disabled" >대여불가능</Button>}
										</td>
									</tr>
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default PublisherList;