// import {
//   Box,
//   Button,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const googleSvg = "/images/google.svg";
  const handleLogin = (event) => {
    event.preventDefault();

    if (email === "admin@gmail.com" && password === "admin@123") {
      localStorage.setItem("loginStatus", "active");
      router.push("/UploadPDF");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #E0E0FA,#E0F7FA, #B3E5FC)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: 5,
          maxWidth: "900px",
          width: "100%",
          // height: "500px",
          padding: "1rem",
          bgcolor: "white",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            width: "50%",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            Please enter log in details below
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            onFocus={(e) => setError("")}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => setError("")}
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  <VisibilityOff />
                </IconButton>
              ),
            }}
          />
          <Typography
            variant="body2"
            align="right"
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 4,
              cursor: "pointer",
              mb: 3,
            }}
          >
            {error && (
              <Typography
                variant="body2"
                color="error"
                disabled
                sx={{ cursor: "default" }}
              >
                {error}
              </Typography>
            )}
            Forgot password?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              bgcolor: "black",
              color: "white",
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "10px",
              mb: 2,
              "&:hover": {
                bgcolor: "black",
              },
            }}
          >
            Sign in
          </Button>

          {/* Divider with "or continue" text */}
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ mx: 2, color: "gray" }}>
              or continue
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          {/* Google Login Button */}
          <Button
            variant="outlined"
            startIcon={
              <img
                src={googleSvg}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
            }
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1rem",
              borderColor: "gray",
              color: "gray",
              borderRadius: "10px",
              "&:hover": {
                borderColor: "gray",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Log in with Google
          </Button>

          <Typography variant="body2" align="center" mt={3}>
            Don’t have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              Sign Up
            </Typography>
          </Typography>
        </form>

        <Box
          borderRadius="20px 20px 20px 50px"
          sx={{
            width: "50%",
            bgcolor: "#1c1b1f",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            color: "white",
            position: "relative",
            p: 2,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${"/images/avatar.png"})`,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={1}
            sx={{ color: "darkgray" }}
          >
            Manage your Invoices Anywhere
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: "darkgray" }}
          >
            you can Manage your Invoices on the go with Us on the web
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// const Login = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const handleLogin = (event) => {
//     event.preventDefault();

//     if (email === "admin@gmail.com" && password === "admin@123") {
//       router.push("/Home");
//     } else {
//       setError("Invalid email or password");
//     }
//   };
//   return (
//     <Box className="login-base">
//       <Paper
//         component={Box}
//         elevation={3}
//         className="w-100 mx-auto my-5 p-4"
//         maxWidth="60%"
//       >
//         <Typography
//           className="text-center text-uppercase fw-bold mb-3"
//           variant="h3"
//         >
//           Login
//         </Typography>
//         <form onSubmit={handleLogin}>
//           <Stack gap={2}>
//             <TextField
//               label="Email"
//               type="email"
//               name="email"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               name="password"
//               fullWidth
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             <Box mx="auto">
//               <Button
//                 size="large"
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//               >
//                 Login
//               </Button>
//             </Box>
//           </Stack>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

export default Login;
