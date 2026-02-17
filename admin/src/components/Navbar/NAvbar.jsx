import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { assets } from "../../assets/assets";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { responsiveFontSizes } from "@mui/material";

function NAvbar() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  function handleOpenNavMenu() {
    setIsOpenDrawer(true);
  }

  function handleCloseNavMenu() {
    setIsOpenDrawer(false);
  }

  function handleCloseButton() {
    setIsOpenDrawer(false);
    console.log("clicked");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ff7a00",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box
            sx={{
            //   flexGrow: 1,
            //   minWidth: 10,
              alignItems: "center",
              justifyContent: "center",
              display: { xs: "flex", md: "none" },
            }}
          >
            {!isOpenDrawer && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#ffffff"
              >
                <MenuIcon />
              </IconButton>
            )}
            {isOpenDrawer && (
              <IconButton
                sx={{ color: "#ffffff", marginBottom: 1 }}
                onClick={handleCloseButton}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="#ffffff"
            aria-label="open drawer"
            sx={{ mr: { xs: 2, md: 10 }, ml: { xs: 0, md: 6 } }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src={assets.Logo}
              alt="logo"
              style={{
                width: "80px",
              }}
            />
            
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              sx={{ width: "40px", height: "40px" }}
              edge="end"
              aria-label="account of current user"
              aria-controls={"menuId"}
              aria-haspopup="true"
              //   onClick={'handleProfileMenuOpen'}
              color="#ffffff"
            >
              <AccountCircle sx={{ width: "40px", height: "40px" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar isOpenDrawer={isOpenDrawer} handleClose={handleCloseNavMenu} />
    </Box>
  );
}

export default NAvbar;
