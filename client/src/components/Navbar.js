import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
        </Typography>
        <ul style={{ listStyleType: 'none', display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <li style={{ margin: '0 10px' }}>
                <Link to="/property-listing" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Property Listing
                </Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to="/create-property" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Create Property
                </Link>
              </li>
              <li>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li style={{ margin: '0 10px' }}>
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Login
                </Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
