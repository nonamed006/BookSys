import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const BookDetail = () => {
    return (
        <div>
            <Row>
                <Col><img src="./img/.jpg" /></Col>
                <Col>contents</Col>
            </Row>
            <Button variant="secondary" >대여</Button>
        </div>
    );
};

export default BookDetail;