import React, { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

const BoxStyle = styled.div`
	width: 230px;
	height: 280px;
	border: 1px solid lightgrey;
`;

const AdminBookadd = () => {

	const [book, setBook] = useState({
		title: "",
		writer: "",
		contents: "",
		price: ""
	});

	const [imgBase64, setImgBase64] = useState([]); // 파일 base64
	const [imgFile, setImgFile] = useState(null);	//파일

	// input value값 받기 이벤트 
	const onChange = (e) => {
		setBook({ ...book, [e.target.id]: e.target.value });
	};

	// file 값 받기
	const handleChangeFile = (e) => {
		console.log(e.target.files)
		setImgFile(e.target.files);
		//fd.append("file", e.target.files)
		setImgBase64([]);
		for (var i = 0; i < e.target.files.length; i++) {
			if (e.target.files[i]) {
				let reader = new FileReader();
				reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
				// 파일 상태 업데이트
				reader.onloadend = () => {
					// 2. 읽기가 완료되면 아래코드가 실행됩니다.
					const base64 = reader.result;
					console.log(base64)
					if (base64) {
						//  images.push(base64.toString())
						var base64Sub = base64.toString()

						setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
						//setBook({...book, bookimgfile: e.target.files});
						//  setImgBase64(newObj);
						// 파일 base64 상태 업데이트
						//  console.log(images)
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

		fetch(`http://localhost:8080/adminbook/add`, {
			method: "post",
			body: fd,
			headers: {
			}
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				console.log(imgFile);
				console.log(res);
				if (res == 'success') {
					alert("등록되었습니다.");
					window.location.replace("/adminbookadd");
					console.log("ok");
				} else if(res == 'break'){
					alert('확장자명이 잘못되었습니다. jpg, png파일을 등록해 주세요');
				} else {
					alert("fail");
					console.log("fail");
				}
			});
	}

	return (
		<div>
			<br />
			<Row>
				<Col xl='1'></Col>
				<Col >
					<Button variant="outline-secondary" href="/adminpage">회원관리</Button>
					<Button variant="secondary" href="/adminbookadd">도서등록</Button>
					<Button variant="outline-secondary" href="/adminbookdel">도서삭제</Button>
				</Col>
			</Row>
			<br />
			<br />
			<Row>
				<Col xl="2"></Col>
				{/* 사진 업로드 미리보기 */}
				<Col xl="2"> {imgBase64.map((item) => {
					return (
						<img
							className="d-block w-100"
							src={item}
							alt="First slide"
							style={{ width:'220px', height: '260px' }}
						/>
						)
					})}</Col> 

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
					<FloatingLabel controlId="floatingTextarea2" label="도서 설명">
						<Form.Control
							as="textarea"
							placeholder="contetns"
							onChange={onChange}
							style={{ height: '80px' }}
						/>
					</FloatingLabel>
					<Form.Group controlId="formFileMultiple" className="mb-3">
						<Form.Label><b>도서 이미지를 등록하세요</b></Form.Label>
						<Form.Control type="file" onChange={handleChangeFile} multiple />
					</Form.Group>
					<Button variant="secondary" onClick={WriteBoard}>도서 등록</Button>
				</Col>
			</Row>

		</div>
	);
};

export default AdminBookadd;