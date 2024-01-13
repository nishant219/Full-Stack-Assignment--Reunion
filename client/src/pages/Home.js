import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box
      style={{
        backgroundImage: `url("https://cdn.pixabay.com/photo/2015/05/15/12/53/lawn-768316_1280.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <Container>
        
        <Typography variant="h3" gutterBottom color={"gray"} >
          Discover Most Suitable Property
        </Typography>
        <Typography variant="body1" color={"Black"} style={{ marginBottom: "20px" }}>
          Find a variety of properties that suit you very easily. Forget all difficulties in finding a residence for you.
        </Typography>

        
      </Container>
    </Box>
  );
};

export default Home;
