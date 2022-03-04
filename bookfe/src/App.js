import logo from './logo.svg';
import './App.css';
import Main from './component/Main';
import { Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
    </Routes>
  );
}

export default App;
