import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import ModalDeleteBook from './ModalDeleteBook';

const AdminBookdel = () => {

	const tableTitle = ['no', '제목', '글쓴이', '대여상태', '삭제'];

	const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");
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

	// 대여 상태 체크 // 홀수 => 대여가능, 짝수 => 대여중
	var checkUse = (state) =>{
    if(state % 2 == 0){
      return "y";
    } else{
      return "n";
    }
  }

	var idx = 0;

	return (
		<div>
			<br />
			<Row>
				<Col xl='1'></Col>
				<Col >
					<Button variant="outline-secondary" href="/adminpage">회원관리</Button>
					<Button variant="outline-secondary" href="/adminbookadd">도서추가</Button>
					<Button variant="secondary" href="/adminbookdel">도서삭제</Button>
				</Col>
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
								{booklist.map(function (res) {
									return <tr>
										<td>{++idx}</td>
										<td>{res.title}</td>
										<td>{res.writer}</td>
										<td>{checkUse(res.usebook) == 'y' ? <span>대여가능</span> : <span>대여중</span>}</td>
										<td><ModalDeleteBook no={res.no} title={res.title}></ModalDeleteBook></td>
									</tr>
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Row>
		</div>
	);
};

export default AdminBookdel;