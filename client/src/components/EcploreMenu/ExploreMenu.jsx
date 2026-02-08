import { Box, Card, CardMedia, Divider, Grid, Typography } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { menu_list } from "../../assets/assets";
function ExploreMenu({ category, setCategory }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const scroll = (direction) => {
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "auto",
      });
    }
  }, []);
  return (
    <Grid container spacing={2} sx={{ marginTop: "50px", mb: "50px" }}>
      <Grid
        size={12}
        sx={{ display: "flex", flexDirection: "column", mx: 2, gap: 2 }}
      >
        <Typography
          variant="h2"
          sx={{
            ml: "5%",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Explore our menu
        </Typography>
        <Typography
          sx={{
            ml: "5%",
            textAlign: "left",
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
          }}
        >
          Discover a variety of delicious dishes crafted to satisfy every
          palate.
        </Typography>
      </Grid>
      <Grid size={12}>
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: "80%" },
            mx: "auto",
          }}
        >
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "#fff",
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={() => scroll("right")}
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "#fff",
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          <Grid
            ref={scrollRef}
            item
            xs={12}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            sx={{
              display: "flex",
              overflowX: "scroll",
              justifyContent: "space-between",
              alignItems: "center",
              mx: 4,
              cursor: isDragging ? "grabbing" : "grab",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {menu_list.map((item) => (
              <Box
                key={item.menu_name}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  my: 2,
                  mx: 2,
                  gap: 1,
                  minWidth: 150,
                  cursor: "pointer",
                }}
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name,
                  )
                }
              >
                <Card
                  sx={{
                    borderRadius: "50%",
                    width: 150,
                    height: 150,
                    gap: 10,
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "0.3s",
                    border:
                      category === item.menu_name
                        ? "4px solid #ff751f"
                        : "none",
                    padding: category === item.menu_name ? "2px" : 0,
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.menu_image}
                    alt={item.menu_name}
                    draggable={false}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
                </Card>

                <Typography>{item.menu_name}</Typography>
              </Box>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid size={12}>
        <Divider
          sx={{
            mt: 3,
            height: 2,
            backgroundColor: "#999999",
            border: "none",
            mx: "auto",
            width: "90%",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default ExploreMenu;
