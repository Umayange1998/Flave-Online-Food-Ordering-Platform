import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { assets } from "../../assets/assets";
import TopDrawer from "../TopDrawer/TopDrawer";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const links = [
  { label: "Cart", id: "cart", icon: <ShoppingCartIcon /> },
  { label: "Notification", id: "notification", icon: <NotificationsIcon /> },
  { label: "Profile", id: "profile", icon: <AccountCircle /> },
];
const pages = [
  { label: "Home", id: "home" },
  { label: "Menu", id: "menu", type: "scroll" },
  { label: "Contact Us", id: "contact" },
];
function Navbar({ setShowSignin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
const {cartItems} = useContext(StoreContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
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
          backgroundColor: "#ffffff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 50,
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
                color="#999999"
              >
                <MenuIcon />
              </IconButton>
            )}
            {isOpenDrawer && (
              <IconButton
                sx={{ color: "#999999", marginBottom: 1 }}
                onClick={handleCloseButton}
              >
                <CloseIcon />
              </IconButton>
            )}
            <TopDrawer
              isOpenDrawer={isOpenDrawer}
              links={links}
              handleClose={handleCloseNavMenu}
              pages={pages}
            />
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: { xs: 2, md: 10 }, ml: { xs: 0, md: 6 } }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
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
          <Search
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon
              sx={{
                color: "#999999",
              }}
            />
            <SearchIconWrapper
              sx={{
                color: "#000000",
              }}
            ></SearchIconWrapper>
            <StyledInputBase
              sx={{
                backgroundColor: "#F5F5F5",
                borderRadius: "4px",
                "& .MuiInputBase-input": {
                  color: "#000000",
                },
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => {
                  handleCloseNavMenu();

                  // HOME BUTTON
                  if (page.id === "home") {
                    if (location.pathname !== "/") {
                      navigate("/");
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }

                  // SCROLL SECTIONS (Menu)
                  if (page.type === "scroll") {
                    if (location.pathname !== "/") {
                      navigate("/");
                      setTimeout(() => {
                        document
                          .getElementById(page.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    } else {
                      document
                        .getElementById(page.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                sx={{
                  my: 2,
                  color: "#999999",
                  display: "block",
                  fontFamily: "Montserrat Alternates",
                  textTransform: "none",
                  fontSize: { xs: ".7rem", lg: "1rem" },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="#999999"
              onClick={() => navigate("/cart")}
            >
              <Badge
                badgeContent={Object.values(cartItems).reduce((a, b) => a + b, 0)}
                color="error"
                
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="#999999"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="#999999"
            >
              <AccountCircle />
            </IconButton> */}
            <Button
              variant="outlined"
              sx={{
                p: "0.1rem 2rem",
                color: "#999999",
                borderColor: "#999999",
                "&:hover": {
                  borderColor: "#999999",
                },
                borderRadius: "30px",
                mx: 2,
              }}
              onClick={() => setShowSignin(true)}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
