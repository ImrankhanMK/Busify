import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Login from './auth/Login';
import Signup from './auth/SignUp';

function App() {

  return (
    <>
     <Router>
       <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">
          Busify
        </Link>
        <div className="ms-auto">
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
        </div>
      </nav>
     
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
