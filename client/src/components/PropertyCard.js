import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '300px',
    margin: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: theme.spacing(2),
    padding: theme => theme.spacing(2) 
  },
  propertyType: {
    // marginTop: theme.spacing(1),
    marginTop: theme => theme.spacing(1), 
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  availability: {
    // marginTop: theme.spacing(1),
    marginTop: theme => theme.spacing(1), 
    color: (props) => (props.isAvailable ? theme.palette.success.main : theme.palette.error.main),
  },
}));

const PropertyCard = ({ property }) => {
  const classes = useStyles({ isAvailable: property.isAvailable });

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
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
        <Typography variant="body2" className={classes.propertyType}>
          Type: {property.typeOfProperty}
        </Typography>
        <Typography variant="body2" className={classes.availability}>
          {property.isAvailable ? 'Available' : 'Not Available'}
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
