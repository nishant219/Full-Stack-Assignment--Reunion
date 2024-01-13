import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button startIcon={<HomeIcon />} color="inherit">
              Home
            </Button>
          </RouterLink>
          {user && (
            <>
              <Button startIcon={<ListIcon />} color="inherit" onClick={() => navigate('/property-listing')}>
                Property Listing
              </Button>
              <Button startIcon={<AddIcon />} color="inherit" onClick={() => navigate('/create-property')}>
                Create Property
              </Button>
            </>
          )}
        </Typography>
        <div>
          {user && (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => { navigate('/property-listing'); handleMenuClose(); }}>
                  Property Listing
                </MenuItem>
                <MenuItem onClick={() => { navigate('/create-property'); handleMenuClose(); }}>
                  Create Property
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
              <Button startIcon={<ExitToAppIcon />} color="inherit" onClick={handleLogout} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' } }}>
                Logout
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit" onClick={() => { navigate('/login'); }}>
                Login
              </Button>
              <Button color="inherit" onClick={() => { navigate('/register'); }}>
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
