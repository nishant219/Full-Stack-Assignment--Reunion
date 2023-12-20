// PropertyListing.js
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PropertyCard from "../components/PropertyCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import UpdateProperty from "./UpdateProperty";

import { useAuth } from "../context/AuthContext";

const PropertyListing = () => {
  const { user } = useAuth();
  const authToken = user?.token || null;
  const [update, setUpdate] = useState(false);
  const [updateProperty, setUpdateProperty] = useState(null); 
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "https://backend-reunion.vercel.app/api/list-properties",
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
        `https://backend-reunion.vercel.app/api/search-properties?searchTerm=${searchTerm}&sort=${sort}`,
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


  const handleUpdate = (property) => {
    setUpdate(true);
    setUpdateProperty(property);
  };
  

  const handleDelete = async (propertyId) => {
    try {
      const response = await fetch(
        `https://backend-reunion.vercel.app/api/delete-property/${propertyId}`,
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
    <>
      {update ? (
        <UpdateProperty
          property={updateProperty}
          onCancelUpdate={() => {
            setUpdate(false);
            setUpdateProperty(null);
          }}
        />
      ) : (
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
                onUpdate={() => handleUpdate(property)}
                onDelete={() => handleDelete(property._id)}
              />
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default PropertyListing;
