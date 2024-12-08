import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [registerObject, setRegisterObject] = useState({});
  const navigate = useNavigate();

  async function RegisterInputs(event) {
    try {
      event.preventDefault();
      if (!Name || !Email || !Password) {
        console.log("Name, Email, and Password are required!"); // Display an alert message
        return; // Exit the function
      }
  
      setRegisterObject({
        name: Name,
        email: Email,
        password: Password,
      });
  
      const response = await api.post("api/users/register", {
        name: Name,
        email: Email,
        password: Password,
      });
      console.log(response);
  
      setName('');
      setEmail('');
      setPassword('');
  
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  
  const isFormValid = Name && Email && Password;


  useEffect(() => {
    if (Name && Email && Password) {
      console.log("Updated register object", registerObject);
    }
  }, [registerObject])


  return (
    <div className='bg-login'>
      <div>
        <h1>Register</h1>
      </div>
      <form>
        <div>
          <label className="label mt-2" htmlFor="username">Username</label>
          <input 
            id="username" 
            className='input' 
            type="text" 
            value={Name} 
            onChange={(e) => setName(e.target.value)} 
            required />
        </div>
        <div>
          <label className="label mt-2" htmlFor="email">Email</label>
          <input 
            id="email" 
            className='input' 
            type="email" 
            value={Email} 
            onChange={(e) => setEmail(e.target.value)} 
            required />
        </div>
        <div>
          <label className="label mt-2" htmlFor="password">Password</label>
          <input 
            id="password" 
            className='input' 
            type="password" 
            value={Password} 
            onChange={(e) => setPassword(e.target.value)}  
            required />
        </div>
        <div className="d-flex justify-content-between mt-4 link-center">
          <div>
            <button 
              type="button" 
              className='button mb-4' 
              onClick={RegisterInputs} 
              disabled={!isFormValid}>
              Register
            </button>
          </div>
        </div>
      </form>
      <div>
        <p className="link">
          Already have an account? <Link className="anchor-link" to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
