import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import login from './login.png';
import person from './person.png';
import './Login.css';
import Footer from '../footer/footer';
import { BASE_URL } from '../../config';


function Login() {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const navigate = useNavigate();

  const handleNicChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,12}[Vv]?$/.test(input)) {
      setNic(input);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const lettersOnly = /^[a-zA-Z]*$/.test(password);
    const numbersOnly = /^[0-9]*$/.test(password);

    if (password.length < 8 || lettersOnly || numbersOnly) {
      e.target.setCustomValidity('Weak Password');
    } else {
      e.target.setCustomValidity('');
    }

    setPassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/customers/loginCus`, { nic, password });

      if (response.status === 200) {
        localStorage.setItem('loggedInUserNIC', nic);
        setNic("");
        setPassword("");
        setLoginSuccess(true);

        if (nic === '200028301681' && password === '12345678@') {
          navigate('/add');
        } else {
          navigate('/fetch');
        }
      } else {
        alert('Invalid NIC or password');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid NIC or password');
      } else {
        console.error('An error occurred', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
    <section className="vh-100" style={{ backgroundColor: 'white' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem', border: '1px solid #000000' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={login}
                    alt="Login Form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <div className="ll">
                          </div></div>
                          <h2 className="login" >                      <img
  src={person}
  alt="person"
  className="person"></img><br></br>Login</h2>
                      <br></br>

                      <div className="user-input-box-login">
                        <label htmlFor="nic">Enter Your NIC</label>
                        <input
                          type="text"
                          id="nic"
                          placeholder="Enter NIC"
                          name="nic"
                          value={nic}
                          onChange={handleNicChange}
                          autoComplete="off"
                        />
                      </div>

                      <div className="user-input-box-login">
                        <label htmlFor="Password">Enter Your Password</label>
                        <input
                          placeholder="Enter Password"
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                          autoComplete="off"
                        />
                       
                      </div>

                      <div className="form-submit-btn-l">
                        <button type="submit" className="red-button">Login</button>
                      </div>
                      <br></br>
                      <p className="signup-message-l">Don't have an account?{' '}</p>
                      <div className="signup-link-yapa">
                        <Link to="/register" className="signup-link">Register Here</Link>
                      </div>
                    </form>
                    {errorMessage && <p className="error-message-yapa">{errorMessage}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>

    <div style={{marginTop: '120px'}}>
    <Footer /></div></div>
   
  );
}

export default Login;
