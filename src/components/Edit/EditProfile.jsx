import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import './EditProfile.css'
import DeleteIcon from '@mui/icons-material/Delete';
import editvideo from './editvideo.mp4';
import edit from './edit.jpg';
import { BASE_URL } from '../../config';

const EditProfile = () => {
  const { nic } = useParams(); // Get NIC from URL params
  const navigate = useNavigate(); // Initialize useNavigate hook
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
    imageUrl: ''
  });

  // Initialize Firebase app
 
const firebaseConfig = {
  apiKey: "AIzaSyAarwFcpYIKj1T7Hb2yIOMNiDP5Hp-ezFc",
  authDomain: "vitefood-72ee6.firebaseapp.com",
  projectId: "vitefood-72ee6",
  storageBucket: "vitefood-72ee6.appspot.com",
  messagingSenderId: "117616991639",
  appId: "1:117616991639:web:db446386bd507c21f838d2"
};
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        console.log("Fetching user details for NIC:", nic);
        const response = await axios.get(`${BASE_URL}/customers/getUser/${nic}`);
        console.log("User details response:", response.data);
        const { status, customer } = response.data;

        if (status === "Customer fetched") {
          setCustomer(customer);
        } else {
          console.error(`Error: ${status}`);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchUserProfile();
  }, [nic]);

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
            setCustomer({ ...customer, imageUrl: downloadURL }); // Update customer state with image URL
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      );
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (confirmDelete) {
      axios
        .delete(`${BASE_URL}/customers/deleteCus/${nic}`)
        .then((response) => {
          console.log('Account deleted successfully', response.data);
          alert('Account deleted successfully');
          localStorage.removeItem('loggedInUserNIC');
          navigate('/register');
        })
        .catch((error) => {
          console.error('Error deleting account', error);
          alert('Error deleting account');
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all fields are filled
      if (!customer.fname || !customer.lname || !customer.phone || !customer.email || !customer.no || !customer.street1 || !customer.street2 || !customer.city || !customer.imageUrl) {
        console.error('Please fill all fields');
        return;
      }

      // Update customer data
      await axios.put(`${BASE_URL}/customers/updateCus/${nic}`, customer);
      console.log('Customer updated successfully');
      alert('Customer updated successfully');

      // Navigate to another page after submission
      navigate(`/getUser/${nic}`); // Redirect to the user profile page
    } catch (error) {
      console.log('Error updating customer:', error);
      alert('Error updating customer:', error);
    }
  };

  return (
    <div className="main">
    <div className="left">
      <div className="video">
        <video src={editvideo} autoPlay loop muted>
          Your browser does not support the video tag.
        </video>
      </div>
     <div className="photo">
     <img
  src={edit}
  alt="edit"
  className="edit"></img>
     </div>

    </div>




<div className="right">
      <h2>Edit Profile</h2>
      <div className="container1">
      <form onSubmit={handleSubmit}>

      <div className="main-user-info">  
      <div className="user-input-box-dhanu">
  
          <label htmlFor="fname">First Name:</label>
          <input type="text" id="fname" name="fname" value={customer.fname} onChange={handleChange} required />
       </div>

<div className="user-input-box-dhanu"> 
<label htmlFor="lname">Last Name:</label>
          <input type="text" id="lname" name="lname" value={customer.lname} onChange={handleChange} required />
</div>


        <div className="user-input-box-dhanu"> 

<label for="telephone">Telephone </label>
          <input type="tel" id="phone" name="phone" value={customer.phone} onChange={handleChange} required />
        </div>


        <div className="user-input-box-dhanu"> 
<label for="email">Email</label>
          <input type="email" id="email" name="email" value={customer.email} onChange={handleChange} required />
        </div>


        <div className="user-input-box-dhanu"> 
<label for="no">Address No</label>
          <input type="text" id="no" name="no" value={customer.no} onChange={handleChange} required />
        </div>


        <div className="user-input-box-dhanu"> 
<label for="street 1">Street 1</label>
          <input type="text" id="street1" name="street1" value={customer.street1} onChange={handleChange} required />
        </div>

        
        <div className="user-input-box-dhanu"> 
          <label htmlFor="street2">Street 2:</label>
          <input type="text" id="street2" name="street2" value={customer.street2} onChange={handleChange} required />
        </div>


        <div className="user-input-box-dhanu"> 
          <label htmlFor="city">City:</label>
          <select id="city" name="city" value={customer.city} onChange={handleChange} required>
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
          <label>
            Upload Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label></div>
        </div>
        <div className="savebtn">
        <button type="submit">Save Changes</button></div>
      </form></div><br></br>
      <div className="btndelete">
      <button onClick={handleDeleteAccount}>Delete Account <DeleteIcon/></button></div>
    </div>

   
    </div>
  );
};

export default EditProfile;
