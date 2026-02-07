import { Card, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import {menu_list} from '../../assets/assets'
function ExploreMenue() {
  return (
    <Grid container spacing={2} sx={{ marginTop: "50px",}}>
      <Grid size={{ xs: 12 }} sx={{display:'flex', flexDirection:'column', mx:'auto', gap:2, }}>
        <Typography variant="h2" sx={{ml:'5%', textAlign:'left'}}>Explore our menu</Typography>
        <Typography  sx={{ml:'5%', textAlign:'left'}}>
          Discover a variety of delicious dishes crafted to satisfy every
          palate.
        </Typography>
      </Grid>
      <Grid>
        {menu_list.map((item) =>(
    <Card
sx={{
              borderRadius: "50%",
              width: 150,
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden", 
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}      >
         <CardMedia
          component="img"
              image={item.menu_image}
              alt={item.menu_name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover", 
                gap: 2,
              }}
        />
    </Card>
))}
      </Grid>
    </Grid>
  );
}

export default ExploreMenue;
