import React from 'react';
import './Home.css';
import typography from '@mui/material/Typography';

const Home22 = () => {
    return (
        <div className="container">
            <img
              src="/home.jpg"
              alt="Home"
              className="image"
            />
            <div className="overlay">
                <div className="text-title" style={{ fontSize: '80px',marginLeft: '80px' }}>Order tasty food <div className="text-title" style={{ fontSize: '50px' }}>from YUM YARD</div></div>
                <div className="text-content">
                <button style={{ marginLeft: '80px', borderRadius: '10px', fontSize: '20px', }} className="button">Order Now</button>
                </div>
               
            </div>
            
        </div>
    );
}

export default Home22;
