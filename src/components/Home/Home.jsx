import React, { useState, useEffect } from "react";

//import "../index.css";
import image0 from "./search.png";
import imageSearch from "./deliSearch.png";
import lockPickup from "./lockPickup.png";
import delivery from "./delivery.png";
import image1 from "./plate1.png";
import image2 from "./plate2.png";
import image3 from "./plate3.png";
import image4 from "./plate4.png";
import "./DynamicImage.css";
//import Navbar from "../componets/Navbar";
import Footer from '../footer/footer';
import FoodSearch from '../SearchBar/FoodSearch';
import { Link } from 'react-router-dom';


const inputStyle = {
  boxSizing: "border-box",
  tabSize: "20",
  border: "1px solid transparent",
  width: "30%",
  height: "35px",
  //padding: "0px 12px",
  paddingLeft: "40px",
  borderRadius: "5px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  padding: "10px 40px 10px 30px",
  backgroundImage: `url(${image0})`,
  backgroundPosition: "top 5px left 3px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "25px 25px",
  fontSize: "14px",
  outline: "none",
  position: "absolute",
  top: 100,
  left: "60%",
  zIndex: 999,
  display: "inline-block",
  letterSpacing: "2px",
};
const inputStyle2 = {
  boxSizing: "border-box",
  tabSize: "20",
  border: "1px solid transparent",
  width: "65%",
  height: "35px",
  //padding: "0px 12px",
  paddingLeft: "40px",
  borderRadius: "5px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.6)",
  padding: "10px 40px 10px 30px",
  backgroundImage: `url(${imageSearch})`,
  backgroundPosition: "top 5px left 4px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "20px 25px",
  fontSize: "14px",
  outline: "none",
  position: "absolute",
  backgroundColor: "rgba(172, 172, 172, 0.46)",
  color: "#545454",
  zIndex: 999,
  display: "inline-block",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "#d16943", //background color
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  
};

const Home = () => {
  const images = [image1, image2, image3, image4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const changeImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const interval = setInterval(changeImage, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div style={overlayStyle}>
      <div className="search" style={{ position: "absolute", top: 100, zIndex: 999 }}>
    <FoodSearch />
</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: " sans-serif",
            letterSpacing: "5px",
            color: "#1F1F1F",
            fontSize: 70,
            marginTop: -100,
            marginRight: 590,
          }}
        >
          Are you Hungry?
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 10,
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "5px",
            color: "#1F1F1F",
            fontSize: 30,
            marginTop: -10,
            marginRight: 715,
          }}
        >
          You wanna taste something
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          top: 450,
          left: 50,
          width: "35%",
          height: "110px",
          backgroundColor: "#E1E1E1", //background color for delivery
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            padding: "10px 30px",
            position: "absolute",
            display: "flex",
            marginTop: -50,
          }}
        >
          <button
            style={{
              marginRight: 10,
              padding: "2px 30px",
              backgroundColor: "white",
              borderRadius: 5,
              color: "#004E58",
              fontWeight: "600",
              backgroundImage: `url(${delivery})`,
              backgroundPosition: "top 5px left 8px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "18px 17px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.6)",
              lineHeight: "1",
              height: 32,
              marginTop: 15,
              fontSize: 15,
            }}
          >
            Delivery
          </button>

         
    <p
      style={{
        padding: "5px 30px",
        fontWeight: "bold",
        backgroundImage: `url(${lockPickup})`,
        backgroundPosition: "top 5px left 8px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "18px 17px",
        borderRadius: 5,
        cursor: "pointer",
      }}
    >
     Pick up
    </p>
 
        </div>

        <div style={{ marginLeft: 30, marginTop: 12 }}>
          <input
            type="text"
            placeholder="Enter your address"
            style={inputStyle2}
          ></input>
        </div>
      </div>
      <div className="dynamic-image-container">
        <div className="image-wrapper">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="food"
              className={index === currentImageIndex ? "active" : ""}
              style={{
                width: 420,
                height: 420,
                marginTop: 170,
                marginLeft: 700,
              }}
            />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
