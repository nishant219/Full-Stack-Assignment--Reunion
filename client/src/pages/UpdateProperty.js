// UpdatePropertyForm.js
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UpdatePropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [property, setProperty] = useState({
    name: '',
    description: '',
    price: '',
    address: '',
    typeOfProperty: '',
    isAvailable: true,
  });

  useEffect(() => {
    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/property/${id}`);
      const data = await response.json();
      setProperty(data.data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const userId = user ? user._id : '';
  const authToken = userId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = id ? `http://localhost:5000/api/property/${id}` : '';
      const method = id ? 'PUT' : '';

      const headers = {
        'Content-Type': 'application/json',
      };

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(property),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/property-listing');
      } else {
        console.error('Error updating property:', data.message);
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom style={{ marginBottom: '20px', color: '#3f51b5' }}>
        Edit Property
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={property.name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          value={property.description}
          onChange={handleChange}
          required
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          name="price"
          type="number"
          value={property.price}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          name="address"
          value={property.address}
          onChange={handleChange}
          required
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Type of Property</InputLabel>
          <Select
            label="Type of Property"
            name="typeOfProperty"
            value={property.typeOfProperty}
            onChange={handleChange}
            required
          >
            <MenuItem value="house">House</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
            <MenuItem value="townhouse">Townhouse</MenuItem>
            <MenuItem value="land">Land</MenuItem>
            <MenuItem value="commercial">Commercial</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <div style={{ marginTop: '16px', marginBottom: '16px' }}>
          <label style={{ marginRight: '8px' }}>Availability:</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={property.isAvailable}
            onChange={() => setProperty({ ...property, isAvailable: !property.isAvailable })}
          />
        </div>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', alignSelf: 'flex-start' }}>
          Update Property
        </Button>
      </form>
    </Container>
  );
};

export default UpdatePropertyForm;
