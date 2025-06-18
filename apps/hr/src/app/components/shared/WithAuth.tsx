import { isAuthenticated } from '@/app/services/auth-service';
import { logout } from '@/app/state/slice/authSlice';
import { setUser } from '@/app/state/slice/userSlice';
import { RootState } from '@/app/state/store';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from '../../../../apiConfig';
import SingleSnackbar from './SingleSnackbar';
import { useAuth } from '@/app/hooks/useAuth';
import jwt from 'jsonwebtoken';
import { showUserById } from '@/app/services/user';

const withAuth = (WrappedComponent: any) => {
    const WithAuthComponent = (props: any) => {
        const user = useSelector((state: RootState) => state.auth.user);
        const router = useRouter();
        const dispatch = useDispatch();
        const [errorMessage, setErrorMessage] = useState('');
        const [snackbarOpen, setSnackbarOpen] = useState(false);
        const { auth, signIn, signOut, loadUser } = useAuth();

        useEffect(() => {
            const authToken = getCookie('auth_token');
            if (!authToken) {
                signOut();
                router.push('/authentication/login');
                return;
            }
        
            if (!auth.isAuthenticated) {
                try {
                    const decodedToken = jwt.decode(authToken) as any;
                    const userId = Number(decodedToken?.sub);
                    if (userId) {
                        (async () => {
                            const user = await showUserById(userId);
                            loadUser(user);
                        })();
                    } else {
                        throw new Error("Invalid user ID in token");
                    }
                } catch (error) {
                    console.error(error);
                    signOut();
                    router.push('/authentication/login');
                }
            }
        }, [auth.isAuthenticated, router, dispatch]);

        // useEffect(() => {
        //     const handleError = (message: string) => {
        //         setErrorMessage(message);
        //         setSnackbarOpen(true);
        //         setTimeout(() => {
        //             deleteCookie('auth_token');
        //             dispatch(logout());
        //             router.push('/authentication/login');
        //         }, 3000);
        //     };

        //     if (!user && !isAuthenticated()) {
        //         router.push('/authentication/login');
        //     } else if (user || user == null) {
        //         const token = getCookie('auth_token');
        //         if (token) {
        //             const fetchUserData = async () => {
        //                 try {
        //                     const response = await axios.get(`${API_BASE_URL}/api/auth-verify`, {
        //                         withCredentials: true,
        //                         headers: {
        //                             'Content-Type': 'application/json',
        //                             'Authorization': `${token}`
        //                         }
        //                     });
        //                     if (response) {
        //                         dispatch(setUser(response.data.data));
        //                     }
        //                 } catch (error: any) {
        //                     if ((error.response && error.response.data.status === 'error') || error.response.data.error === 'Unauthorized' || error.response.data.error === 'Forbidden') {
        //                         const { message } = error.response.data;
        //                         handleError(message);

        //                         console.error('Error fetching user data:', error.response.data);
        //                     }
        //                 }
        //             };
        //             fetchUserData();
        //         }
        //     }
        // }, [user, router, dispatch]);

        const handleSnackbarClose = () => {
            setSnackbarOpen(false);
        };

        return (
            <>
                <SingleSnackbar 
                    open={snackbarOpen} 
                    message={errorMessage} 
                    severity="error" 
                    onClose={handleSnackbarClose} 
                />
                <WrappedComponent {...props} />
            </>
        );
    };

    WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuthComponent;
};

export default withAuth;

