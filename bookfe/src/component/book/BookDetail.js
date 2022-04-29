import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Col, Form, ListGroup, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ModalRent from '../modal/ModalRent';
import ModalReplyDel from '../modal/ModalReplyDel';

const BoxStyle = styled.div`
	width: 230px;
	height: 300px;
	/border: 1px solid lightgrey;
	text-align: center;
`;

const DivStyle = styled.div`
	margin-bottom: 50px;
	align-item: center;
`;
const BookDetail = (props) => {

	// Main.js에서 받아온 책 no 값
	let { no } = useParams();

	const [book, setBook] = useState({});
	const [rentInfo, setRentInfo] = useState({});
	const [replyList, setReplyList] = useState([]);
	const [reply, setReply] = useState({
		comment: "",
		book_no: ""
	});
	const [reload, setReload] = useState(false);

	// 책 목록 불러오기
	const getBook = () => {
		fetch(`http://localhost:8080/bookdetail/${no}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setBook(res);
			});
	};

	// 대여중인 회원 조회
	const rentuser = () => {
		fetch(`http://localhost:8080/rentbook/${no}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setRentInfo(res);
			});
	};

	// 해당 도서의 댓글 리스트 조회
	const getReply = () => {
		fetch(`http://localhost:8080/bookdetail/reply/${no}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setReplyList(res);
			});
	};

	//댓글 달기
	const postReply = () => {
		fetch(`http://localhost:8080/user/reply`, {
			method: "post",
			body: JSON.stringify(reply),
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				if (res == 'success') {
					alert('댓글이 작성되었습니다.');
					setReload(!reload);
				} else {
					alert('댓글 작성이 실패하였습니다.');
				}
			});
	};

	useEffect(() => {
		getBook();
		rentuser();
		getReply();
		setReply({ ...reply, book_no: no });
	}, [reload]);

	// 대여 가능 여부 체크 / 홀수 => 대여가능, 짝수 => 대여중
	const checkUse = (state) => {
		if (state % 2 == 0) {
			return "y";
		} else {
			return "n";
		}
	}

	// input value값 받기 이벤트 
	const onChange = (e) => {
		setReply({ ...reply, [e.target.id]: e.target.value });
	};

	// 뒤로가기 버튼
	const backEvent = () => {
		window.history.back();
	}

	// 새로고침 위한 리로드
	const getReload = (isReload) => {
		setReload(isReload);
	}

	const img = '/img/' + book.img;
	return (
		<div>
			<br />
			<Row>
				<Row>
					<Col xl='2'></Col>
					<Col xl='2'>
						<Badge bg="secondary" style={{ cursor: 'pointer' }} onClick={backEvent}>◀ 돌아가기</Badge>
						<h3>상세정보</h3><br />
					</Col>
				</Row>
				<Col xl='2'></Col>
				<Col xl='3' ><BoxStyle><img src={img} width='200px' height='250px' /></BoxStyle></Col>

				<Col xl='4'>
					<DivStyle>
						<ListGroup variant="flush" >
							<ListGroup.Item><b>제목: </b>{book.title}</ListGroup.Item><br />
							<ListGroup.Item><b>글쓴이: </b>{book.writer}</ListGroup.Item><br />
							<ListGroup.Item><b>가격: </b>{book.price} 원</ListGroup.Item><br />
							<ListGroup.Item><b>출판사: </b> {book.publisher || ''}</ListGroup.Item><br />
							<ListGroup.Item><b>설명: </b>{book.contents}</ListGroup.Item>
						</ListGroup>
					</DivStyle>
					{/* 대여 버튼 */}
					<Row>
						<Col xl='8'>
							{checkUse(book.usebook) == 'y' ?
								<ModalRent booktitle={book.title} no={book.no}></ModalRent> :
								<>
									<Button size='sm' variant="secondary" disabled="disabled">대여불가능</Button>
									<div>대여중: {rentInfo.name || ''}({rentInfo.team || ''})</div>
								</>
							}
						</Col>
						<Col xl='4'>
						</Col>
					</Row>
				</Col>
			</Row>
			<br />
			<Row>
				<Col xl='2'></Col>
				{/* 댓글작성 입력 폼 */}
				<Col>
					<Form>
						<Form.Group className="mb-3" controlId="comment">
							<Form.Label>댓글</Form.Label> <Button size='sm' variant="secondary" onClick={postReply} style={{ marginBottom: '3px' }}>댓글작성</Button>
							<Form.Control as="textarea" rows={4} onChange={onChange} placeholder="200자까지 작성가능합니다." />
						</Form.Group>
					</Form>
					{/* 댓글 목록 */}
					<Table hover>
						<thead>
						</thead>
						<tbody>
							{replyList.map(function (res, index) {
								return <tr key={index}>
									<td style={{ height: '100px' }}>
										<div style={{ fontSize: '13px', margin: "5px" }}>{res.name}({res.team}) | {res.reg_date}
											{props.user.no == res.user_no ? <ModalReplyDel no={res.no} getReload={getReload} /> : null}
										</div>
										<div>{res.comment}</div>
									</td>
								</tr>
							})}
						</tbody>
					</Table>
				</Col>
				<Col xl='3'>
				</Col>
			</Row>
		</div>
	);
};

export default BookDetail;