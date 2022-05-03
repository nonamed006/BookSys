
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookNewList from './book/BookNewList';
import BookRank from './book/BookRank';
import CarouselMain from './CarouselMain';

const Main = () => {

  const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");
  //
  const [reload, setReload] = useState(false);


  // 책 목록 불러오기
  const getBook = () => {
    fetch(`http://localhost:8080/main/${search == '' ? 'notSearch' : search}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setBooklist(res);
      });
  };

  useEffect(() => {
    getBook();
  }, [reload]);


  // 검색창 값 받기
  const onChange = (e) => {
    setSearch(e.target.value);
  }

  // 엔터키 이벤트
  function enterkey() {
    if (window.event.keyCode == 13) {
      window.location.href = `/seachlist/${search == '' ? 'notSearch' : search}`;
    }
  }
  return (
    <div>
      {/* 책 목록*/}
      <div>
        <br />
        <Row>
          <Col xl='3'></Col>
          <Col>
            <InputGroup>
              <FormControl
                placeholder="책 제목으로 검색"
                aria-label="findByName"
                aria-describedby="basic-addon2"
                onChange={onChange}
                onKeyUp={enterkey}
              />
              <Button variant="secondary" id="button-addon2" as={Link} to={`/seachlist/${search == '' ? 'notSearch' : search}`}>
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col xl='3'></Col>
        </Row>
        <br />
        <Row>
          <Col xl='2'></Col>
          <Col>
            <BookRank />
          </Col>
        </Row>
        <br />
        <Row>
        <Col xl='2'></Col>
        <Col>
        <div className="mb-3"><b>📕신간도서</b></div>
        {/* <CarouselMain /> */}
        <BookNewList />
        </Col>
        <Col xl='2'></Col>
        </Row>
      </div>
    </div>
  );
};

export default Main;