import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Payment() {
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCVC] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { nic, cartItemId } = useParams();
  const navigate = useNavigate();

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    console.log('NIC:', nic); // Debugging statement
    console.log('Cart Item ID:', cartItemId); // Debugging statement

    if (nic && cartItemId) {
      const fetchTotalPrice = async () => {
        try {
          const response = await axios.get(`http://localhost:8070/addCart/totalPrice/${nic}/${cartItemId}`);
          setTotalPrice(response.data.total_price);
        } catch (error) {
          console.error('Error fetching total price:', error);
          setError('Error fetching total price');
        }
      };

      fetchTotalPrice();
    } else {
      setError('Invalid NIC or Cart Item ID');
    }
  }, [nic, cartItemId]);

  const handlePlaceOrder = async () => {
    if (!cardholderName || !cardNumber || !day || !year || !cvc) {
      setSnackbarMessage('All fields are required!');
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');

      if (!loggedInUserNIC || !cartItemId) {
        throw new Error('Invalid parameters');
      }

      await axios.delete(`http://localhost:8070/addCart/cartItems/${loggedInUserNIC}/${cartItemId}`);
      setSnackbarMessage('Order placed successfully!');
      setSnackbarOpen(true);
      navigate('/map'); // Navigate after deletion is successful
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography style={{ textAlign: 'left', marginTop: '20px', marginRight: '20px', marginLeft: '50px', fontSize: '45px', color: 'blue' }}>
        Payment
      </Typography>
      <hr />
      <div style={{ display: 'flex', height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '20px',
            width: '50%',
            height: '100vh',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Credit Card Box */}
          <Box
            sx={{
              marginTop: '-450px',
              display: 'flex',
              backgroundColor: 'blue',
              width: '90%',
              height: '10vh',
              borderRadius: '10px',
            }}
          >
            <Typography style={{ fontSize: '20px', color: 'white', marginTop: '20px', marginLeft: '10px' }}>
              Credit Card
            </Typography>
            <Box
              sx={{
                backgroundColor: 'white',
                width: '40%',
                height: '7vh',
                marginTop: '10px',
                marginLeft: 'auto',
                marginRight: '10px',
              }}
            >
              <div style={{ display: 'flex' }}>
                <img src='/visa2.png' style={{ height: '50px', width: '50px', marginTop: '4px', marginRight: '10px', marginLeft: '40px' }} />
                <img src='/master.png' style={{ height: '50px', width: '50px', marginTop: '4px' }} />
                <img src='/card.png' style={{ height: '50px', width: '50px', marginTop: '4px', marginLeft: '10px' }} />
              </div>
            </Box>
          </Box>

          {/* Debit Card Box */}
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: '10px',
              width: '90%',
              height: '10vh',
            }}
          >
            <Typography style={{ fontSize: '20px', color: 'blue', marginTop: '20px', marginLeft: '10px' }}>
              PayPal
            </Typography>
            <img src='/paypal.jpg' style={{ height: '60px', width: '80px', marginRight: '10px', marginLeft: '250px' }} />
            <Box
              sx={{
                backgroundColor: 'white',
                width: '40%',
                height: '7vh',
                marginTop: '10px',
                marginLeft: 'auto',
                marginRight: '10px',
              }}
            />
          </Box>

          {/* Pay Later Box */}
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'White',
              width: '90%',
              height: '10vh',
              border: '2px solid black',
              borderRadius: '10px',
            }}
          >
            <Typography style={{ fontSize: '20px', color: 'Blue', marginTop: '20px', marginLeft: '10px' }}>
              Pay later
            </Typography>
            <Box
              sx={{
                backgroundColor: 'white',
                width: '40%',
                height: '7vh',
                marginTop: '10px',
                marginLeft: 'auto',
                marginRight: '10px',
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: '20px',
            width: '50%',
            height: '100vh',
          }}
        >
          <Typography style={{ marginTop: '-250px', marginLeft: '-310px', fontSize: '25px' }}>
            Amount being paid now: {totalPrice !== null ? totalPrice.toFixed(2) : 'Loading...'} LKR
          </Typography>

          <div style={{ display: 'flex' }}>
            <img src='/visa2.png' style={{ height: '80px', width: '80px', marginTop: '4px', marginRight: '10px', marginLeft: '-360px' }} />
            <img src='/master.png' style={{ height: '80px', width: '80px', marginTop: '4px' }} />
            <img src='/card.png' style={{ height: '80px', width: '80px', marginTop: '4px', marginLeft: '10px' }} />
          </div>

          <Typography style={{ marginLeft: '-530px', fontSize: '25px', marginTop: '10px' }}>
            Cardholder's name
          </Typography>
          <TextField
            label="Cardholder's name"
            variant="outlined"
            size="small"
            fullWidth
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            style={{ marginLeft: '-39px', marginTop: '10px' }}
          />

          <Typography style={{ marginLeft: '-590px', fontSize: '25px', marginTop: '10px' }}>
            Card number
          </Typography>
          <TextField
            label="Card number"
            variant="outlined"
            size="small"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{ marginLeft: '-35px', marginTop: '10px' }}
          />

          <Typography style={{ marginLeft: '-610px', fontSize: '25px', marginTop: '10px' }}>
            Expiry date
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginLeft: '-35px',
              marginTop: '10px',
            }}
          >
            <FormControl variant="outlined" size="small" style={{ width: '20%' }}>
              <InputLabel>Day</InputLabel>
              <Select
                value={day}
                onChange={handleDayChange}
                label="Day"
              >
                {[...Array(31).keys()].map((num) => (
                  <MenuItem key={num + 1} value={num + 1}>
                    {num + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" style={{ width: '28%' }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                onChange={handleYearChange}
                label="Year"
              >
                {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() + index).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="CVC"
              variant="outlined"
              size="small"
              fullWidth
              value={cvc}
              onChange={(e) => setCVC(e.target.value)}
              style={{ width: '20%', marginLeft: '15px' }}
            />
          </Box>
          <Button onClick={handlePlaceOrder} style={{ marginTop: '20px', marginRight: '10px', backgroundColor: 'green', color: 'white', marginLeft: '10px' }}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </Box>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={error ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
     
      <Footer />
    </div>
  );
}

export default Payment;
