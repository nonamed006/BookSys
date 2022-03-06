import React from 'react';
import { Button, Container, FormControl, InputGroup, Nav, Navbar } from 'react-bootstrap';

const Header = () => {

    return (<Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>BookSys</Navbar.Brand>
        <Nav className="me-auto">
          {/* 도서목록 클릭시 메인으로 안돌아오는 문제 수정하기============================================ */}
          <Nav.Link href="/">도서목록</Nav.Link>
          <Nav.Link href="/login">로그인</Nav.Link>
          <Nav.Link href="/signup">회원가입
          </Nav.Link>
        </Nav>
        <div class="col-xs-2">
          {/* <InputGroup >
            <FormControl
              placeholder="책이름으로 검색"
              aria-label="findByName"
              aria-describedby="basic-addon2"
              onChange={onChange}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={handelClick}>
              Search
            </Button>
          </InputGroup> */}
        </div>
      </Container>
    </Navbar>
    );
};

export default Header;