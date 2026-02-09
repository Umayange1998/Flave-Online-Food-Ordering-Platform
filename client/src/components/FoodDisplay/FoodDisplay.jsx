import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Grid, Typography } from "@mui/material";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);
  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: { xs: "10px", sm: "30px", md: "50px" }, mb: "50px" }}
    >
      <Grid size={12}>
        <Typography
          variant="h2"
          sx={{
            ml: "5%",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Top dishes near you
        </Typography>
      </Grid>
      <Grid size={12}>
        <Grid
          container
          spacing={3}
        //   justifyContent="space-between"
            sx={{ mt: "10px", mx: "5%" }}
        >
          {food_list
            .filter((item) => category === "All" || item.category === category)
            .map((item) => (
              <Grid item xs={6} sm={3} md={3} lg={2.4} key={item._id}>
                <FoodItem
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FoodDisplay;
