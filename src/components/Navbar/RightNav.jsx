import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    display: ${({ open }) => open ? 'flex' : 'none'};
    flex-flow: column nowrap;
    background-color: 	#ffd100;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      li {
        color: ${({ open }) => open ? '#fff' : 'red'};
    }
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
`;

const RightNav = ({ open }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
    if (loggedInUserNIC) {
      navigate(`/getUser/${loggedInUserNIC}`);
    } else {
      navigate('/loginCus');
    }
  };

  return (
    <Ul open={open}>
         <li><StyledLink to="/">Home</StyledLink></li>
         <li><StyledLink to="/fetch">All Foods</StyledLink></li>
      <li><StyledLink to="/getUser/:nic" onClick={handleProfileClick}>Profile</StyledLink></li>
     
      <li><StyledLink to="/ContactUs">Contact Us</StyledLink></li>
      <li><StyledLink to="/AboutUs">About Us</StyledLink></li>
      <li><StyledLink to="/loginCus">Sign In</StyledLink></li>
      <li><StyledLink to="/register">Sign Up</StyledLink></li>
    
    </Ul>
  );
}

export default RightNav;
