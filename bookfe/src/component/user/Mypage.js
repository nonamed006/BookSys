import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row, Table } from 'react-bootstrap';
import ModalReturn from '../modal/ModalReturn';
import MyReplyList from './MyReplyList';
import RentBookList from './RentBookList';

const Mypage = () => {

	const [state, setState] = useState(1);

	const getPage = (e) => {
		setState(e.target.id);
	}

	return (
		<div>
			<Container>
				<Row>
					<Col xl='2'></Col>
					<Col>
						<br />
						{state == 1 ? <h3>대여중인 도서</h3> : <h3>내가 쓴 댓글</h3>}
						<br />
					</Col>
				</Row>
				<Row>
					<Col xl='2'>
						<ListGroup >
							<ListGroup.Item variant="secondary">마이페이지</ListGroup.Item>
							<ListGroup.Item id='1' style={{ cursor: 'pointer' }} onClick={getPage}>- 대여중인 도서</ListGroup.Item>
							<ListGroup.Item id='2' style={{ cursor: 'pointer' }} onClick={getPage}>- 내가 쓴 댓글</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col>{state == 1 ?
						<RentBookList /> :
						<MyReplyList />
					}
					</Col>
					<Col xl='1'></Col>
				</Row>
			</Container>
		</div>
	);
};

export default Mypage;