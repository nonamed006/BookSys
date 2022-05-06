import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminBookadd = () => {

	const [book, setBook] = useState({
		title: "",
		writer: "",
		contents: "",
		price: 0,
		publisher: "",
		category: "카테고리 선택"
	});

	const teamList = ['그래픽, 멀티미디어', '모바일 프로그래밍', '서버, 데이터베이스', '소설', '웹 프로그래밍', '인문학', '프로그래밍 언어'];

	const [imgBase64, setImgBase64] = useState([]); // 파일 base64
	const [imgFile, setImgFile] = useState(null);	//파일

	// input value값 받기 이벤트 
	const onChange = (e) => {
		setBook({ ...book, [e.target.id]: e.target.value });
	};

	// file 값 받기
	const handleChangeFile = (e) => {
		setImgFile(e.target.files);
		setImgBase64([]);
		for (var i = 0; i < e.target.files.length; i++) {
			if (e.target.files[i]) {
				let reader = new FileReader();
				reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
				// 파일 상태 업데이트
				reader.onloadend = () => {
					// 2. 읽기가 완료되면 아래코드가 실행됩니다.
					const base64 = reader.result;
					if (base64) {
						var base64Sub = base64.toString()

						setImgBase64(imgBase64 => [...imgBase64, base64Sub]);

					}
				}
			}
		}

	}

	// 파일 업로드 버튼 클릭시 동작
	const WriteBoard = () => {
		const fd = new FormData();
		Object.values(imgFile).forEach((file) => fd.append("file", file));

		fd.append("title", book.title);
		fd.append("writer", book.writer);
		fd.append("contents", book.contents);
		fd.append("price", book.price);
		fd.append("publisher", book.publisher);
		fd.append("category", book.category);

		fetch(`http://localhost:8080/adminbook/add`, {
			method: "post",
			body: fd,
			headers: {
			}
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				if (res == 'success') {
					alert("등록되었습니다.");
					window.location.replace("/adminbookadd");
				} else if(res == "noTitle"){
					alert("제목을 입력해주세요.");
				} else if (res == 'selectCat') {
					alert('카테고리를 선택해 주세요');
				} else if (res == 'break') {
					alert('확장자명이 잘못되었습니다. jpg, png파일을 등록해 주세요');
				} else {
					alert("fail");
				}
			});
	}

	// select box 컨트롤 함수
	const handleChangeSelect = (e) => {
		setBook({ ...book, [e.target.id]: e.target.value });
	}

	return (
		<div>
			<br />
			<Row>
				<Col xl='1'></Col>
				<Col >
					<Button variant="outline-secondary" as={Link} to="/adminpage">사용자 관리</Button>
					<Button variant="secondary"as={Link} to="/adminbookadd">도서등록</Button>
					<Button variant="outline-secondary" as={Link} to="/adminbookdel">도서삭제/수정</Button>
				</Col>
			</Row>
			<br />
			<br />
			<Row>
				<Col xl="2"></Col>
				{/* 사진 업로드 미리보기 */}
				<Col xl="2"> <div style={{ width: '221px', height: '263px', border: '1px solid darkgray', fontSize: '12px', textAlign: 'center' }}>{imgBase64.map((item, index) => {
					return (
						<img key={index}
							className="d-block w-100"
							src={item}
							alt="First slide"
							style={{ width: '220px', height: '260px' }}
						/>
					)
				})}</div></Col>
				<Col xl='1'></Col>

				<Col xl="4">
					{/* 입력 Form */}
					{/* title */}
					<Form.Floating className="mb-3">
						<Form.Control
							id="title"
							type="text"
							placeholder="title"
							onChange={onChange}
						/>
						<label htmlFor="floatingInputCustom">제목</label>
					</Form.Floating>

					{/* writter */}
					<Form.Floating className="mb-3">
						<Form.Control
							id="writer"
							type="text"
							placeholder="writer"
							onChange={onChange}
						/>
						<label htmlFor="floatingPasswordCustom">글쓴이</label>
					</Form.Floating>
					{/* publisher */}
					<Form.Floating className="mb-3">
						<Form.Control
							id="publisher"
							type="text"
							placeholder="publisher"
							onChange={onChange}
						/>
						<label htmlFor="floatingInputCustom">출판사</label>
					</Form.Floating>
					<Form.Select size="lg" className="mb-3" id="category" onChange={handleChangeSelect} style={{ fontSize: '16px', padding: '12px' }}>
						<option>카테고리 선택</option>
						{teamList.map((teamName, index) => <option key={index}>{teamName}</option>)}
					</Form.Select>
					{/* price */}
					<Form.Floating className="mb-3">
						<Form.Control
							id="price"
							type="text"
							placeholder="price"
							onChange={onChange}
						/>
						<label htmlFor="floatingInputCustom">가격</label>
					</Form.Floating>
					{/* contents */}
					<FloatingLabel label="도서 설명">
						<Form.Control
							id="contents"
							as="textarea"
							placeholder="contetns"
							onChange={onChange}
							style={{ height: '100px' }}
						/>
					</FloatingLabel>
					<Form.Group className="mb-3">
						<Form.Label><b>도서 이미지를 등록하세요(최대10MB)</b></Form.Label>
						<Form.Control type="file" onChange={handleChangeFile} multiple />
					</Form.Group>
					<Button variant="secondary" onClick={WriteBoard}>도서 등록</Button>
				</Col>
			</Row>

		</div>
	);
};

export default AdminBookadd;