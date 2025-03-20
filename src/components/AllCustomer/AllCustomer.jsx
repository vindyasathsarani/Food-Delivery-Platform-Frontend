import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchCus from '../SearchBar/SearchCus';
import AdminHeader from '../Header/AdminHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Footer from '../footer/footer';
import { BASE_URL } from '../../config';
function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get(`${BASE_URL}/customers/fetchc`);
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AdminHeader />
      <h2>All Customers</h2>
      <SearchCus />
      <TableContainer component={Paper}>
        <Table>
        <TableHead style={{ backgroundColor: 'lightblue', fontWeight: 'bold', fontSize: 'small' }}>

            <TableRow>
              <TableCell >First Name</TableCell>
              <TableCell >Last Name</TableCell>
              <TableCell>NIC</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer._id} >
                <TableCell >{customer.fname}</TableCell>
                <TableCell>{customer.lname}</TableCell>
                <TableCell>{customer.nic}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{`${customer.no}, ${customer.street1}, ${customer.street2 ? customer.street2 + ',' : ''} ${customer.city}`}</TableCell>
                <img src={customer.imageUrl} alt="Customer" style={{ width: 'auto', height: '100px', maxWidth: '200px' ,paddingTop:'8px'}} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer><Footer />
    </div>
  );
}

export default AllCustomers;

