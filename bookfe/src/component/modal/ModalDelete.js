import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalDelete = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [user, setUser] = useState({
		no: props.no,
		name: props.name
	});

	// 회원삭제
	var deleteUser = () => {
		fetch(`http://localhost:8080/adminpage/deleteuser/${user.no}`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				setShow(false);
				if (res == "success") {
					alert("삭제되었습니다.");
					window.location.replace("/adminpage");
				} else {
					alert("삭제실패하였습니다.");
				}
			});
	}


	return (
		<div>
			<Button variant="outline-secondary" onClick={handleShow}>
				회원삭제
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{user.name} 삭제하시겠습니까?</Modal.Title>
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

export default ModalDelete;