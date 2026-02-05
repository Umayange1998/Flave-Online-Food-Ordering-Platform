
import {
  Drawer,
  Box,
  List,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function TopDrawer({  isOpenDrawer, links, handleClose, pages }) {
  

  return (
    <>
      {/* Drawer */}
      <Drawer
        anchor="top"
        open={isOpenDrawer}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backdropFilter: "blur(10px)",
            color: "black",
            top: "64px",
            paddingTop: "10px",
            backgroundColor: "transparent",
            tranbackdropFilter: "blur(10px)",
            position: "fixed",
          },
        }}
        BackdropProps={{
          sx: {
            backdropFilter: "none",
            backgroundColor: "transparent",
          },
        }}
      >
        <Box sx={{ display: "flex", px: 2, pb: 2, justifyContent: "center" }}>
          <List>
            {pages.map((page) => (
              <ListItemButton
                sx={{
                  textAlign: "center",
                  color: "#999999",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "primary.main",
                    transition: "width 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
                key={page.label}
                onClick={'() => handleItemClick(page.id)'}
              >
                
                <ListItemText primary={page.label} />
              </ListItemButton>
            ))}
              {links.map((link) => (
              <ListItemButton
                sx={{
                  textAlign: "center",
                  color: "#999999",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "primary.main",
                    transition: "width 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
                key={link.label}
                onClick={'() => handleItemClick(link.id)'}
              >
                {link.icon && (
                  <span style={{ marginRight: 6 }}>{link.icon}</span>
                )}
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
           
          </List>
        </Box>
      </Drawer>
    </>
  );
}
