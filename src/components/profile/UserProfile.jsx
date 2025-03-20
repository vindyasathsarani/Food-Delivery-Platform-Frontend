import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import profileBanner from './profileBanner.jpg'
import Typography from '@mui/material/Typography';
import Footer from '../footer/footer';
import { BASE_URL } from '../../config';

function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                if (!loggedInUserNIC) {
                    setLoading(false);
                    navigate('/loginCus');
                    return;
                }

                console.log("Fetching user details for NIC:", loggedInUserNIC);
                const response = await axios.get(`${BASE_URL}/customers/getUser/${loggedInUserNIC}`);
                console.log("User details response:", response.data);
                const { status, customer } = response.data;

                if (status === "Customer fetched") {
                    setUserDetails(customer);
                } else {
                    console.error(`Error: ${status}`);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setLoading(false);
            }
        }
        fetchUserProfile();
    }, [loggedInUserNIC, navigate]);

    useEffect(() => {
        if (!loggedInUserNIC) {
            setLoading(false);
            setUserDetails(null);
        }
    }, [loggedInUserNIC]);

    const handleEditProfile = () => {
        navigate(`/updateCus/${loggedInUserNIC}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUserNIC'); // Remove logged-in user NIC from local storage
        navigate('/loginCus'); // Navigate to the login page after logout
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userDetails) {
        return <div>User not found</div>;
    }

    return (
        <div>
        <div className="main">
            
           
     
        <div className="left">
            <h2>My Account</h2>
            <div className="user-details">
            
            <div className="user-details">
    {userDetails.imageUrl && (
        <div className="profile-image-dhanu">
            <img src={userDetails.imageUrl} alt="Profile" className="profile-image" />
        </div>
    )}
    <table className="user-data">
        <tbody>
            <tr className="tableRaw">
                <td className="Heading"><strong>First Name:</strong></td>
                <td className="data">{userDetails.fname}</td>
            </tr>
            <tr className="tableRaw2">
                <td className="Heading"><strong>Last Name:</strong></td>
                <td className="data">{userDetails.lname}</td>
            </tr>
            <tr className="tableRaw">
                <td className="Heading"><strong>NIC:</strong></td>
                <td className="data">{userDetails.nic}</td>
            </tr>
            <tr className="tableRaw2">
                <td className="Heading"><strong>Phone:</strong></td>
                <td className="data">{userDetails.phone}</td>
            </tr>
            <tr className="tableRaw">
                <td className="Heading"><strong>Email:</strong></td>
                <td className="data">{userDetails.email}</td>
            </tr>
            <tr className="tableRaw2">
                <td className="Heading"><strong>No:</strong></td>
                <td className="data">{userDetails.no}</td>
            </tr>
            <tr className="tableRaw">
                <td className="Heading"><strong>Street 1:</strong></td>
                <td className="data">{userDetails.street1}</td>
            </tr>
            <tr className="tableRaw2">
                <td className="Heading"><strong>Street 2:</strong></td>
                <td className="data">{userDetails.street2}</td>
            </tr>
            <tr className="tableRaw">
                <td className="Heading"><strong>City:</strong></td>
                <td className="data">{userDetails.city}</td>
            </tr>
        </tbody>
    </table>
</div><br></br>
<div className="buttonp">
                <div className="editbutton">
                    <button onClick={handleEditProfile}>Edit Profile <EditIcon /></button></div>
                    <div className="logoutbutton">
                    <button onClick={handleLogout}>Logout <LogoutIcon /></button> {/* Add logout button */}</div></div>
                
            </div>
        </div>
 

        <div className="right">


        <img
  src={profileBanner}
  alt="profileBanner"
  className="profileBanner"></img><br></br>
  <div className="paragraph">
<p>Welcome to your profile on Yam Yard! Here, you're in control of your food ordering experience. From exploring the diverse cuisines available in your area to managing your favorite restaurants and past orders, your profile is your gateway to culinary delights. Update your personal information, including delivery addresses and payment methods, to ensure a seamless ordering process every time. Keep track of your loyalty rewards and exclusive offers tailored just for you. Whether you're craving comfort food on a rainy day or seeking a gourmet feast for a special occasion, your profile is where the magic happens. Dive into a world of flavor, convenience, and satisfaction. Start exploring now!</p>
</div> </div>
</div>
<Footer />

        </div>
       
    );
}

export default UserProfile;
