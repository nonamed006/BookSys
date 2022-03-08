
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardGroup, Col, Container, FormControl, InputGroup, ModalTitle, Nav, Navbar, Row } from 'react-bootstrap';
import styled from "styled-components";
import ModalRent from './ModalRent';

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
  const [useyn, setUseyn] = useState();
  const [bookno, setBookno] = useState();
  //
  const [reload, setReload] = useState(false);


  // 책 목록 불러오기
  var getBook = () => {
    fetch(`http://localhost:8080/main/${search == '' ? 'notSearch' : search}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setBooklist(res);
        console.log(res);

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

  // 엔터키 이벤트
  function enterkey() {
    if (window.event.keyCode == 13) {
      getBook();
      setReload(!reload);
      }
  }

  // 대여 가능 여부 체크 / 홀수 => 대여가능, 짝수 => 대여중
  var checkUse = (state) =>{
    if(state % 2 == 0){
      return "y";
    } else{
      return "n";
    }
  }
  
  return (
    <div>
      
        {/* 책 목록*/}
        <div>
          <br/>
        <Row>
          <Col xl ='3'></Col>
          <Col>
          <InputGroup>
            <FormControl
              placeholder="책 이름으로 검색"
              aria-label="findByName"
              aria-describedby="basic-addon2"
              onChange={onChange}
              onKeyUp={enterkey}
            />
            <Button variant="secondary" id="button-addon2" onClick={handelClick}>
              Search
            </Button>
          </InputGroup>
          </Col>
          <Col xl ='3'></Col>

        </Row>
          {booklist.map(function (res) {
            return <Divstyle2>
              <Card style={{ width: '10rem' }} >
                <img src="./img/.jpg" />
                <Card.Body>
                  <Card.Title >{res.title}</Card.Title>
                  <Card.Text>
                    {res.writer}
                  </Card.Text>
                  {checkUse(res.usebook) == 'y' ?
                    <ModalRent booktitle={res.title} no={res.no} reload={reload}></ModalRent> :
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