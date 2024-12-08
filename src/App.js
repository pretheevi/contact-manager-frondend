import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './login-register-components/login';
import Register from './login-register-components/register';
import Home from './home-components/home';
import { useEffect, useState } from 'react';
import About from './home-components/home-components/about';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route  path="/"  element={
            <div className="auth-bg d-flex flex-column">
              <h4>Sample</h4>
              <p>email:john@gmail.com, pwd: 123</p>
              <Login />
            </div>
          }
        />
        <Route path="/register"  element={
            <div className="auth-bg d-flex flex-column">
              <h4>Sample</h4>
              <p>email:john@gmail.com, pwd: 123</p>
              <Register />
            </div>
          }
        />

        <Route path="/about"  element={
            <div className="auth-bg">
              <About />
            </div>
          }
        />
        
        <Route path="/home" element={ isAuthenticated ?  <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


