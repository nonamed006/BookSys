import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const AdminBookadd = () => {
    return (
        <div>
            <br/>
            <Row>
				<Col xl='1'></Col>
				<Col >
					<Button variant="outline-secondary" href="/adminpage">회원관리</Button>
					<Button variant="secondary" href="/adminbookadd">도서추가</Button>
					<Button variant="outline-secondary" href="/adminbookdel">도서삭제</Button>
					</Col>
				</Row>
        </div>
    );
};

export default AdminBookadd;