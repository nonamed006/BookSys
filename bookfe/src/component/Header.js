import React, { useEffect, useState } from 'react';
import { Button, Container, FormControl, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = (props) => {

  const user = props.user;
  const setUser = props.setUser;
  


  // 사용자 정보 불러오기 ================================
  useEffect(()=>{
    fetch("http://localhost:8080/user/head", {
      method: "get",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem('Authorization')
      }
    }).then((res) => res.json())
      .then((res) => {
        setUser(res);
        console.log(res);
      });

  },[])

  var handleLogout = () =>{
    localStorage.removeItem("Authorization");
    window.location.replace("/");
  }

    return (<Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>BookSys</Navbar.Brand>
        <Nav className="me-auto">
          {/* 도서목록 */}
          <Nav.Link href="/">도서목록</Nav.Link>
          {user.no == null ? <Nav.Link href="/login"> 로그인</Nav.Link> : 
            user.role == "U" ?
            <NavDropdown title={user.name} id="basic-nav-dropdown">
            <NavDropdown.Item href="/mypage">MyPage</NavDropdown.Item>
            <NavDropdown.Item href="/updateuser">profile</NavDropdown.Item>
            {/* <NavDropdown.Item href="/cart">Cart</NavDropdown.Item> */}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item> 
          </NavDropdown> :
          // 관리자가 로그인 했을때 Nav
          <NavDropdown title="관리자" id="basic-nav-dropdown">
          <NavDropdown.Item href="/adminpage">AdminPage</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item> 
        </NavDropdown>
          } 
          {user.no == null ?<Nav.Link href="/signup">회원가입</Nav.Link> : null }
        </Nav>
        <div className="col-xs-2">
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