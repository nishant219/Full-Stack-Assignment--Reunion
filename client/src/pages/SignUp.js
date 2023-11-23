import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function SignUp() {
  const navigate = useNavigate(); // Add this line to use the navigate function
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get('name');
      const email = formData.get('email');
      const password = formData.get('password');

      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccess('Registration successful!'); 
        // Redirect to the login page after successful registration
        navigate('/login'); 
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed'); 
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography variant="body2" color="success" align="center" sx={{ mt: 1 }}>
              {success}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
