import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalReplyDel = ({ getReload, ...props }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	// 회원삭제
	var deleteUser = () => {
		fetch(`http://localhost:8080/user/reply/del/${props.no}`, {
			method: "get",
			headers: {
				'Content-Type': "application/json; charset=utf-8",
				'Authorization': localStorage.getItem("Authorization")
			}
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				setShow(false);
				if (res == "success") {
					alert("삭제되었습니다.");
					getReload(!props.reload);
				} else {
					alert("삭제실패하였습니다.");
				}
			});
	}


	return (
		<>
			<span style={{ fontSize: '11px', cursor: 'pointer' }} onClick={handleShow}> ✖</span>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title> 삭제하시겠습니까?</Modal.Title>
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
		</> 
	);
};

export default ModalReplyDel;