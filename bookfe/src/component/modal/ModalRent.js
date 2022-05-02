
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalRent = (props) => {
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [startDate, setStartDate] = useState(new Date());
	const [radioState, setRaioState] = useState('');
  
  var selDate = startDate.getFullYear() + '-0' + (startDate.getMonth()+1) + '-' + startDate.getDate();

	const handleChange = (e) => {
		console.log(typeof(e.target.id));
		setRaioState(e.target.id);
	}
  const [book, setBook] = useState({
    no: props.no,
    title: props.booktitle,
  });

  // 책 대여하기
  const rentBook = () => {
    fetch(`http://localhost:8080/user/main/${book.no}/${radioState == 'noDate' ? '9999-12-31' : radioState == ''? 'noRadio' : selDate}`, {
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
          alert("대여되었습니다.");
          window.location.replace("/");
        } else if(res == "noRadio"){
          alert("대여 날짜를 선택해 주세요.")
        }else if (res == "failCnt") {
          alert("3권이상 대여할 수 없습니다.");
        } else if(res == "admin"){
          alert("관리자 계정은 도서를 대여할수 없습니다.");
        }else {
          alert("로그인해주세요");
        }
      });
  }

  return (
    <>
      <Button size='sm' variant="secondary" onClick={handleShow}>
        대여하기
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>{book.title} 대여하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="mb-3">
				<Form.Check
					type='radio'
					id='noDate'
					name='radios'
					label='무기한 대여'
					onChange={handleChange}
				/>
				<Form.Check
					inline
					type='radio'
					id='selectDate'
					name='radios'
					label='날짜 선택'
					onChange={handleChange}
				/>
				<DatePicker
    	    selected={startDate}
	        onChange={(date) => setStartDate(date)} 
    />
			</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={rentBook}>
            대여
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRent;