import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography, Button, TextField } from '@mui/material';
import Footer from '../footer/footer';
import { BASE_URL } from '../../config';

function AddCart() {
    const { nic, foodId } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [cartItemId, setCartItemId] = useState(null);
    const [foodDetails, setFoodDetails] = useState({ foodname: '', imageUrl: '' });

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/Food/fetch/${foodId}`);
                setFoodDetails(response.data);
            } catch (error) {
                console.error('Error fetching food details:', error);
                setError('Error fetching food details');
            }
        };

        fetchFoodDetails();
    }, [foodId]);

    const handleAddToCart = async () => {
        try {
            setLoading(true);
            const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');

            if (!loggedInUserNIC || !nic || !foodId) {
                throw new Error('Invalid parameters');
            }

            const response = await axios.post(`${BASE_URL}/addCart/addItem/${loggedInUserNIC}/${foodId}`, {
                nic: loggedInUserNIC,
                foodId,
                quantity
            });

            setMessage(response.data.message);
            setCartItemId(response.data.cartItemId); // Capture cartItemId from response
            calculateTotalPrice(response.data.cartItemId); // Pass cartItemId to calculateTotalPrice function
            navigate(`/addCart/cartItems/${nic}/${response.data.cartItemId}`); // Navigate to cart items page
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalPrice = async (cartItemId) => {
        try {
            const response = await axios.get(`${BASE_URL}/addCart/totalPrice/${nic}/${cartItemId}`);
            setTotalPrice(response.data.total_price);
        } catch (error) {
            console.error('Error calculating total price:', error);
            setTotalPrice(null);
        }
    };


  

    const handleremove = async () => {
        try {
            setLoading(true);
            const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');

            if (!loggedInUserNIC || !foodId) {
                throw new Error('Invalid parameters');
            }

            const response = await axios.delete(`${BASE_URL}/addCart/removeItem/${loggedInUserNIC}/${foodId}`);
            setMessage(response.data.message);
            calculateTotalPrice(cartItemId);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewTotal = () => {
        navigate(`/totalPrice/${nic}/${cartItemId}`);
    };

 

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');

            if (!loggedInUserNIC || !foodId || !cartItemId) {
                throw new Error('Invalid parameters');
            }

            await axios.delete(`${BASE_URL}/addCart/cartItems/${loggedInUserNIC}/${cartItemId}`);
            navigate('/map'); // Navigate after deletion is successful
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
            
            <Grid item xs={12} sm={9}>
                    <Paper elevation={6}>
                        <img src="/./home.jpg" alt="Building" style={{ width: '100%',  }} />
                    </Paper>
                </Grid>
            <Grid container spacing={6}>
                <Grid item xs={9} sm={12}>
                    <Paper elevation={1} sx={{ padding: '10px' }}>
                        <Typography variant="h2">Add to Cart</Typography>
                       
                        <img src={foodDetails.imageUrl} alt={foodDetails.foodname} style={{ width: '200px', height: '200px',marginTop: '40px' }} />
                        <Typography  style={{ marginTop: '20px', fontSize: '20px' }} >{foodDetails.foodname}</Typography>
                        <div>
                            <TextField 
                                type="number" 
                                id="quantity" 
                                value={quantity} 
                                onChange={(e) => setQuantity(parseInt(e.target.value))} 
                                InputProps={{ inputProps: { min: 1 } }} 
                                disabled
                            />
                        </div>
                        <div style={{ marginTop: '40px' }} >
                        <Button 
                            onClick={handleAddToCart} 
                            disabled={loading} 
                            variant="contained" 
                            style={{
                                borderRadius: '20px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                textTransform: 'none'
                            }}
                        >
                            {loading ? 'Adding to Cart...' : '+ Add to Cart'}
                        </Button>
                        <Button 
                            onClick={handleremove} 
                            variant="contained" 
                            color="secondary"
                            style={{
                                borderRadius: '20px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                textTransform: 'none',
                                backgroundColor: 'red',
                                color: 'black',
                                marginLeft: '10px'
                            }}
                        >
                            Remove
                        </Button></div>
                        {message && <Typography variant="body1">{message}</Typography>}
                        {error && <Typography variant="body1" color="error">{error}</Typography>}
                        {totalPrice !== null && <Typography variant="h5">Total Price: ${totalPrice.toFixed(2)}</Typography>}

                       {/* <Button onClick={handleDisplayCart} disabled={!cartItemId} variant="contained">Display Cart Items</Button> */}
                    <br></br><br></br><br></br><br></br>
                    
                    </Paper>
                </Grid>
              
            </Grid>
     
        </Box>     <Footer /></div>
    );
}

export default AddCart;
