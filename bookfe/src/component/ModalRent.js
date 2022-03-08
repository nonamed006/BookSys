
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

		const [reload, setReload] = useState(props.reload);
	
	// 수정사항 -- 대여 후 페이지 리로드 안됨 ==============================================
	// 책 대여하기
  var rentBook = () => {
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
          alert("ok");
        } else if(res=="failCnt"){
          alert("3권이상 대여할 수 없습니다.");
        } else{
          alert("fail");
        }
        console.log(res);
      });
  }

    return (
        <div>
            <Button variant="secondary" onClick={handleShow}>
            대여하기
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{book.title} 대여하시겠습니까?</Modal.Title>
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