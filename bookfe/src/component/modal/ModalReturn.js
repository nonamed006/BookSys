
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalReturn = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [book, setBook] = useState({
    no: props.bookNo,
    title: props.bookTitle
  });

  const [reload, setReload] = useState(props.reload);

  // 수정사항 -- 삭제 후 페이지 리로드 안됨 ==============================================
  // 책 삭제
  var returnBook = () => {
    fetch(`http://localhost:8080/mypage/delete/${book.no}`, {
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
        console.log(res);
      });
  }

  return (
    <div>
      <Button variant="secondary" onClick={handleShow}>
        반납하기
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize:'18px'}}>{book.title} 반납하시겠습니까?</Modal.Title>
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