import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PropertyCard = ({ property }) => {
  return (
    <Card style={{ width: '300px', margin: '16px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {property.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {property.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {property.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {property.typeOfProperty}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.isAvailable ? 'Available' : 'Not Available'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
