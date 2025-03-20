import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_URL } from '../../config';
function CustomerSearch() {
    const [nic, setNic] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/customers/searchByNIC/${nic}`);
            const customer = response.data.customer;
            if (customer) {
                // Navigate to ViewCus with searchedCustomer as state
                navigate(`/searchByNIC/${nic}`, { state: { searchedCustomer: customer } });
            } else {
                setError('Customer not found');
            }
        } catch (error) {
            console.error('Error searching for customer:', error);
            setError('Error searching for customer');
        }
    };

    return (
<div style={{ display: 'flex', alignItems: 'center', maxWidth: '300px', margin: '0 auto', marginBottom: '20px', borderRadius: '13px', overflow: 'hidden', backgroundColor: '#f0f0f0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
    <input
        type="text"
        value={nic}
        onChange={(e) => setNic(e.target.value)}
        placeholder="Enter NIC"
        style={{ flex: '1', border: '1px solid black', outline: 'none', padding: '10px', borderRadius: '13px 0 0 13px', height: '38px' }}
    />
    <button onClick={handleSearch} style={{ border: 'none', backgroundColor: '#fbc02d', color: '#fff', padding: '10px 20px', borderRadius: '0 13px 13px 0', cursor: 'pointer', height: '38px' }}><SearchIcon /></button>
</div>

    
    );
}

export default CustomerSearch;
