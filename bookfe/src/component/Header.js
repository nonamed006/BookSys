import React, { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = (props) => {

  const user = props.user;
  const setUser = props.setUser;

  // 사용자 정보 불러오기 ================================
  useEffect(() => {
    fetch("http://localhost:8080/user/head", {
      method: "get",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': localStorage.getItem('Authorization')
      }
    }).then((res) => res.json())
      .then((res) => {
        setUser(res);
      });

  }, [])

  // 로그아웃 함수
  var handleLogout = () => {
    localStorage.removeItem("Authorization");
    window.location.replace("/");
  }

  return (<Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">BookSys</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/booklistall/notSearch">도서 목록</Nav.Link>
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
        {user.no == null ? <Nav.Link href="/signup">회원가입</Nav.Link> : null}
      </Nav>
    </Container>
  </Navbar>
  );
};

export default Header;