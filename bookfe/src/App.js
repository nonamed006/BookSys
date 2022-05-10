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
import RequireAuth from './component/admin/RequireAuth';

function App() {
  const [user, setUser] = useState({});
  
  return (<>
    <Header user={user} setUser={setUser}></Header>
    <Container>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/mypage" element={<RequireAuth ><Mypage /></RequireAuth>} />
        <Route path="/adminpage" element={<RequireAuth > <AdminPage /></RequireAuth>} />
        <Route path="/adminbookadd" element={<RequireAuth ><AdminBookadd /></RequireAuth>} />
        <Route path="/adminbookdel" element={<RequireAuth ><AdminBookdel /></RequireAuth>} />
        <Route path="/adminbookupdate/:no" element={<RequireAuth ><AdminBookupdate /></RequireAuth>} />
        <Route path="/bookdetail/:no" element={<BookDetail user={user}/>} />
        <Route path="/updateuser" element={<RequireAuth ><UserUpdate /></RequireAuth>} />
        <Route path="/publisher/:publisher" element={<PublisherList />} />
        <Route path="/seachlist/:title" element={<SearchList />} />
        <Route path="/booklistall/:category" element={<BookListAll />} />
        <Route path='/*' element={<h2><br/>잘못된 접근입니다.</h2>} />
      </Routes>
    </Container>
  </>
  );
}

export default App;
