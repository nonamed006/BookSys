
import React, { useEffect, useState } from 'react';
import {  Button, Card,  Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookRank from './BookRank';
import ModalRent from './ModalRent';

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

  // 검색 버튼 입력 시 reload
  const handelClick = (e) => {
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
        <br/>
        <Row>
          <Col xl='2'></Col>
          <Col>
          <BookRank />
          </Col>
        </Row>
        <br/>
          <b>📕신간도서</b>
        
          {booklist.map(function (res, index) {
            const img = '/img/' + res.img;
            return <div key={index}>
              <Card style={{ width: '10rem',float:'left', height: '350px',margin:'0px 10px 10px 0px'}} >
              <img src={img} height='180px'/>
                <Card.Body>
                <Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color:'darkblue' }}><Card.Title style={{ fontSize:'14px', height:'50px', fontWeight:'bolder'}}>{res.title}</Card.Title></Link>
                  <Card.Text style={{ fontSize:'13px'}}>
                    {res.writer} | {res.publisher}
                  </Card.Text>
                  {checkUse(res.usebook) == 'y' ?
                    <ModalRent booktitle={res.title} no={res.no} reload={reload}></ModalRent> :
                    <Button size = 'sm' variant="secondary" disabled="disabled" >대여불가능</Button>}
                </Card.Body>
              </Card>
              </div>
          })}
        </div>
    </div>
  );
};

export default Main;