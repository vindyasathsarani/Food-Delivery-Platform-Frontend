import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AllFood.css";
import FoodSearch from '../SearchBar/FoodSearch';
import Footer from '../footer/footer';
import { Typography } from '@mui/material';
import { BASE_URL } from '../../config';

function AllFoods() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const loggedInUserNIC = localStorage.getItem('loggedInUserNIC'); // Retrieve the logged-in user's NIC from local storage

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${BASE_URL}/food/fetch`);
                
                // Log to check if we are receiving data correctly
                console.log("API Response:", response.data);
                console.log("Is Array:", Array.isArray(response.data));  // Check if data is an array
                
                // If response data is an array, set it to state
                if (Array.isArray(response.data)) {
                    setFoods(response.data);
                } else {
                    console.error("Response data is not an array", response.data);
                    setFoods([]);  // Fallback if data is not an array
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching foods:', error);
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleAddToCart = (foodId) => {
        if (loggedInUserNIC) {
            // User is logged in, navigate to add to cart page
            navigate(`/addItem/${loggedInUserNIC}/${foodId}`);
        } else {
            // User is not logged in, navigate to login page
            navigate('/loginCus');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="all-foods-container">
            <br />
            <div className="search">
                <FoodSearch />
            </div>
            <Typography
                sx={{
                    fontSize: '40px',
                    fontFamily: '"sans-serif',
                    color: 'Black',
                    marginInline: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                All Foods
            </Typography>
            <ul className="food-list">
                {Array.isArray(foods) && foods.length > 0 ? (
                    foods.map((food) => (
                        <li key={food._id} className="food-item">
                            {food.imageUrl && (
                                <img
                                    src={food.imageUrl}
                                    alt={food.foodname}
                                    className="food-image"
                                    onError={(e) => console.error('Error loading image:', e)}
                                />
                            )}
                            <div className="food-details">
                                <img
                                    src='./rate.png'
                                    alt='rating'
                                    className="st"
                                    style={{ height: '65px', width: '65px', marginTop: '1px', marginBottom: '1px' }}
                                />
                                <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '-20px' }}>
                                    {food.foodname}
                                </div>
                                <div className="food-price">Price: {food.price} LKR</div>
                                <div className="food-description">{food.description}</div>
                            </div>
                            <button onClick={() => handleAddToCart(food._id)} className="btnAdd">
                                Add Cart
                            </button>
                        </li>
                    ))
                ) : (
                    <div>No foods available</div>
                )}
            </ul>
            <Footer />
        </div>
    );
}

export default AllFoods;
