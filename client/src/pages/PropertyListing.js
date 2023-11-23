// PropertyListing.js
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PropertyCard from "../components/PropertyCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useAuth } from "../context/AuthContext";

const PropertyListing = () => {
  const { user } = useAuth();
  const authToken = user?.token || null;
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/list-properties",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();

      data.data.forEach((property) => {
        if (property.owner === user.user._id) {
          property.isOwner = true;
        }
      });

      setProperties(data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search-properties?searchTerm=${searchTerm}&sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      setProperties(data.data);
    } catch (error) {
      console.error("Error searching properties:", error);
    }
  };

  const handleUpdate = async (propertyId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/update-property/${propertyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          // Add your updated property data here
          body: JSON.stringify({
            /* Updated property data */
          }),
        }
      );

      if (response.ok) {
        fetchProperties();
      } else {
        console.error("Error updating property:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete-property/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        fetchProperties();
      } else {
        console.error("Error deleting property:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
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
        Property Search / Listing Page
      </Typography>

      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="Search by name, description, type, address..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="price">Price</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginLeft: "10px" }}
        >
          Search & Sort Apply
        </Button>
      </div>

      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ marginBottom: "20px", color: "#3f51b5" }}
      >
        My Properties
      </Typography>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onUpdate={() => handleUpdate(property._id)}
            onDelete={() => handleDelete(property._id)}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertyListing;
