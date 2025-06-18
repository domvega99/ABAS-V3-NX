'use client'
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import PageContainer from '@/app/components/shared/container/PageContainer';
import Logo from '@/app/components/shared/logo/Logo';
import SingleSnackbar from '@/app/components/shared/SingleSnackbar';
import { useAuth } from '@/app/hooks/useAuth';
import { authLogin } from '@/app/services/auth-provider';
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Login = () => {
    const { auth, signIn, signOut, loadUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const authToken = getCookie('auth_token');
        if (auth.isAuthenticated) {
            router.push('/');
        } else if (!authToken) {
            router.push('/authentication/login');
        }
    }, [auth.isAuthenticated, router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setUsernameError('')
        setPasswordError('')
        try {
            const response = await authLogin(username, password);
            if (response) {
                if (response.status === 1) {
                    signIn(response);
                    if (response.payload.req) {
                        router.push('/authentication/change-pass');
                        setCookie('auth_new', response.token);
                    } else {
                        router.push('/');
                        setCookie('auth_token', response.token);
                    }
                } else {
                    setError(response.message);
                    setSnackbarOpen(true);
                }
            }
        } catch (error: any) {
            const { message } = error.response.data;
            if (message.username || message.password) {
                setUsernameError(message.username)
                setPasswordError(message.password)
            } else {
                setSnackbarOpen(true);
                setError(message);
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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    "&:before": {
                        content: '""',
                        backgroundSize: "400% 400%",
                        animation: "gradient 15s ease infinite",
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        opacity: "0.3",
                    },
                }}
            >
                <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }} >
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
                                    htmlFor="username"
                                    mb="5px"
                                >
                                    Username
                                </Typography>
                                <CustomTextField 
                                    variant="outlined" 
                                    fullWidth 
                                    type="text"
                                    value={username}
                                    onChange={(e: any) => setUsername(e.target.value)}
                                    error={Boolean(usernameError)}
                                />
                                {usernameError && <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'red' }}>{usernameError}</Typography>}
                            </Box>
                            <Box mt="25px">
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
                            <Stack
                                justifyContent="space-between"
                                direction="row"
                                alignItems="center"
                                my={2}
                            >
                                <Typography
                                    component={Link}
                                    href="/authentication/forgot"
                                    fontWeight="500"
                                    sx={{
                                        textDecoration: "none",
                                        color: "primary.main",
                                    }}
                                >
                                    Forgot Password ?
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box>
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
                                Sign In
                            </Button>
                            <SingleSnackbar
                                open={snackbarOpen}
                                severity={error ? 'error' : 'success'} 
                                message={error || 'Login successful!'}
                                onClose={handleSnackbarClose}
                            />
                        </Box>
                    </form>
                </Card>
            </Box>
        </PageContainer>
    );
};

export default Login;
