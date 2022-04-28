
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalRent = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

		const [book, setBook] = useState({
			no: props.no,
			title: props.booktitle,
		})

	
	// 책 대여하기
  const rentBook = () => {
    fetch(`http://localhost:8080/user/main/${book.no}`, {
      method: "get",
			headers: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': localStorage.getItem("Authorization")
      }
      // res에 결과가 들어옴
    }).then((res) => res.text())
      .then((res) => {
				setShow(false);
        if(res=="success"){
          alert("대여되었습니다.");
          window.location.replace("/");
        } else if(res=="failCnt"){
          alert("3권이상 대여할 수 없습니다.");
        } else{
          alert("로그인해주세요");
        }
      });
  }

    return (
        <div>
            <Button size='sm' variant="danger" onClick={handleShow}>
            대여하기
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize:'18px'}}>{book.title} 대여하시겠습니까?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={rentBook}>
                        대여
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalRent;