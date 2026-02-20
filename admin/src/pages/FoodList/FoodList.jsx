import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function FoodList() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [foodList, setFoodList] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${baseURL}/food`);
      setFoodList(response.data);
      console.log("Food list fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Failed to fetch food list. Please try again later.");
    }
  };
  const handleDelete = (food) => {
    setSelectedFood(food);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedFood) return;

    try {
      await axios.delete(`${baseURL}/food/${selectedFood._id}`);

      setFoodList((prev) =>
        prev.filter((food) => food._id !== selectedFood._id),
      );

      toast.success("Food deleted successfully");

      setDeleteModalOpen(false);
      setSelectedFood(null);
    } catch (error) {
      toast.error("Failed to delete food");
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "100vh",
        mt: "30px",
        ml: { sm: "18%" },
        mr: { sm: "2%" },
      }}
    >
      <Grid size={12}>
        <Paper>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {/* Desktop Image Column */}
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Image
                  </TableCell>

                  {/* Desktop Name Column */}
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    Name
                  </TableCell>

                  {/* Mobile Food Column */}
                  <TableCell sx={{ display: { xs: "table-cell", sm: "none" } }}>
                    Food
                  </TableCell>

                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {foodList.map((item) => (
                  <TableRow key={item._id}>
                    {/* Desktop Image */}
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      <img
                        src={`http://localhost:3001/uploads/${item.image}`}
                        alt={item.name}
                        style={{
                          width: 70,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    </TableCell>

                    {/* Desktop Name */}
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.name}
                    </TableCell>

                    {/* Mobile Food Column */}
                    <TableCell
                      sx={{ display: { xs: "table-cell", sm: "none" } }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <img
                          src={`http://localhost:3001/uploads/${item.image}`}
                          alt={item.name}
                          style={{
                            width: 80,
                            height: 70,
                            objectFit: "cover",
                            borderRadius: 6,
                            marginBottom: 6,
                          }}
                        />
                        <Typography fontSize="0.9rem" fontWeight="bold">
                          {item.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                        <Chip 
                        sx={{bgcolor:"primary.main", color:"white"}} label={item.category} />
                      
                    </TableCell>
                    <TableCell>$ {item.price}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        //   onClick={() => handleEdit(item._id)}
                      >
                        <DriveFileRenameOutlineIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        foodItem={selectedFood}
      />
    </Grid>
  );
}

export default FoodList;
