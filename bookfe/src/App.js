import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import Main from './component/Main';
import Signup from './component/user/Signup';
import PublisherList from './component/category/PublisherList';
import BookCategory from './component/category/BookCategory';
import Mypage from './component/user/Mypage';
import AdminPage from './component/admin/AdminPage';
import AdminBookadd from './component/admin/AdminBookadd';
import AdminBookdel from './component/admin/AdminBookdel';
import AdminBookupdate from './component/admin/AdminBookupdate';
import UserUpdate from './component/UserUpdate';
import BookDetail from './component/BookDetail';
import Login from './component/user/Login';
import Header from './component/Header';
import SearchList from './component/SearchList';





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
        <Route path="/bookdetail/:no" element={<BookDetail />} />
        <Route path="/updateuser" element={<UserUpdate />} />
        <Route path="/category/:category" element={<BookCategory />} />
        <Route path="/publisher/:publisher" element={<PublisherList />} />
        <Route path="/seachlist/:title" element={<SearchList />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;
