import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CardContent, IconButton, Button } from '@mui/material';
import { Remove } from '@mui/icons-material';
import { BASE_URL } from '../../config';
function DisplayCart() {
    const { nic, cartItemId } = useParams();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/addCart/cartItems/${nic}/${cartItemId}`);
                console.log('Cart items:', response.data.data); // Log the response to check the data
                setCartItems(response.data.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Error fetching cart items');
            } finally {
                setLoading(false);
            }
        };

        const fetchTotalPrice = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/addCart/totalPrice/${nic}/${cartItemId}`);
                setTotalPrice(response.data.total_price);
            } catch (error) {
                console.error('Error fetching total price:', error);
                setError('Error fetching total price');
            }
        };

        fetchCartItems();
        fetchTotalPrice();
    }, [nic, cartItemId]);

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');

            if (!loggedInUserNIC || !cartItemId) {
                throw new Error('Invalid parameters');
            }

            await axios.delete(`${BASE_URL}/addCart/cartItems/${loggedInUserNIC}/${cartItemId}`);
            navigate(`/payment/${loggedInUserNIC}/${cartItemId}`); // Corrected the template literal syntax
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlepayment = () => {
        const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
        navigate(`/payment/${loggedInUserNIC}/${cartItemId}`);
    };

    const handleRemoveItem = async (foodId) => {
        try {
            setLoading(true);
            const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');

            if (!loggedInUserNIC || !foodId) {
                throw new Error('Invalid parameters');
            }

            await axios.delete(`${BASE_URL}/addCart/removeItem/${loggedInUserNIC}/${foodId}`);

            // Update the cart items after removing an item
            const updatedCartItems = cartItems.filter(item => item.foodId._id !== foodId);
            setCartItems(updatedCartItems);

            // Recalculate the total price
            const response = await axios.get(`${BASE_URL}/addCart/totalPrice/${nic}/${cartItemId}`);
            setTotalPrice(response.data.total_price);

        } catch (error) {
            console.error('Error removing item:', error);
            setError('Error removing item');
        } finally {
            setLoading(false);
        }
    };

    const handleAddfoods = () => {
        navigate("/fetch");
    };

    return (
        <Box sx={{ p: 2 }}>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box>
                    <Typography
                        sx={{
                            fontSize: '70px',
                            fontFamily: '"Roboto Slab", cursive',
                            color: 'Black',
                            marginInline: '25%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        Cart Items
                    </Typography>
                    <hr />
                    <Box>
                        {cartItems.map((item) => (
                            <Card key={item.foodId._id} sx={{ display: 'flex', mb: 0.1 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 160, height: 100 }}
                                    image={item.foodId.imageUrl || '/path/to/placeholder-image.jpg'}
                                    alt={item.foodId.foodname}
                                    onError={(e) => {
                                        e.target.src = '/path/to/placeholder-image.jpg'; // Fallback image
                                        console.error('Error loading image:', e);
                                    }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        <Typography component="div" variant="h5">
                                            {item.foodId.foodname}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Quantity: {item.quantity}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Price: {item.foodId.price} LKR
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            Total Price: {(item.foodId.price * item.quantity).toFixed(2)} LKR
                                        </Typography>
                                        <IconButton onClick={() => handleRemoveItem(item.foodId._id)} color="error">
                                            <Remove />
                                        </IconButton>
                                    </CardContent>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                    {totalPrice !== null && (
                        <Typography variant="h5" gutterBottom>Total Price: {totalPrice.toFixed(2)} LKR</Typography>
                    )}
                    <Button onClick={handleAddfoods} style={{ marginTop: '20px', marginRight: '10px', backgroundColor: 'Blue', color: 'white', marginLeft: '10px' }}>ADD More FOODS</Button>
                   
                    <Button onClick={handlepayment} style={{ marginTop: '20px', marginRight: '10px', backgroundColor: 'green', color: 'white', marginLeft: '10px' }}>Confirm Order</Button>
                </Box>
            )}
        </Box>
    );
}

export default DisplayCart;
