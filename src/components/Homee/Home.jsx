import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Search from '../SearchBar/FoodSearch';
import Footer from '../footer/footer';

// Import the slick-carousel stylesheets
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import GridTemplateColumns from './GridTemplateColumns'; 

function Home() {

    const sliderSettings = {
        infinite: true,
        speed: 980,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2900,
    };

    const home = {
        position: "absolute", // Set position to absolute
        top: "80%", // Adjusted the value to fit correctly
        left: "50%", // Center horizontally
        transform: "translate(-50%, -50%)", // Center the box
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: "10px 20px",
        height: "450px",
        width: "80%", // Customize the width as needed (e.g., 80%)
        zIndex: 1, // Ensure the box is in front of the slider
    };

 

 



    const menuItemStyle2 = {
        gap: "20px", // Adjust the gap as needed
        color: "white",
        textTransform: "none",
        fontWeight: "normal",
        fontSize: "1rem",
        padding: "10px 40px 30px 40px",
        margin: "0 20px 10px 10px", // Removed negative margin
    };

    const menuItemStyle3 = {
        gap: "20px", // Adjust the gap as needed
        color: "white",
        textTransform: "none",
        fontWeight: "normal",
        fontSize: "1rem",
        padding: "10px 40px 30px 40px",
        margin: "0 20px 10px 10px", // Removed negative margin
    };

    const searchBarContainer = {
        position: 'absolute',
        top: '10%',
       
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        width: '80%',
       
        marginLeft : '-180px',
    };

    return (
      <div>
       <div style={{ width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'hidden' }}>
            {/* Hero section with image slider */}
            <Slider {...sliderSettings}>
                <div style={{ position: 'relative' }}>
                    <Box sx={searchBarContainer}>
                        <Search />
                    </Box>
                    <img style={{ width: '100%', display: 'block' }} src="./home2.jpg" alt="Slide 1" />
                </div>
                <div style={{ position: 'relative' }}>
                <Box sx={searchBarContainer}>
                        <Search />
                    </Box>
                    <img style={{ width: '100%', display: 'block' }} src="./home1.jpg" alt="Slide 2" />
                </div>
                <div style={{ position: 'relative' }}>
                <Box sx={searchBarContainer}>
                        <Search />
                    </Box>
                    <img style={{ width: '100%', display: 'block' }} src="./home6.jpg" alt="Slide 3" />
                </div>
                <div style={{ position: 'relative' }}>
                <Box sx={searchBarContainer}>
                        <Search />
                    </Box>
                    <img style={{ width: '100%', display: 'block' }} src="./home7.jpg" alt="Slide 4" />
                </div>
                {/* Add as many slides as you want */}
            </Slider>
            <Box sx={home}>
                <GridTemplateColumns />
            </Box>
      

            </div>
            <div style={{marginLeft: '450px'}}>
            <Box style={{marginTop: '30px',backgroundColor: '#f0e9e6',height: '140px',width: '60%',alignContent: 'center',}}>

              <div style={{display:'flex',marginTop: '-30px',marginLeft: '50px'}}>
                <Box style={{marginTop:'30px',paddingLeft: '50px',width: '40%',height: '40px',backgroundColor: '#a39c99',borderRadius: '5px'}}>

                  <div style={{display: 'flex'}}>
                    <img src="./delivery.png" style={{width: '35px',height: '35px',marginRight: '30px'}} alt="Slide 1" />
                  <Typography style={{marginTop: '10px',fontWeight: 'bold'}}>Delivery</Typography>
                  </div>
                  </Box>

                  <Box style={{marginTop:'30px',marginLeft: '50px',width: '40%',height: '40px',backgroundColor: '#a39c99',borderRadius: '5px'}}>
                  <div style={{display: 'flex'}}>
                  <img src="./takeaway.png" style={{width: '35px',height: '35px',marginRight: '20px',marginLeft: '20px'}} alt="Slide 1" />
                  <Typography style={{marginTop: '10px',fontWeight: 'bold'}}>TakeAway</Typography> </div>
                  </Box>
              </div>
              <Box style={{marginTop:'30px',marginLeft: '50px',width: '83%',height: '40px',backgroundColor: '#a39c99',borderRadius: '5px'}}>
              <div style={{display: 'flex'}}>
                  <img src="./location.png" style={{width: '35px',height: '35px',marginRight: '20px',marginLeft: '20px',}} alt="Slide 1" />
                  <Typography style={{marginTop:'10px',marginLeft: '20px',fontWeight: 'bold'}} >Find My Curent Location</Typography></div>
                  </Box>
        </Box></div>

            <div style={{marginTop: '80px'}}>
         <Footer /></div>
        
        </div>
    );
}

export default Home;
