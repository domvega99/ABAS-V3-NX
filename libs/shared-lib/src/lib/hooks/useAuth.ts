import { deleteCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentUser, logout } from '../state/slice/authSlice';
import { RootState } from '../state/store';
// import { showUserById } from '../services/user';

export const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const signIn = async (data: any) => {
        // dispatch(loginRequest());
        // try {
        //     const user = await showUserById(data.payload.sub)
        //     dispatch(loginSuccess(user)); 
        // } catch (error) {
        //     dispatch(loginFailure("Failed to login"));
        // }
    };

    const signOut = () => {
        dispatch(logout());
        deleteCookie('auth_token')
    };

    const loadUser = (data: any) => {
        if (!auth.isAuthenticated) {
            dispatch(loadCurrentUser(data));
        }
    };

    return { auth, signIn, signOut, loadUser };
};
