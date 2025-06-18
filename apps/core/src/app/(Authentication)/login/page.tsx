'use client'
import { CustomTextField } from '@abasv3-nx/shared-components';
import { PageContainer } from '@abasv3-nx/shared-components';
import { Logo } from '@abasv3-nx/shared-components';
import { SingleSnackbar } from '@abasv3-nx/shared-components';
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const router = useRouter();


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setUsernameError('')
        setPasswordError('')
        
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

export default Page;
