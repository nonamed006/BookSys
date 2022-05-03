import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, InputGroup, ListGroup, OverlayTrigger, Pagination, Row, Table, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ModalRent from '../modal/ModalRent';


const BookListAll = () => {

	let { category } = useParams();

	const [book, setBook] = useState([]);
	const [reload, setReload] = useState(false);
	const [search, setSearch] = useState("");
	const [view, setView] = useState(true);
	const [categorys, setCategorys] = useState(category);
	const [page, setPage] = useState(1);
	const [cnt, setCnt] = useState();
	const [pageNum, setPageNum] = useState(0);
	
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
			window.location.href = `/seachlist/${search == '' ? 'notSearch' : search}`;
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
	let lastPage = Math.ceil(cnt/10);

	// 다음 페이지 순서 첫번째로 이동 ex) 1->6, 6->10
	// 현재 페이지 1~5일때 5로 나누면 0.x -> 올림해서 1이됨
	// 다음 페이지 버튼 눌렀을 때 
	// 밑에 페이징 컴포넌트에서 1*5+1 한 값을 페이지 숫자로 넣어서 출력
	// => 6,7,8,9,10 으로 출력됨
	const updatePage = () => {
		var upPg = (Math.ceil(page/5));
		setPageNum(upPg);
	}
	// 이전 페이지 순서 첫번째로 이동 ex) 10->5, 5->1
	const downPage = () => {
		var dwPg = (Math.floor(page/5))-1;
		setPageNum(dwPg);
	}

	// 페이징 
	const getPage = (index) => {
		if(index <= lastPage){
			setPage(index);
			setReload(!reload);
		}
	}

	// 이전 페이지 목록으로
	const prevPage = () => {
		var prevpg = (((Math.floor((page-1)/5)) - 1) *5) +1;
		if(page > 5){
			downPage();
			setPage(prevpg);
			setReload(!reload);
		} else if(1<page<5){
			setPage(1);
			setReload(!reload);
		}
	}

	// 다음 페이지 목록으로
	const nextPage = () => {
		if(page < lastPage){
			var nextpg = (Math.ceil(page/5) * 5) +1;
			if(nextpg>lastPage){
				setPage(lastPage);
				setReload(!reload);
			}else{
				updatePage();
				setPage(nextpg);
				setReload(!reload);
				
			}
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
						<h4><b>| {categorys == 'notSearch' || categorys == '' ? '전체 도서 목록' : categorys}</b></h4>
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
						<Button variant="secondary" id="button-addon2" as={Link} to={`/seachlist/${search == '' ? 'notSearch' : search}`}>
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
					{/* 페이징 */}
					<Col>
					<Pagination>
					<Pagination.First onClick={(e)=>{setPage(1); setPageNum(0); setReload(!reload)}}/>
					<Pagination.Prev onClick={prevPage}/>
					{arr1.map(function (res, index) {return <div key={index}>
					<Pagination.Item className={((pageNum*5)+index)+1 == page ? 'active': ''} onClick={(e)=>getPage((pageNum*5)+index+1)}>{(pageNum*5)+index+1}</Pagination.Item>
					</div>
					})}
					<Pagination.Next onClick={nextPage}/>
					<Pagination.Last onClick={(e)=>{setPage(lastPage); setPageNum(Math.floor(lastPage/5)); setReload(!reload)}}/>
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
										<td width="42%">
											<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color: 'darkblue', fontWeight: 'bolder' }}>{res.title}</Link>
										</td>
										<td width="30%">{res.writer}(지은이) | <Link to={`/publisher/${res.publisher}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }}>{res.publisher}</Link></td>
										<td width="11%">
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
										<td width="5%">{res.row_no}</td>
										<td width="15%">
											<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none' }}><img src={img} width='90px' height='110px' /></Link>
										</td>
										<td width="42%"><span>
											<Link to={`/bookdetail/${res.no}`} style={{ textDecoration: 'none', color: 'darkblue', fontWeight: 'bolder' }}>{res.title}</Link>
										</span>
											<br /><p>{res.writer}(지은이) | <Link to={`/publisher/${res.publisher}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }}>{res.publisher}</Link></p></td>
										<td></td>
										<td width="11%">
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