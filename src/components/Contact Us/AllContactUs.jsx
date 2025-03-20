import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllContactUs.css';
import Header from '../Header/AdminHeader';
import { BASE_URL } from '../../config';
function AllContactUs() {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contactUs/all`);
        setContactDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching contact details');
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  return (
    <div className="all-contact-us-container">
        <Header />
      <h1 className="title">All Contact Us Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {contactDetails.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllContactUs;
