import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';
import Footer from '../footer/footer';
import { BASE_URL } from '../../config';

function EditAllFood() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${BASE_URL}/food/fetch`); // Adjust the route to match your backend
                setFoods(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching foods:', error);
                setError(error); // Set error state if there's an error
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Render error message if there's an error
    }

    const handleView = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="all-foods-container">
            <AdminHeader />
            <h2>All Foods</h2>
            <ul className="food-list">
                {foods.map((food) => (
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
                            <div className="foodname">{food.foodname}</div>
                            <div className="food-price">Price: {food.price}</div>
                            <div className="food-description">Description: {food.description}</div>
                        </div>
                        <button onClick={() => handleView(food._id)}>Edit</button>
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}

export default EditAllFood;
