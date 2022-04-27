import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, InputGroup, Row, Table} from 'react-bootstrap';
import ModalDeleteBook from './ModalDeleteBook';

const AdminBookdel = () => {

  const tableTitle = ['no', '제목', '글쓴이', '출판사', '대여상태', '삭제', '정보수정'];

  const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);

  // 책 목록 불러오기
  const getBook = () => {
    fetch(`http://localhost:8080/main/${search == '' ? 'notSearch' : search}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setBooklist(res);
      })
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

  // 대여 상태 체크 // 홀수 => 대여가능, 짝수 => 대여중
  var checkUse = (state) => {
    if (state % 2 == 0) {
      return "y";
    } else {
      return "n";
    }
  }

  // 대여중인 회원 확인 팝업
  var open_pop = () => {
    window.open('/rentuser/' + booklist.no, '대여중인 회원', 'width=700px,height=800px');
  }

  var idx = 0;

  return (
    <div>
      <br />
      <Row>
        <Col xl='1'></Col>
        <Col >
          <Button variant="outline-secondary" href="/adminpage">회원관리</Button>
          <Button variant="outline-secondary" href="/adminbookadd">도서등록</Button>
          <Button variant="secondary" href="/adminbookdel">도서삭제/수정</Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xl='3'></Col>
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
        <Col xl='3'></Col>
      </Row>
      <br />
      <Row>
        <Col xl='1'></Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                {tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
              </tr>
            </thead>
            <tbody>
              {booklist.map(function (res, index) {
                return <tr key={index}> 
                  <td>{++idx}</td>
                  <td>{res.title}</td>
                  <td>{res.writer}</td>
                  <td>{res.publisher}</td>
                  <td>{checkUse(res.usebook) == 'y' ? <span>대여가능</span> : <span onClick={open_pop}>대여중</span>
                  }</td>
                  <td>{checkUse(res.usebook) == 'y' ? <ModalDeleteBook no={res.no} title={res.title} img={res.img}></ModalDeleteBook> :
                    <Button variant="outline-secondary" disabled="disabled">도서 삭제</Button>
                  }</td>
                  <td>{checkUse(res.usebook) == 'y' ?  <Button variant="outline-secondary" href={`/adminbookupdate/${res.no}`}>도서 수정</Button> :
                    <Button variant="outline-secondary" disabled="disabled">도서 수정</Button>
                  }</td>
                </tr>
              })}
            </tbody>
          </Table>
        </Col>
      </Row>

    </div>
  );
};

export default AdminBookdel;