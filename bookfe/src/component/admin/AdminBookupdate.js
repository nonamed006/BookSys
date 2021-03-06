import React, { useEffect, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { PORT } from '../../set';

const AdminBookupdate = () => {

	let { no } = useParams();

	const [book, setBook] = useState({
		title: "",
		writer: "",
		contents: "",
		img: ""
	});

	const [imgBase64, setImgBase64] = useState([]); // 파일 base64
	const [imgFile, setImgFile] = useState(null);	//파일

	// input value값 받기 이벤트 
	const onChange = (e) => {
		setBook({ ...book, [e.target.id]: e.target.value });
	};

	// 책 목록 불러오기
	const getBook = () => {
		fetch(`${PORT}/bookdetail/${no}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.json())
			.then((res) => {
				setBook(res);
			});
	};

	useEffect(() => {
		getBook();
	}, []);


	// file 값 받기
	const handleChangeFile = (e) => {
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
		if (imgFile == null) {
			fd.append("file", null);
		} else {
			Object.values(imgFile).forEach((file) => fd.append("file", file));
		}

		fd.append("no", no);
		fd.append("title", book.title);
		fd.append("writer", book.writer);
		fd.append("contents", book.contents);
		fd.append("img", book.img);

		fetch(`${PORT}/adminbook/update`, {
			method: "post",
			body: fd,
			headers: {
			}
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				if (res == 'success') {
					alert("수정 되었습니다.");
					window.location.replace("/adminbookdel");
				} else if (res == 'break') {
					alert('확장자명이 잘못되었습니다. jpg, png파일을 등록해 주세요');
				} else {
					alert("fail");
				}
			});
	}
	const img = '/img/' + book.img;
	return (
		<div>
			<br />
			<Row>
				<Col xl='1'></Col>
				<Col >
					<Button variant="outline-secondary" as={Link} to="/adminpage" >사용자 관리</Button>
					<Button variant="outline-secondary" as={Link} to="/adminbookadd" >도서등록</Button>
					<Button variant="secondary" as={Link} to="/adminbookdel" >도서삭제/수정</Button>
				</Col>
			</Row>
			<br />
			<br />
			<Row>
				<Col xl="2"></Col>

				{/* 사진 업로드 미리보기 */}
				<Col xl="2">{imgFile == null ?
					<img
						className="d-block w-100"
						src={img}
						alt="First slide"
						style={{ width: '220px', height: '260px' }}
					/>
					:
					imgBase64.map((item, index) => {
						return (
							<img key={index}
								className="d-block w-100"
								src={item}
								alt="First slide" 
								style={{ width: '220px', height: '260px' }}
							/>
						)
					})
				}
				</Col>
				<Col xl="4">
					{/* 입력 Form */}
					{/* title */}
					<Form.Floating className="mb-3">
						<Form.Control
							id="title"
							type="text"
							placeholder="title"
							onChange={onChange}
							value={book.title || ''}
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
							value={book.writer || ''}
						/>
						<label htmlFor="floatingPasswordCustom">글쓴이</label>
					</Form.Floating>
					{/* contents */}
					<FloatingLabel controlId="floatingTextarea2" label="도서 설명">
						<Form.Control
							id="contents"
							as="textarea"
							placeholder="contetns"
							onChange={onChange}
							value={book.contents || ''}
							style={{ height: '80px' }}
						/>
					</FloatingLabel>
					<Form.Group controlId="formFileMultiple" className="mb-3">
						<Form.Label><b>도서 이미지를 등록하세요(최대10MB)</b></Form.Label>
						<Form.Control type="file" onChange={handleChangeFile} multiple />
					</Form.Group>
					<Button variant="secondary" onClick={WriteBoard}>도서 등록</Button>
				</Col>
			</Row>

		</div>
	);
};

export default AdminBookupdate;