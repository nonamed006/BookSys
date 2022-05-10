
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PORT } from '../../set';

const ModalReturn = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [book, setBook] = useState({
    no: props.bookNo,
    title: props.bookTitle
  });

  // 책 삭제
  var returnBook = () => {
    fetch(`${PORT}/mypage/delete/${book.no}`, {
      method: "get",
      // res에 결과가 들어옴
    }).then((res) => res.text())
      .then((res) => {
        setShow(false);
        if (res == "success") {
          alert("반납되었습니다.");
          window.location.replace("/mypage");
        } else {
          alert("반납실패하였습니다.");
        }
      });
  }

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        반납하기
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>{book.title} 반납하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={returnBook}>
            반납
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalReturn;