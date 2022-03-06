import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardGroup, Col, Container, FormControl, InputGroup, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from "styled-components";

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

  const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");
  //
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
  }, [reload]);

  // 검색창 값 받기
  var onChange = (e) => {
    setSearch(e.target.value);
  }

  // 검색 버튼 입력 시 reload
  var handelClick = (e) => {
    setReload(!reload);
  }


  return (
    <div>
        {/* 책 목록*/}
        <div>
          {booklist.map(function (res) {
            return <Divstyle2>
              <Card style={{ width: '10rem' }} >
                <img src="./img01.jpg" />
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
    </div>
  );
};

export default Main;