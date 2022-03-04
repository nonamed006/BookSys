import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardGroup, Col, Container, FormControl, InputGroup, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Login from './Login';
import Signup from './Signup';

const DivContainer = styled.div`
    margin : 0px 500px 0px 500px;
    border : 1px solid black;
    height: auto;
`
const Divstyle2 = styled.div`
  /border: 1px solid black;
  display: inline-block;
  width: 150px;
  height: 200px;
  margin: 10px;
  padding : 10px;
`

const Main = () => {

  const [user, setUser] = useState([]);
  const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");
  //
  const [status, setStatus] = useState('1');
  const [reload, setReload] = useState(false);

  var getBook = () => {
    fetch(`http://localhost:8080/main/${search == '' ? 'notSearch' : search}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setBooklist(res);
        console.log(res);
        console.log(search);
        console.log(reload);

      });
  };

  useEffect(() => {
    getBook();
  }, [reload, status]);

  // 검색창 값 받기
  var onChange = (e) => {
    setSearch(e.target.value);
  }

  // 검색 버튼 입력 시 reload
  var handelClick = (e) => {
    setReload(!reload);
  }

  if (status == '1') {
    return (
      <div>
        <DivContainer>
          {/* 상단 Nav */}
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>BookSys</Navbar.Brand>
              <Nav className="me-auto">
                {/* 도서목록 클릭시 메인으로 안돌아오는 문제 수정하기============================================ */}
                <Nav.Link onClick={e => { setReload(!reload) }}>도서목록</Nav.Link>
                <Nav.Link onClick={e => { setStatus('2') }}>로그인</Nav.Link>
                <Nav.Link onClick={e => { setStatus('3') }}>회원가입</Nav.Link>
              </Nav>
              <div class="col-xs-2">
                <InputGroup >
                  <FormControl
                    placeholder="책이름으로 검색"
                    aria-label="findByName"
                    aria-describedby="basic-addon2"
                    onChange={onChange}
                  />
                  <Button variant="outline-secondary" id="button-addon2" onClick={handelClick}>
                    Search
                  </Button>
                </InputGroup>
              </div>
            </Container>
          </Navbar>

          {/* 책 목록*/}

          <div>
            {booklist.map(function (res) {
              return <Divstyle2>
                <Card style={{ width: '10rem' }} >
                  <img src="" />
                  <Card.Body>
                    <Card.Title>{res.title}</Card.Title>
                    <Card.Text>
                      {res.writer}
                    </Card.Text>
                    {res.use_yn == 'y' ?
                      <Button variant="secondary" onClick={e => { alert("click") }}>대여하기</Button> :
                      <Button variant="secondary" disabled="disabled">대여불가능</Button>}
                  </Card.Body>
                </Card>

              </Divstyle2>
            })}

          </div>
        </DivContainer>
      </div>
    );
  } else if (status == '2') {
    return <>
      <Login />
    </>
  } else if (status == '3') {
    return <>
      <Signup />
    </>
  }

};

export default Main;