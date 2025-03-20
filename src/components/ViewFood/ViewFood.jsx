import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ViewFood.css'
import PlaceIcon from '@mui/icons-material/Place';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import add2 from "./add2.jpeg";
import Foot from '../footer/footer';
import { BASE_URL } from '../../config';
function ViewFood() {
    const navigate = useNavigate(); // Initialize navigate
    const { id } = useParams(); // Get the ID parameter from the URL
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFood() {
            try {
                const response = await axios.get(`${BASE_URL}/food/fetch/${id}`);
                setFood(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching food:', error);
                setLoading(false);
            }
        }
        fetchFood();
    }, [id]); // Include id in the dependency array to re-fetch data when the ID changes
    
    const viewAllDeals = () => {
        navigate(`/fetch`); // Navigate to the desired route
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!food) {
        return <div>Food not found</div>;
    }
  
    return (
        <div>
        <div className="View">
            <div className="Vleft">
                <img    
                    src={food.imageUrl}
                    alt={food.foodname}
                    className="food-image"
                    onError={(e) => console.error('Error loading image:', e)}
                />
            </div>

            <div className="Vcenter">
                <h1 className="fName">{food.foodname}</h1>
                <br />
                <hr />
                
                <p className="price">Price: {food.price}</p>
                <p className="Des"> {food.description}</p>
                <hr />
                <div className="place-container">
                    <PlaceIcon className="place-icon" />
                    <p className="Address">30 King Street, Kurunagala, Sri Lanka</p>
                </div>


                <button  onClick={viewAllDeals} className="fbttn">View All Deals <KeyboardArrowRightIcon /></button> {/* Corrected function name */}
            </div>

            <div className="Vright">
  <img
    src={add2}
    alt="add2"
    className="add2"
    style={{ width: '600px', height: 'auto', paddingTop: '10px' }}
  />
</div>

</div><Foot /></div>
    );
}

export default ViewFood;
