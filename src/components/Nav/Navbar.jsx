import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import logo from './logo.png'

const Nav = styled.nav`
  width: 100%;
  height: 75px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 px;
  display: flex;
  justify-content: space-between;
  background-color: #ffd100;
  
  position: relative;
  z-index: 100;
  

  @media screen and (max-width: 768px) {
    .burger-menu {
      position: absolute;
      top: 55px;
      right: 20px;
    }
  }
`


const Navbar = () => {
  return (
    <Nav>
      
    
        <img
          src={logo}
          alt="logo"
          className="logo"
          style={{ width: '150px', height: '160px', paddingLeft: '70px', paddingBottom: "90px"}} // Inline CSS for the image
        />
      
      <div className="burger-menu">
        <Burger />
      </div>
    </Nav>
  )
}

export default Navbar;
