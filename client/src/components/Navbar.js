import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </RouterLink>
        </Typography>
        <ul style={{ listStyleType: 'none', display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <li style={{ margin: '0 10px' }}>
                <RouterLink to="/property-listing" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Property Listing
                </RouterLink>
              </li>
              <li style={{ margin: '0 10px' }}>
                <RouterLink to="/create-property" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Create Property
                </RouterLink>
              </li>
              <li>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li style={{ margin: '0 10px' }}>
                <RouterLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Login
                </RouterLink>
              </li>
              <li style={{ margin: '0 10px' }}>
                <RouterLink to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Register
                </RouterLink>
              </li>
            </>
          )}
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
