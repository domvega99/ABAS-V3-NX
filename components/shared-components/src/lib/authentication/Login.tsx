"use client"

import type React from "react"
import { useState } from "react"
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Divider,
  Box,
  InputAdornment,
  Grid,
} from "@mui/material"
import { Visibility, VisibilityOff, Business, People, Security, BoltOutlined } from "@mui/icons-material"

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
  }

  return (
    <Box className="min-h-screen flex">
      {/* Left Side - Company Info */}
      <Box
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)",
          position: "relative",
        }}
      >
        {/* Animated Background Elements */}
        <Box className="absolute inset-0">
          <Box
            className="absolute top-20 left-20 w-32 h-32 rounded-full animate-pulse"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          ></Box>
          <Box
            className="absolute bottom-32 right-16 w-24 h-24 rounded-full animate-bounce"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          ></Box>
          <Box
            className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full animate-ping"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          ></Box>
        </Box>

        {/* Content */}
        <Box className="relative z-10 flex justify-center px-12 text-white">
          <Box className="mb-8 animate-fade-in">
            <Business sx={{ width: 48, height: 48, marginBottom: 2 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              Welcome to TechCorp
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
              Innovating the future, one solution at a time
            </Typography>
          </Box>

          <Box className="space-y-6 animate-slide-up">
            <Box className="flex items-center space-x-4">
              <Box className="p-3 rounded-lg" sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <People sx={{ width: 24, height: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  10,000+ Active Users
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  Join our growing community
                </Typography>
              </Box>
            </Box>

            <Box className="flex items-center space-x-4">
              <Box className="p-3 rounded-lg" sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <Security sx={{ width: 24, height: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Enterprise Security
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  Bank-level encryption & protection
                </Typography>
              </Box>
            </Box>

            <Box className="flex items-center space-x-4">
              <Box className="p-3 rounded-lg" sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <BoltOutlined sx={{ width: 24, height: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Lightning Fast
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  Optimized for peak performance
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box className="w-full lg:w-1/2 flex items-center justify-center p-8" sx={{ backgroundColor: "#f5f5f5" }}>
        <Card className="w-full max-w-md animate-fade-in-up" elevation={8} sx={{ borderRadius: 2 }}>
          <CardContent sx={{ padding: 4 }}>
            <Box className="text-center mb-8">
              <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Sign In
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Welcome back! Please sign in to your account
              </Typography>
            </Box>

            <form onSubmit={handleSubmit} className="space-y-6">
              <TextField
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />

              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Enter your password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box className="flex items-center justify-between mt-2">
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <Typography
                  variant="body2"
                  component="a"
                  href="#"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot password?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  background: "linear-gradient(90deg, #1976d2 0%, #9c27b0 100%)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1565c0 0%, #7b1fa2 100%)",
                  },
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Sign In
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography variant="body2" color="textSecondary" sx={{ mx: 2 }}>
                  Or continue with
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{
                      textTransform: "none",
                      py: 1,
                    }}
                    startIcon={
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    }
                  >
                    Google
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{
                      textTransform: "none",
                      py: 1,
                    }}
                    startIcon={
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    }
                  >
                    Facebook
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Don't have an account?{" "}
                  <Typography
                    component="a"
                    href="#"
                    variant="body2"
                    sx={{
                      color: "#1976d2",
                      fontWeight: 500,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign up here
                  </Typography>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </Box>
  )
}

export default Login;
