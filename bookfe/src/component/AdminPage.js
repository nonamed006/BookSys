import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, InputGroup, Nav, Row, Tab, Table } from 'react-bootstrap';
import ModalDelete from './ModalDelete';

const AdminPage = () => {

	const tableTitle = ['no', 'Id', '이름', '삭제'];
	const [userlist, setUserlist] = useState([]);
	const [search, setSearch] = useState("");
	const [reload, setReload] = useState();


	// 전체 회원 목록 조회
  var getUser = () => {
    fetch(`http://localhost:8080/selectuser/${search == '' ? 'notSearch' : search}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.json())
      .then((res) => {
        setUserlist(res);
        console.log(res);

      });
  };

	useEffect(() => {
    getUser();
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
      getUser();
      setReload(!reload);
      }
  }

	var idx = 0;
	
	useEffect(() => {
    getUser();
  }, [reload]);

	return (
		<div>
			<br />
			<Row>
				<Col xl='1'></Col>
				<Col >
					<Button variant="secondary" href="/adminpage">회원관리</Button>
					<Button variant="outline-secondary" href="/adminbookadd">도서추가</Button>
					<Button variant="outline-secondary" href="/adminbookdel">도서삭제</Button>
					</Col>
				</Row>
				<br/>
				<Row>
          <Col xl ='3'></Col>
          <Col>
          <InputGroup>
            <FormControl
              placeholder="회원 이름으로 검색"
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
				<Col xl='1'></Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
							{tableTitle.map(tableName => <th scope="col">{tableName}</th>)}
							</tr>
						</thead>
						<tbody>
							{userlist.map(function(res){
							return<tr>
								<td>{++idx}</td>
								<td>{res.id}</td>
								<td>{res.name}</td>
								<td><ModalDelete no={res.no} name={res.name}></ModalDelete></td>
							</tr>})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</div>
	);
};

export default AdminPage;