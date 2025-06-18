"use client";
import PageContainer from "@/app/components/shared/container/PageContainer";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import Logo from "@/app/components/shared/logo/Logo";
import SingleSnackbar from "@/app/components/shared/SingleSnackbar";
import { changePassUser } from "@/app/services/user";
import { isNewAuthenticated } from "@/app/services/auth-service";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import { deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ChangePass = () => {
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isNewAuthenticated()) {
      router.push('/authentication/change-pass');
    } else {
      router.push('/authentication/login');
    }
  }, [router]);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setConfirmError('')
    setPasswordError('')
    setError('')
    try {
      const userData: any = {
        password1: password,
        confirm: confirm,
      };
      const response = await changePassUser(userData);
      if (response) {
        if (response.status == 'success') {
          deleteCookie('auth_new');
          router.push('/authentication/login')
          setSuccess(response.message)
          setSnackbarOpen(true);
        }
      }
    } catch (error: any) {
      const errorMessages = error.response.data.message;
      if (typeof errorMessages === 'object') {
        if (errorMessages.confirm) {
          setConfirmError('The confirm password is required')
          setPasswordError('')
        } 
        if ((errorMessages.password1)) {
          setConfirmError('')
          setPasswordError('The password is required')
        } 
        if ((errorMessages.password1 && errorMessages.confirm))
        {
          setConfirmError('The confirm password is required')
          setPasswordError('The password is required')
        }
      } else {
        setError(errorMessages)
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
      setSnackbarOpen(false); 
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo collapsed={false}/>
              </Box>
              <form onSubmit={handleSubmit}>
                <Stack>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="password"
                      mb="5px"
                    >
                      Password
                    </Typography>
                    <CustomTextField 
                      type="password" 
                      variant="outlined" 
                      fullWidth 
                      value={password}
                      onChange={(e: any) => setPassword(e.target.value)}
                      error={Boolean(passwordError)}
                    />
                    {passwordError && <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'red' }}>{passwordError}</Typography>}
                  </Box>
                  <Box mt="25px">
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="password"
                      mb="5px"
                    >
                      Confirm Password
                    </Typography>
                    <CustomTextField 
                      type="password" 
                      variant="outlined" 
                      fullWidth 
                      value={confirm}
                      onChange={(e: any) => setConfirm(e.target.value)}
                      error={Boolean(confirmError)}
                    />
                    {confirmError && <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'red' }}>{confirmError}</Typography>}
                  </Box>
                </Stack>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    sx={{ 
                      backgroundColor: 'primary', 
                      color: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary', 
                        color: 'primary.light', 
                      } 
                    }}
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                  <SingleSnackbar
                    open={snackbarOpen}
                    severity={error ? 'error' : 'success'} 
                    message={error || success}
                    onClose={handleSnackbarClose}
                  />
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default ChangePass;
