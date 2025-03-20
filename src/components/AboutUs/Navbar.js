import { useState } from 'react';
import React from 'react';
import './Navbar.css'
import logo__icon from './logo.png';
import search_icon from './search .png';
import info_icon from './info.png';
import phone_icon from './phone.png';
import home_icon from './home.png';
import cart_icon from './shopping-cart.png';
import user_icon from './user.png';

function Navbar() {
  const[value,setValue]=useState()
   const onChange = (e) =>{
   setValue(e.target.value)
   }
  return (
    <nav>
      <div className="logo_img1">
        <img src={logo__icon} alt=''/>
        <span className="logo-name">Team Void</span>
      </div>

      <div className="search">
                
                <label>
                  <div className='srch'>
                  <search_icon><img src={search_icon} alt=""/></search_icon> </div>
                  
                  <input type="text" placeholder='What would you like to eat' onChange={onChange} value={value}/>
                 
                </label>

                <ul>

                  <img src={info_icon} alt='' className="info"/>
                  <img src={phone_icon} alt='' className="phone"/>
                  <img src={home_icon} alt='' className="home"/>
                  <img src={cart_icon} alt='' className='cart'/>
                  <img src={user_icon} alt='' className='user'/>

                </ul>
      </div>

    
    </nav>
  );
}

export default Navbar;
