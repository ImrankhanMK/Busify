import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Login from './auth/Login';
import Signup from './auth/SignUp';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
     
    </>
  )
}

export default App
