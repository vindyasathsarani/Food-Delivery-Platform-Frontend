import React from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import Footer from '../footer/footer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ViewCus() {
    const { searchedCustomer } = useLocation().state;

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            <Typography variant="h2" gutterBottom>
                Customer Details
            </Typography>
            {searchedCustomer ? (
                <Box>
                    {searchedCustomer.imageUrl && (
                        <Box sx={{ marginBottom: '20px' }}>
                            <img src={searchedCustomer.imageUrl} alt="Customer Profile" style={{ maxWidth: '200px' }} />
                        </Box>
                    )}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                               
                             
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{searchedCustomer.fname} {searchedCustomer.lname}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>NIC</TableCell>
                                    <TableCell>{searchedCustomer.nic}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>{searchedCustomer.phone}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>{searchedCustomer.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>{searchedCustomer.no}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Street 1</TableCell>
                                    <TableCell>{searchedCustomer.street1}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Street 2</TableCell>
                                    <TableCell>{searchedCustomer.street2}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>City</TableCell>
                                    <TableCell>{searchedCustomer.city}</TableCell>
                                </TableRow>
                                {/* Add more details if needed */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <Typography variant="body1">No customer found</Typography>
            )}
            <Footer />
        </Box>
    );
}

export default ViewCus;
