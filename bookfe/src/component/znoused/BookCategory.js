import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { PORT } from '../../set';
import ModalRent from '../modal/ModalRent';

const BookCategory = () => {

	let { category } = useParams();
	const [book, setBook] = useState([]);
	const [reload, setReload] = useState(false);
	const [search, setSearch] = useState("");

	// 책 목록 조회
	const getBookCategory = () => {
		fetch(`${PORT}/category/${category}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setBook(res);
			});
	};

	useEffect(() => {
		getBookCategory();
	}, [reload]);

	// 검색창 값 받기
  const onChange = (e) => {
    setSearch(e.target.value);
  }

  // 엔터키 이벤트
  function enterkey() {
    if (window.event.keyCode == 13) {
      window.location.href = `/seachlist/${search}`;
      }
  }

	// 대여 가능 여부 체크 / 홀수 => 대여가능, 짝수 => 대여중
	var checkUse = (state) => {
		if (state % 2 == 0) {
			return "y";
		} else {
			return "n";
		}
	}


	return (
		<>
			<Container>
				<br />
				<Row>
					<Col xl='2'>
					</Col>
					<Col xl ='5'>
						<h4>| {category == 'notSearch' ? '전체 도서 목록' : category}</h4>
					</Col>
					<Col>
					{/* 검색창 */}
					<InputGroup>
            <FormControl
              placeholder="책 제목으로 검색"
              aria-label="findByName"
              aria-describedby="basic-addon2"
              onChange={onChange}
              onKeyUp={enterkey}
            />
            <Button variant="secondary" id="button-addon2" as={Link} to={`/seachlist/${search}`}>
              Search
            </Button>
          </InputGroup></Col>
					<Col xl ='1'></Col>
				</Row>
				<br />
				<Row>
					<Col xl='2'></Col>
					<Col>
						<Table hover style={{ width: '90%' }}>
							<thead>
								<tr>
								</tr>
							</thead>
							<tbody>
								{book.map(function (res, index) {
									const img = '/img/' + res.img;
									return <tr key={index}>
										<td>{++index}</td>
										<td>
											<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none' }}><img src={img} width='90px' height='110px' /></Link>
										</td>
										<td><span>
											<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color: 'darkblue', fontWeight: 'bolder' }}>{res.title}</Link>
										</span>
											<br /><p>{res.writer}(지은이) | <Link to={`/publisher/${res.publisher}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }}>{res.publisher}</Link></p></td>
										<td></td>
										<td>
											{checkUse(res.usebook) == 'y' ?
												<ModalRent booktitle={res.title} no={res.no} reload={reload}></ModalRent> :
												<Button size='sm' variant="secondary" disabled="disabled" >대여불가능</Button>}
										</td>
									</tr>
								})}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BookCategory;