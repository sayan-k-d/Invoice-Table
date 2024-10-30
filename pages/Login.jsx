import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();

    if (email === "admin@gmail.com" && password === "admin@123") {
      router.push("/Home");
    } else {
      setError("Invalid email or password");
    }
  };
  return (
    <>
      <Paper
        component={Box}
        elevation={3}
        className="w-100 mx-auto my-5 p-4"
        maxWidth="60%"
      >
        <Typography
          className="text-center text-uppercase fw-bold mb-3"
          variant="h3"
        >
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Stack gap={2}>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Box mx="auto">
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export default Login;
