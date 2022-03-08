import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Header from './component/Header';
import Main from './component/Main';
import { Container } from 'react-bootstrap';
import Mypage from './component/Mypage';
import AdminPage from './component/AdminPage';
import AdminBookadd from './component/AdminBookadd';
import AdminBookdel from './component/AdminBookdel';
import BookDetail from './component/BookDetail';
import { useState } from 'react';



function App() {
  const [user, setUser] = useState({});

  return (<>
    <Header user={user} setUser={setUser}></Header>
    <Container>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/adminbookadd" element={<AdminBookadd />} />
        <Route path="/adminbookdel" element={<AdminBookdel />} />
        <Route path="/bookdetail" element={<BookDetail />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;
