import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, foodItem }) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        <Box display="flex" justifyContent="center">
          <Avatar
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.error.main, 0.15), // 15% opacity
              width: 56,
              height: 56,
            })}
          >
            <WarningAmberIcon sx={{ color: "error.main", fontSize: 30 }} />
          </Avatar>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Confirm Deletion
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Are you sure you want to delete <strong>"{foodItem?.name}"</strong>?
          This action cannot be undone and will permanently remove this item
          from the inventory.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Button onClick={onConfirm} variant="contained" color="error" fullWidth>
          Delete Product
        </Button>

        <Button onClick={onClose} variant="outlined" fullWidth>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationModal;
