import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, InputGroup, ListGroup, OverlayTrigger, Pagination, Row, Table, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ModalRent from '../modal/ModalRent';
import Ex from '../znoused/Ex';


const BookListAll = () => {

	let { category } = useParams();

	const [book, setBook] = useState([]);
	const [reload, setReload] = useState(false);
	const [search, setSearch] = useState("");
	const [view, setView] = useState(true);
	const [categorys, setCategorys] = useState(category);
	const [page, setPage] = useState(1);
	const [cnt, setCnt] = useState();
	
	// 카테고리 리스트 정보 -- 여기 추가하면 자동으로 생성
	const catList = ['IT서적', '소설', '인문학'];

	// 책 목록 조회
	const getBookCategory = () => {
		fetch(`http://localhost:8080/category/${categorys == '' ? 'notSearch' : categorys}/${page}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setBook(res);
			});
	};

	// 도서 전체 개수 조회
	const getBookCount = () => {
		fetch(`http://localhost:8080/bookcount/${categorys == '' ? 'notSearch' : categorys}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				setCnt(res);
			});
	};


	useEffect(() => {
		getBookCategory();
		getBookCount();
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

	// 보기 방식 변경 위한 state
	const viewSet = () => {
		setView(!view);
	}
	// 카테고리 set후 페이지 새로고침
	const getCat = (e) => {
		setCategorys(e.target.id);
		setPage(1);
		setReload(!reload);
	}

	let arr1 = [1, 2, 3, 4, 5];
	let lastPage = Math.ceil(cnt/15);

	// 페이징 
	const getPage = (index) => {
		if(index <= lastPage){
			setPage(index);
			setReload(!reload);
		}
	}

	// 페이지 앞으로, 뒤로
	const prevPage = () => {
		if(page > 1){
			setPage(page-1);
			setReload(!reload);
		}
	}

	const nextPage = () => {
		if(page < lastPage){
			setPage(page+1);
			setReload(!reload);
		}
	}

	return (
		<>
			<Container>
				<br />
				<Row>
					<Col xl='2'>
					</Col>
					<Col xl='5'>
						<h4>| {categorys == 'notSearch' || categorys == '' ? '전체 도서 목록' : categorys}</h4>
					</Col>
					{/* 검색창 */}
					<Col><InputGroup className="mb-3">
						<FormControl
							placeholder="책 제목으로 검색"
							aria-label="findByName"
							aria-describedby="basic-addon2"
							onChange={onChange}
							onKeyUp={enterkey}
						/>
						<Button variant="secondary" id="button-addon2" href={`/seachlist/${search}`}>
							Search
						</Button>
					</InputGroup></Col>
					<Col xl='1'></Col>
				</Row>
				<Row>
					<Col xl='2'></Col>
					<Col xl='6'>
						<br />
						{/* 보기 방식 변경 아이콘 */}
						{view ?
							<OverlayTrigger
								key='right'
								placement='right'
								overlay={
									<Tooltip id='tooltip-right'>이미지와 함께 보기</Tooltip>
								}
							>
								<span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={viewSet}>grid_view</span>
							</OverlayTrigger> :
							<OverlayTrigger
								key='right'
								placement='right'
								overlay={
									<Tooltip id='tooltip-right'>이미지 없이 보기</Tooltip>
								}
							>
								<span className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={viewSet}>menu</span>
								{/* 보기 방식 변경 안내문구 - 팝오버 */}
							</OverlayTrigger>
						}
					</Col>
					<Col>
					<Pagination>
					<Pagination.First onClick={(e)=>{setPage(1); setReload(!reload)}}/>
					<Pagination.Prev onClick={prevPage}/>
					{arr1.map(function (res, index) {return <div key={index}>
					<Pagination.Item className={++index == page ? 'active': ''} onClick={(e)=>getPage(index)}>{index}</Pagination.Item>
					</div>
					})}
					<Pagination.Next onClick={nextPage}/>
					<Pagination.Last onClick={(e)=>{setPage(lastPage); setReload(!reload)}}/>
				</Pagination>
					</Col>
				</Row>
				<Row>
					<Col xl='2'>
						<ListGroup >
							<ListGroup.Item variant="secondary">카테고리</ListGroup.Item>
							<ListGroup.Item id='' style={{ cursor: 'pointer' }} onClick={getCat}>- 카테고리 전체</ListGroup.Item>
							{catList.map((catName, index) => <ListGroup.Item key={index} id={catName} style={{ cursor: 'pointer' }} onClick={getCat}>- {catName}</ListGroup.Item>)}
						</ListGroup>
					</Col>
					{/* 도서 목록 테이블 - 이미지 없이 보기*/}
					<Col>{view ?
						<Table hover style={{ width: '90%' }}>
							<thead>
								<tr>
								</tr>
							</thead>
							<tbody>
								{book.map(function (res, index) {
									return <tr key={index}>
										<td>{res.row_no}</td>
										<td>
											<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color: 'darkblue', fontWeight: 'bolder' }}>{res.title}</Link>
										</td>
										<td>{res.writer}(지은이) | <Link to={`/publisher/${res.publisher}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }}>{res.publisher}</Link></td>
										<td>
											{checkUse(res.usebook) == 'y' ?
												<ModalRent booktitle={res.title} no={res.no} reload={reload}></ModalRent> :
												<Button size='sm' variant="secondary" disabled="disabled" >대여불가능</Button>}
										</td>
										<td style={{ width: '140px' }}><b>{res.name == null ? null : `${res.name || ''} (${res.team || ''})`} </b></td>
									</tr>
								})}
							</tbody>
						</Table> :
						<Table hover style={{ width: '90%' }}>
							{/* 도서 목록 테이블 - 이미지 함께 보기 */}
							<thead>
								<tr>
								</tr>
							</thead>
							<tbody>
								{book.map(function (res, index) {
									const img = '/img/' + res.img;
									return <tr key={index}>
										<td>{res.row_no}</td>
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
										<td style={{ width: '140px' }}> <b>{res.name == null ? null :
											`${res.name} (${res.team})`
										} </b></td>
									</tr>
								})}
							</tbody>
						</Table>
					}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BookListAll;