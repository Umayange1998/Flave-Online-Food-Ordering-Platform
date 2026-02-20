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
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
// import { set } from "mongoose";

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
  const { setToken } = useContext(StoreContext);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });



  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
    setGeneralError("");
    if (name === "email") setRegEmailError("");
    if (name === "password") setRegPasswordError("");
    if (name === "name") setFullNameError("");
    // setErrors((prev) => ({ ...prev, [name]: null }));
  };
  const [generalError, setGeneralError] = React.useState("");

  // const [errors, setErrors] = React.useState({});
  const [regEmailError, setRegEmailError] = React.useState("");
  const [regPasswordError, setRegPasswordError] = React.useState("");
  const [fullNameError, setFullNameError] = React.useState("");
  const baseURL = process.env.REACT_APP_BASE_URL;



  const validateRegister = () => {
  let valid = true;

  // Reset old errors
  setFullNameError("");
  setRegEmailError("");
  setRegPasswordError("");
  setGeneralError("");

  if (!data.name.trim()) {
    setFullNameError("Full name is required");
    valid = false;
  }

  if (!data.email.trim()) {
    setRegEmailError("Email is required");
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    setRegEmailError("Invalid email format");
    valid = false;
  }

  if (!data.password.trim()) {
    setRegPasswordError("Password is required");
    valid = false;
  } else if (data.password.length < 8) {
    setRegPasswordError("Password must be at least 8 characters");
    valid = false;
  }

  return valid;
};

  const handleChangeModel = () => {
    setIsSignIn((prev) => !prev);
    setGeneralError("");
   setRegEmailError("");
   setRegPasswordError("");
   setFullNameError("");
    setData({
      name: "",
      email: "",
      password: "",
    });
  };


  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/user/login`, {
        email: data.email,
        password: data.password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowSignin(false);
      setData({
      name: "",
      email: "",
      password: "",
    });
      console.log("Login successful:", response.data.message);
    } catch (error) {
      if (error.response) {
        // show server error
        setGeneralError(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };


  const onRegisterHandler = async (e) => {
    e.preventDefault();
    if (!validateRegister()) {
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/user/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowSignin(false);
      setData({
      name: "",
      email: "",
      password: "",
    });
    } catch (error) {
      if (error.response) {
        const serverMessage = error.response.data.message;

        // Map backend message to fields
        const newErrors = {};
        if (serverMessage.includes("Email")) setRegEmailError(serverMessage);
        if (serverMessage.includes("Password"))
          setRegPasswordError(serverMessage);
        if (serverMessage.includes("name")) setFullNameError(serverMessage);

        // if (serverMessage.includes("All fields")) {
        //   setFullNameError(serverMessage);
        //   setRegEmailError(serverMessage);
        //   setRegPasswordError(serverMessage);
        // }
      } else {
        console.error(error);
      }
    }
  };

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
          <Grid
            item
            xs={12}
            md={6}
            p={{ xs: 3, md: 4 }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mx={"auto"}
          >
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
              {!isSignIn && (
                <TextField
                  size="small"
                  label="Full Name"
                  onChange={onChangeHandler}
                  name="name"
                  value={data.name}
                  fullWidth
                  error={!!fullNameError}
                  helperText={fullNameError}
                />
              )}

              {!isSignIn ? (
                <TextField
                  size="small"
                  label="Email Address"
                  type="email"
                  onChange={onChangeHandler}
                  name="email"
                  value={data.email}
                  fullWidth
                  error={!!regEmailError}
                  helperText={regEmailError}
                />
              ) : (
                <TextField
                  size="small"
                  label="Email Address"
                  type="email"
                  onChange={onChangeHandler}
                  name="email"
                  value={data.email}
                  fullWidth
                  error={!!generalError}
                  // helperText={errors.email}
                />
              )}

              {!isSignIn ? (
                <TextField
                  size="small"
                  label="Password"
                  type="password"
                  onChange={onChangeHandler}
                  name="password"
                  value={data.password}
                  fullWidth
                  error={!!regPasswordError}
                  helperText={regPasswordError}
                />
              ) : (
                <TextField
                  size="small"
                  label="Password"
                  type="password"
                  onChange={onChangeHandler}
                  name="password"
                  value={data.password}
                  fullWidth
                  error={!!generalError}
                  // helperText={generalError.password}
                />
              )}

              {generalError && (
                <Typography color="error" fontSize="0.9rem">
                  {generalError}
                </Typography>
              )}

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
                onClick={isSignIn ? onLoginHandler : onRegisterHandler}
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
                    sx={{ borderRadius: "30px" }}
                  >
                    <img
                      style={{
                        width: "30px",
                      }}
                      src={assets.G_logo}
                      alt=""
                    />
                    {isSignIn ? "Sign In" : "Sign Up"} with Google
                  </Button>
                </Grid>
              </Grid>

              <Typography textAlign="center" mt={3}>
                {isSignIn ? (
                  <>
                    Don’t have an account?{" "}
                    <Button variant="text" onClick={handleChangeModel}>
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Button variant="text" onClick={handleChangeModel}>
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
