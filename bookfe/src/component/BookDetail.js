import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import ModalRent from './ModalRent';
import styled from 'styled-components';

const BoxStyle = styled.div`
	width: 230px;
	height: 300px;
	border: 1px solid lightgrey;
	text-align: center;
`;

const DivStyle = styled.div`
	margin-bottom: 50px;
	align-item: center;
`;
const BookDetail = () => {

	// Main.js에서 받아온 책 no 값
	let { no } = useParams();

	const [book, setBook] = useState({});

	// 책 목록 불러오기
	var getBook = () => {
		fetch(`http://localhost:8080/bookdetail/${no}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setBook(res);
				console.log(res);
			});
	};

	useEffect(() => {
		getBook();
	}, []);

	// 대여 가능 여부 체크 / 홀수 => 대여가능, 짝수 => 대여중
	var checkUse = (state) => {
		if (state % 2 == 0) {
			return "y";
		} else {
			return "n";
		}
	}

	const img = '/img/' + book.img;

	return (
		<div>
			<br />
			<Row>
				<Row>
				<Col xl='2'></Col>
				<Col xl='2'>
					<h3>상세정보</h3><br/>
					</Col>
				</Row>
				<Col xl='2'></Col>
				<Col xl='3' ><BoxStyle><img src={img} width='200px' height='250px'/></BoxStyle></Col>

				<Col xl='4'>
					<DivStyle>
						<ListGroup variant="flush" >
							<ListGroup.Item><b>제목: </b>{book.title}</ListGroup.Item><br />
							<ListGroup.Item><b>글쓴이: </b>{book.writer}</ListGroup.Item><br />
							<ListGroup.Item><b>가격: </b>{book.price}</ListGroup.Item><br />
							<ListGroup.Item><b>설명: </b>{book.contents}</ListGroup.Item>
						</ListGroup>
					</DivStyle>
					{/* 대여 버튼 */}
					<Row>
						<Col xl= '4'>
						{checkUse(book.usebook) == 'y' ?
						<ModalRent booktitle={book.title} no={book.no}></ModalRent> :
						<Button variant="secondary" disabled="disabled">대여불가능</Button>}
						</Col>
						<Col xl= '4'>
						{/* <Button variant="secondary" href={`/buybook/${no}`}>구매하기</Button> */}
						</Col>
						</Row>
				</Col>
			</Row>
		</div>
	);
};

export default BookDetail;