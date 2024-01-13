import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PropertyCard = ({ property, onUpdate, onDelete }) => {
  return (
    <Card style={{ width: "300px", margin: "16px", backgroundColor: "#f5f5f5" }} elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {property.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Price:</b> {property.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Address:</b> {property.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Type:</b> {property.typeOfProperty}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.isAvailable ? "Available" : "Not Available"}
        </Typography>

        {/* Update and Delete Buttons */}
        {property.isOwner && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={onUpdate}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
