// UpdateProperty.js
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UpdateProperty = ({ property, onCancelUpdate }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [updatedProperty, setUpdatedProperty] = useState({
    name: property.name,
    description: property.description,
    price: property.price,
    address: property.address,
    owner: property.owner,
    isAvailable: property.isAvailable,
    typeOfProperty: property.typeOfProperty,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const userId = user ? user._id : "";
  const authToken = user?.token || null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://backend-reunion.vercel.app/api/property/${property._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
          },
          body: JSON.stringify(updatedProperty),
        }
      );

      if (response.ok) {
        const responseData = await response.json(); 
        setUpdatedProperty(responseData); 
        console.log("Property updated successfully!");
        onCancelUpdate(); 
      } else {
        console.error("Error updating property:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ marginBottom: "20px", color: "#3f51b5" }}
      >
        Update Property
      </Typography>

      <form>
        <TextField
          label="Name"
          name="name"
          value={updatedProperty.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={updatedProperty.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={updatedProperty.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={updatedProperty.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type of Property"
          name="typeOfProperty"
          value={updatedProperty.typeOfProperty}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Availability"
          name="isAvailable"
          value={updatedProperty.isAvailable}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          style={{ marginTop: "20px" }}
        >
          Update Property
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancelUpdate}
          style={{ marginLeft: "10px", marginTop: "20px" }}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default UpdateProperty;
