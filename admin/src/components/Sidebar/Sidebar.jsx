import * as React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 250;

function Sidebar({ isOpenDrawer, handleClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "ORDERS", icon: <ReceiptLongIcon />, path: "/orders" },
    { text: "ADD FOOD", icon: <AddBoxIcon />, path: "/add-food" },
    { text: "FOOD LIST", icon: <ListAltIcon />, path: "/food-list" },
    
  ];

  const drawerContent = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (handleClose) handleClose();
              }}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Permanent (Desktop) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            pt: "80px",
            boxSizing: "border-box",
            zIndex: (theme) => theme.zIndex.appBar - 1,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Temporary (Mobile) */}
      <Drawer
        variant="temporary"
        open={isOpenDrawer}
        onClose={handleClose}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            pt: "80px",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Sidebar;
