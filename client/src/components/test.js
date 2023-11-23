import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import UpdatePropertyForm from "../pages/UpdateProperty";

const PropertyCard = ({ property }) => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleEdit = (id) => {
    navigate(`/update-property/${id}`);
    //console.log("edit property id: ", id);
  };

  const userId = user ? user._id : "";
  const authToken = user?.token || null;

  const handleDelete = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const response = await fetch(
        `http://localhost:5000/api/delete-property/${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(`Property ${id} deleted successfully`);
        setProperties(properties.filter((prop) => prop._id !== id));
      } else {
        console.error("Error deleting property:", data.message);
      }
    } catch (error) {
      console.error("catched Error deleting property:", error);
    }
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
