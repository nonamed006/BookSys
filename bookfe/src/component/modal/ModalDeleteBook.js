import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PORT } from '../../set';

const ModalDeleteBook = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [book, setBook] = useState({
		no: props.no,
		title: props.title,
		img: props.img
	});

	// 도서 삭제
	const deleteUser = () => {
		fetch(`${PORT}/adminpage/deletebook/${book.no}/${book.img}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				setShow(false);
				if (res == "success") {
					alert("삭제되었습니다.");
					window.location.replace("/adminbookdel");
				} else {
					alert("삭제실패하였습니다.");
				}
			});
	}


	return (
		<div>
			<Button variant="outline-dark" onClick={handleShow}>
				도서 삭제
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>도서: '{book.title}'을(를) 삭제하시겠습니까?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						취소
					</Button>
					<Button variant="primary" onClick={deleteUser}>
						삭제
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ModalDeleteBook;