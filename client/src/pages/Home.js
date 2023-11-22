import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import PropertyListing from './PropertyListing';

const Home = () => {
  return (
    <Container>
      {/* <Typography variant="h4" component="div" gutterBottom>
        Welcome to the Home Page
      </Typography> */}
      <PropertyListing />
    </Container>
  );
};

export default Home;
