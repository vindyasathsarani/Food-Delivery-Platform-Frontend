import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Addcustomer.css';
import Footer from '../footer/footer';
import { BASE_URL } from '../../config';
const firebaseConfig = {
  apiKey: "AIzaSyAarwFcpYIKj1T7Hb2yIOMNiDP5Hp-ezFc",
  authDomain: "vitefood-72ee6.firebaseapp.com",
  projectId: "vitefood-72ee6",
  storageBucket: "vitefood-72ee6.appspot.com",
  messagingSenderId: "117616991639",
  appId: "1:117616991639:web:db446386bd507c21f838d2"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const Addcustomer = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [customer, setCustomer] = useState({
    fname: '',
    lname: '',
    nic: '',
    phone: '',
    email: '',
    no: '',
    street1: '',
    street2: '',
    city: '',
    imageUrl: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Define showConfirmPassword state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'cimages/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress if needed
        },
        (error) => {
          console.error('Error uploading image to Firebase:', error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('DownloadURL:', downloadURL);
            setCustomer({ ...customer, imageUrl: downloadURL }); // Update food state with image URL
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      );
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all fields are filled
      if (!customer.fname || !customer.lname || !customer.nic || !customer.phone || !customer.email || !customer.no || !customer.street1 || !customer.street2 || !customer.city || !customer.imageUrl || !customer.password || !customer.confirmPassword) {
        console.error('Please fill all fields');
        return;
      }

      // Save data to MongoDB
      await axios.post(`${BASE_URL}/customers/register`, customer);
      console.log('customer added successfully');
      alert('customer added successfully');

      setCustomer({
        fname: '',
        lname: '',
        nic: '',
        phone: '',
        email: '',
        no: '',
        street1: '',
        street2: '',
        city: '',
        imageUrl: '',
        password: '',
        confirmPassword: '',
      });
      // Navigate to another page after submission
      navigate('/loginCus'); // Change '/hfetch' to the desired URL
    } catch (error) {
        console.log('Error adding food:', error);
      calert('Error adding food:', error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
    <section>
       
      <br></br>
        <div className="container1">
        <form className='flex' method="POST" onSubmit={handleSubmit}>
          
            <center><h1 className="form-title">Registration</h1></center>

    <div className="main-user-info">  
    <div className="user-input-box-dhanu"> 
    <label for="first Name">First Name</label>
  <input
    type="text"
    id="fname"
    name="fname"
    title="Enter only letters"
    required
    placeholder="Enter First Name"
    value={customer.fname}
    onChange={(e) => {
      const input = e.target.value;
      if (/^[A-Za-z]*$/.test(input)) {
        setCustomer({ ...customer, fname: input });
      }
    }}
    onKeyPress={(e) => {
      const charCode = e.charCode;
      if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        e.preventDefault();
      }
    }}
  />
</div>   
<div className="user-input-box-dhanu"> 
<label for="last Name">Last Name</label>
  <input
    type="text"
    id="lname"
    name="lname"
    title="Enter only letters"
    required
    placeholder="Enter Last Name"
    value={customer.lname}
    onChange={(e) => {
      const input = e.target.value;
      if (/^[A-Za-z]*$/.test(input)) {
        setCustomer({ ...customer, lname: input });
      }
    }}
    onKeyPress={(e) => {
      const charCode = e.charCode;
      if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        e.preventDefault();
      }
    }}
  />
</div>

<div className="user-input-box-dhanu"> 
<label for="nic">NIC</label>
  <input
    type="text"
    id="nic"
    name="nic"
    pattern="^(?:\d{12}|\d{12}[Vv])$"
    title="Enter exactly 12 numbers or 12 numbers followed by 'V'/'v'"
    required
    placeholder="Enter NIC No"
    value={customer.nic}
    onChange={(e) => {
      const input = e.target.value;
      if (/^\d{0,12}[Vv]?$/.test(input)) {
        setCustomer({ ...customer, nic: input });
      }
    }}
  />
</div>
<div className="user-input-box-dhanu"> 
            
                <label>
                  Profile Photo:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
          
           </div> 


           <div className="user-input-box-dhanu"> 

           <label for="telephone">Telephone NUMBER </label>
  <input
    type="tel"
    id="phone"
    name="phone"
    maxLength="10"
    placeholder="Enter phone No"
    title="Enter a number that starts with 0 and has 9 additional digits"
    required
    value={customer.phone}
    onKeyPress={(e) => {
      const charCode = e.charCode;
      const currentValue = e.target.value;

      // Allow only numeric characters and backspace/delete key
      if (
        (charCode < 48 || charCode > 57) && // Not a numeric character
        charCode !== 8 && // Not backspace
        charCode !== 46 // Not delete
      ) {
        e.preventDefault();
      }
    }}
    onChange={(e) => {
      const input = e.target.value;
      if (/^[0-9]*$/.test(input) && input.length <= 10) {
        setCustomer({ ...customer, phone: input });
      }
    }}
  />
</div>


<div className="user-input-box-dhanu"> 
<label for="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="Enter email"
    title="Enter a valid email address"
    required
    value={customer.email}
    onChange={(e) => {
      const input = e.target.value;
      setCustomer({ ...customer, email: input });
    }}
  />
</div>

<div className="user-input-box-dhanu"> 
<label for="no">Address No</label>
  <input
    type="text"
    id="no"
    name="no"
    placeholder="Address No"
    required
    value={customer.no}
    onChange={(e) => {
      let input = e.target.value;
      input = input.replace(/\/+/g, '/');

      if (input.length > 8) {
        input = input.slice(0, 8);
      }
      setCustomer({ ...customer, no: input });
    }}
    onKeyPress={(e) => {
      const charCode = e.charCode;
      const input = e.target.value;

      if (charCode >= 48 && charCode <= 57) {
        if (input.indexOf('/') === -1) {
          if (input.length >= 4) {
            e.preventDefault();
          }
        } else {
          const parts = input.split('/');
          if (parts.length === 2) {
            if (parts[0].length >= 4 || parts[1].length >= 4) {
              e.preventDefault();
            }
          } else {
            e.preventDefault();
          }
        }
      } else if (charCode === 47) {
        if (input.indexOf('/') !== -1) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    }}
  />
</div>

<div className="user-input-box-dhanu"> 
<label for="street 1">Street 1</label>
  <input
    type="text"
    id="street1"
    name="street1"
    placeholder="Street/city"
    required
    value={customer.street1}
    onChange={(e) => {
      let input = e.target.value;
      input = input.replace(/[^A-Za-z\s]/g, '');
      if (input.length > 50) {
        input = input.slice(0, 50);
      }
      setCustomer({ ...customer, street1: input });
    }}
    onKeyPress={(e) => {
      const charCode = e.charCode;
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        e.preventDefault();
      }
    }}
  />
</div>

<div className="user-input-box-dhanu"> 
<label for="Street 2">Street </label>
  <input
    type="text"
    id="street2"
    name="street2"
    placeholder="Street/city"
    required
    value={customer.street2}
    onChange={(e) => {
      let input = e.target.value;
      input = input.replace(/[^A-Za-z\s]/g, '');
      if (input.length > 50) {
        input = input.slice(0, 50);
      }
      setCustomer({ ...customer, street2: input });
    }}
    onKeyPress={(e) => {
      const charCode = e.charCode;
      if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
        e.preventDefault();
      }
    }}
  />
</div>

<div className="user-input-box-dhanu"> 
<label for="city">City</label> 
            <select
              id="city"
              name="city"
              required
              value={customer.city}
              onChange={handleChange}
            >
              <option value="" disabled>Select City</option>
              <option value="AM">Ampara</option>
              <option value="AD">Anuradhapura</option>
              <option value="BD">Badulla</option>
              <option value="BT">Batticaloa</option>
              <option value="CB">Colombo</option>
              <option value="GL">Galle</option>
              <option value="GP">Gampaha</option>
              <option value="HB">Hambantota</option>
              <option value="JA">Jaffna</option>
              <option value="KT">Kalutara</option>
              <option value="KD">Kandy</option>
              <option value="KG">Kegalle</option>
              <option value="KL">Kilinochchi</option>
              <option value="KR">Kurunegala</option>
              <option value="MN">Mannar</option>
              <option value="MT">Matale</option>
              <option value="MA">Matara</option>
              <option value="MG">Monaragala</option>
              <option value="ML">Mullaitivu</option>
              <option value="NE">Nuwara Eliya</option>
              <option value="PL">Polonnaruwa</option>
              <option value="PT">Puttalam</option>
              <option value="RT">Ratnapura</option>
              <option value="TC">Trincomalee</option>
              <option value="VA">Vavuniya</option>
            </select>

            </div>

            <div className="user-input-box-dhanu">
  <label htmlFor="password">Password</label>
  <div className="password-input-wrapper">
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      name="password"
      placeholder="Password"
      minLength="8"
      required
      value={customer.password}
      onChange={(e) => {
        const password = e.target.value;
        const lettersOnly = /^[a-zA-Z]*$/.test(password);
        const numbersOnly = /^[0-9]*$/.test(password);

        if (password.length < 8 || lettersOnly || numbersOnly) {
          e.target.setCustomValidity('Weak Password');
        } else {
          e.target.setCustomValidity('');
        }

        setCustomer({ ...customer, password: password });
      }}
    />
    {/* Toggle visibility icon for password */}
    <div className="vis">
      {showPassword ? (
        <VisibilityIcon onClick={togglePasswordVisibility} />
      ) : (
        <VisibilityOffIcon onClick={togglePasswordVisibility} />
      )}
    </div>
  </div>
  {customer.password && (customer.password.length < 8 || /^[a-zA-Z]*$/.test(customer.password) || /^[0-9]*$/.test(customer.password)) && (
    <p className="password-strength">Weak Password</p>
  )}
</div>


<div className="user-input-box-dhanu"> 
  <label htmlFor="confirmPassword">Confirm Password</label> 
  <div className="password-input-wrapper">
  <input
    type={showConfirmPassword ? 'text' : 'password'}
    id="confirmPassword"
    name="confirmPassword"
    placeholder="Confirm Password"
    minLength="8"
    required
    value={customer.confirmPassword}
    onChange={(e) => {
      setCustomer({ ...customer, confirmPassword: e.target.value });
    }}
    onBlur={(e) => {
      const confirmPassword = e.target.value;
      if (confirmPassword !== customer.password) {
        e.target.setCustomValidity("Passwords do not match");
      } else {
        e.target.setCustomValidity("");
      }
    }}
  />
  {/* Toggle visibility icon for confirm password */}
  <div className="vis2">
    {showConfirmPassword ? (
      <VisibilityIcon onClick={toggleConfirmPasswordVisibility} />
    ) : (
      <VisibilityOffIcon onClick={toggleConfirmPasswordVisibility} />
    )}
  </div></div>
</div></div>


<div className="form-submit-btn"> 
    <button type="submit">Submit</button>
</div>
          </form>
          </div>
         <br></br>
          </section> <Footer /></div>
          
  );
}

export default Addcustomer;
