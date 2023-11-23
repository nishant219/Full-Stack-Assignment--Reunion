import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DeleteCard = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 300 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete this property?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirm}
            style={{ marginRight: "8px" }}
          >
            Confirm
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default DeleteCard;
