import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typography from "@mui/material/Typography";

function Item(props) {
  const { sx, children } = props;

  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  children: PropTypes.node,
};

export default function GridTemplateColumns() {
  const sliderSettings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    

   
  };

  return (
    <Box sx={{ width: '100%', height: '20px', display: 'grid',marginTop: '10px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
   
      <Item>
    
          <div>
      
            <img style={{ width: '100%', display: 'block', maxHeight: '300px', maxWidth: '100%' }} src="./grid1.jpg" alt="Slide 3" />
          </div><br></br>
        
          <Typography  style={{ fontFamily: 'Arial', fontSize: '15px', color: 'black',textAlign: 'justify'}}>Discover a culinary paradise with our Foodie Delight collection. Curated for the ultimate food lover, this selection features a diverse range of gourmet dishes that are sure to tantalize your taste buds and leave you craving more. </Typography>
      
      </Item>
   
      <Item>
        <img style={{ width: '100%', display: 'block', maxHeight: '370px', maxWidth: '100%' }} src="./grid5.jpg" alt="Slide 5" />
        <br></br>
     
      <Typography style={{ fontFamily: 'Arial', fontSize: '15px', color: 'black',textAlign:'justify'}}>Welcome to Yummy Yard, your go-to destination for delicious and diverse food options. Whether you're in the mood for a quick snack, a hearty meal, or a sweet treat, we have something to satisfy every craving. Enjoy the convenience of having your favorite dishes delivered straight to your door..</Typography>
      
      </Item> 
      <Item>
        <img style={{ width: '100%', display: 'block', maxHeight: '300px', maxWidth: '100%' }} src="./grid2.jpg" alt="Slide 5" />
       <br></br> 
        <Typography style={{ fontFamily: 'Arial', fontSize: '15px', color: 'black',textAlign:'justify'}}>Discover a culinary paradise with our Foodie Delight collection. Curated for the ultimate food lover, this selection features a diverse range of gourmet dishes that are sure to tantalize your taste buds and leave you craving more.</Typography>
      
      </Item>


      <Box style={{ width: '100%', height: '20px',backgroundcolor:'red',  }}>
    </Box>
    </Box>
  );
}
