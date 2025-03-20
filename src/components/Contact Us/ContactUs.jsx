import React, { useState } from 'react';
import './ContactUs.css';
import { Typography } from '@mui/material';
import axios from 'axios';
import envelope_icon from './envelope.png';
import phone_icon from './smartphone.png';
import img_icon from './img1.jpeg';
import Footer from '../footer/footer';
import { BASE_URL } from '../../config';
function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    errors: {},
    loading: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Your Name is required";
    }
    if (!formData.phone) {
      errors.phone = "Phone Number is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.reason) {
      errors.reason = "Reason is required";
    }

    setFormData((prevState) => ({ ...prevState, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setFormData((prevState) => ({ ...prevState, loading: true }));

    try {
      const response = await axios.post(`${BASE_URL}/contactUs/add`, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        reason: formData.reason,
      });
      console.log(response.data);
      alert("Your message has been sent successfully!");
      // Reset form fields after successful submission
      setFormData({
        name: "",
        phone: "",
        email: "",
        reason: "",
        errors: {},
        loading: false,
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("There was an error submitting your message. Please try again.");
      setFormData((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div>
      <div className='container4'>
        <h1 className='head'>Contact Us</h1>
        <link href='https://fonts.googleapis.com/css?family=Irish Grover' rel='stylesheet'></link>
        <form className='form' onSubmit={handleSubmit}>
          <label>
            <br></br>
            <input type="text" placeholder="Name" className='input' name="name" value={formData.name} onChange={handleChange} />
            {formData.errors.name && (
              <p className='error-message'>{formData.errors.name}</p>
            )}
          </label>
          <br></br>
          <label>
            <br></br>
            <input type="tel" placeholder="Phone Number" className='input' name="phone" value={formData.phone} onChange={handleChange} pattern="\d{10}" />
            {formData.errors.phone && (
              <p className='error-message'>{formData.errors.phone}</p>
            )}
          </label>
          <br></br>
          <label>
            <br></br>
            <input type="email" placeholder="Email" className='input' name="email" value={formData.email} onChange={handleChange} />
            {formData.errors.email && (
              <p className='error-message'>{formData.errors.email}</p>
            )}
          </label>
          <br></br>
        
            <label>
              <br></br>
              <textarea name="reason" placeholder="Reason and Message" className='input' value={formData.reason} onChange={handleChange} />
              {formData.errors.reason && (
                <p className='error-message'>{formData.errors.reason}</p>
              )}
            </label>
          
          <div className='phone'>
            <img src={phone_icon} alt="" />
          </div>
          <input type="submit" value="Submit" className="Submit-button" disabled={formData.loading} />
          {formData.loading && (
            <div>Loading...</div>
          )}
          <div className='message'>
            <img src={envelope_icon} alt="" />
          </div>
        </form>
        <div className="image1">
          <img src={img_icon} alt=" " />
        </div>
      </div>
      <div style={{ marginTop: "0px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default ContactUs;
