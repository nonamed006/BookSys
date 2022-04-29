import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import Main from './component/Main';
import Signup from './component/user/Signup';
import PublisherList from './component/book/PublisherList';
import Mypage from './component/user/Mypage';
import AdminPage from './component/admin/AdminPage';
import AdminBookadd from './component/admin/AdminBookadd';
import AdminBookdel from './component/admin/AdminBookdel';
import AdminBookupdate from './component/admin/AdminBookupdate';
import UserUpdate from './component/user/UserUpdate';
import BookDetail from './component/book/BookDetail';
import Login from './component/user/Login';
import Header from './component/Header';
import SearchList from './component/book/SearchList';
import BookListAll from './component/book/BookListAll';

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
        <Route path="/adminbookupdate/:no" element={<AdminBookupdate />} />
        <Route path="/bookdetail/:no" element={<BookDetail user={user}/>} />
        <Route path="/updateuser" element={<UserUpdate />} />
        <Route path="/publisher/:publisher" element={<PublisherList />} />
        <Route path="/seachlist/:title" element={<SearchList />} />
        <Route path="/booklistall/:category" element={<BookListAll />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;
