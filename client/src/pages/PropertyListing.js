import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PropertyCard from "../components/PropertyCard"; // Import your PropertyCard component
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useAuth } from "../context/AuthContext"; // Add this line

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [myProperties, setMyProperties] = useState([]); // Add this line
  const [otherProperties, setOtherProperties] = useState([]); // Add this line
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");

  const { user } = useAuth(); // Add this line
  console.log("user hu mai: ", user);

  useEffect(() => {
    // Fetch all properties when the component mounts
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/list-properties");
      const data = await response.json();
      //add filter to separate my properties from other properties

      data.data.forEach((property) => {
        if (property.owner === user.user._id) {
          property.isOwner = true;
        }
      });

      console.log(data.data);

      setProperties(data.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search-properties?searchTerm=${searchTerm}&sort=${sort}`
      );
      const data = await response.json();
      setProperties(data.data);
    } catch (error) {
      console.error("Error searching properties:", error);
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

      {/* Search and Sort Options */}
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
          {/* Add more sorting options as needed */}
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

      {/* Property Cards */}
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div> */}
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ marginBottom: "20px", color: "#3f51b5" }}
      >
        My Properties
      </Typography>

      {/* Property Cards */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      {/*       
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ marginBottom: "20px", color: "#3f51b5" }}
      >
        Other Properties
      </Typography>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {otherProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div> */}
    </Container>
  );
};

export default PropertyListing;
