import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../api';

// Notifications Library
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { icon } from "@fortawesome/fontawesome-svg-core";

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    if (!Email || !Password) {
      Swal.getPopup({
        icon:'error'
      })
      setError("Email and Password are required!");
      return;
    }

    try {
      const response = await api.post("api/users/login", { email: Email, password: Password });
      console.log(response);
      
      // Save token in localStorage
      localStorage.setItem("token", response.data.accessToken);

      // Redirect to home page
      navigate("/home");

      Swal.fire({
        icon: 'success',
        title: 'logged in successfully 😊',
        timer:2000,
        showConfirmButton: false,
        willClose: () => {
          console.log('Alert closed')
        }
      })
      
    } catch (error) {
      Swal.fire({
        icon:'error',
        title:'Oops! Login Failed ☹️',
        text: 'Invalid Email or Password, please try again.'
      })
      setError(error.response ? error.response.data.message : "Login failed");
      console.log(error);
    }
  }

  return (
    <div className="bg-login">
      <div className="mt-2">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <label className="label mt-3" htmlFor="email">Email address</label>
          <input
            className="input"
            id="email"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label mt-3" htmlFor="password">Password</label>
          <input
            className="input"
            id="password"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between mt-4 link-center">
          <div>
            <button className="button" type="submit">Login</button> {/* Using submit type */}
          </div>
          <div>
            <p className="link"><Link className="anchor-link">Forgot your password?</Link></p>
          </div>
        </div>
        <div className="mt-5">
          <p className="link">
            Don't have an account? <Link className="anchor-link" to="/register">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
