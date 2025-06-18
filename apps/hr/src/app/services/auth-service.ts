import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

// export const logout = () => {

//   if (typeof localStorage !== 'undefined') {
//     Cookies.remove('token');
//     Cookies.remove('user');
//   }
//   if (typeof window !== 'undefined') {
//     window.location.href = '/auth/login';
//   }

// };

export const isAuthenticated = () => {
    const token = getCookie('auth_token');
        if (token) {
            try {
                const decodedToken = jwt.decode(token);
                if (decodedToken) {
                    return true;
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                return false;
            }
        }
    return false;
};

export const isNewAuthenticated = () => {
    const token = getCookie('auth_new');
        if (token) {
            try {
                const decodedToken = jwt.decode(token);
                if (decodedToken) {
                    return true;
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                return false;
            }
        }
    return false;
};


// export const isNewpass = () => {

//   if (typeof localStorage !== 'undefined') {
//     const token = Cookies.get('newtoken');
//     if (token) {
//       const decodedToken = jwt.decode(token);
//       if (decodedToken) {
//         return true;
//       }
//     }
//   }

//   return false;
// };







