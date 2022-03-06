import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import Header from './component/Header';
import Main from './component/Main';
import { Container } from 'react-bootstrap';


function App() {
  return (<>
    <Header></Header>
    <Container>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;
