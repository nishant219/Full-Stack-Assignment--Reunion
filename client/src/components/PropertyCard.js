import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const PropertyCard = ({ property }) => {
  const handleEdit = (id) => {
    console.log("edit property id: ", id);
  };

  const handleDelete = (id) => {
    console.log("delete property id: ", id);
  };
  return (
    <Card style={{ width: "300px", margin: "16px" }}>
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
          {property.isAvailable ? "Available" : "Not Available"}
        </Typography>
        {/* //add two buttons if prop contain owner id */}
        {property.isOwner && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(property._id)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(property._id)}
            >
              Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
