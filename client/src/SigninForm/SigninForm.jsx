import * as React from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { assets } from "../assets/assets";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1000,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  overflow: "hidden",
};

function SigninForm({ showSignin, setShowSignin }) {
  const [isSignIn, setIsSignIn] = React.useState(true);

  return (
    <Modal open={showSignin} onClose={() => setShowSignin(false)}>
      <Box sx={style}>
        <Grid container minHeight={600} height="90vh">
          {/* LEFT VISUAL PANEL */}
          <Grid
            size={6}
            display={{ xs: "none", md: "flex" }}
            flexDirection="column"
            justifyContent="space-between"
            p={6}
            sx={{
              background: "linear-gradient(135deg, #ff7a18, #ff9f1c)",
              color: "white",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" mb={2}>
                {isSignIn ? "Welcome Back!" : "Join the Flave Family!"}
              </Typography>
              <Typography>
                {isSignIn
                  ? "Sign in to access your favorite dishes."
                  : "Create an account to track orders and earn rewards."}
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography fontStyle="italic" mb={2}>
                “The best food ordering experience I’ve ever used.”
              </Typography>
              <Typography fontWeight="bold">Alex Johnson</Typography>
              <Typography variant="caption">Food Enthusiast</Typography>
            </Box>
          </Grid>

          {/* FORM PANEL */}
          <Grid item xs={12} md={6} p={{ xs: 3, md: 4 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
mx={'auto'}          >
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="h5" fontWeight="bold">
                {isSignIn ? "Sign In" : "Create Account"}
              </Typography>
              <IconButton onClick={() => setShowSignin(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              component="form"
              display="flex"
              flexDirection="column"
            //   alignItems="space-around"
              gap={1.5}
            >
              {!isSignIn && <TextField   size="small" label="Full Name" fullWidth />}

              <TextField   size="small" label="Email Address" type="email" fullWidth />

              {!isSignIn && <TextField   size="small" label="Phone Number" fullWidth />}

              <TextField   size="small" label="Password" type="password" fullWidth />

              {isSignIn ? (
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              ) : (
                <FormControlLabel
                  control={<Checkbox required />}
                  label="I agree to the Terms & Privacy Policy"
                />
              )}

              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.5,
                  background: "linear-gradient(135deg, #ff7a18, #ff9f1c)",
                }}
              >
                {isSignIn ? "Sign In" : "Create Account"}
              </Button>

              <Divider sx={{ my: 2 }}>OR</Divider>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="#999999"
                    sx={{borderRadius:"30px"}}
                  >
                    <img style={{
                        width:"30px"
                    }} src={assets.G_logo} alt="" />
                    {isSignIn ? "Sign In" : "Sign Up"} with Google
                  </Button>
                </Grid>
                
              </Grid>

              <Typography textAlign="center" mt={3}>
                {isSignIn ? (
                  <>
                    Don’t have an account?{" "}
                    <Button variant="text" onClick={() => setIsSignIn(false)}>
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Button variant="text" onClick={() => setIsSignIn(true)}>
                      Sign in
                    </Button>
                  </>
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default SigninForm;
