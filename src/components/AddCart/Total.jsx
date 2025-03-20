import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
function Total() {
    const { nic, cartItemId } = useParams();
    const [totalPrice, setTotalPrice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalPrice = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/addCart/totalPrice/${nic}/66a9e0fb1eb0067ae6be79c5`);
                setTotalPrice(response.data.total_price);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching total price:', error);
                setLoading(false);
            }
        };

        fetchTotalPrice();
    }, [nic, cartItemId]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <p>Total Price: ${totalPrice}</p>
            )}
        </div>
    );
}

export default Total;