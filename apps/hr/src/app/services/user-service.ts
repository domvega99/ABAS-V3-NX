import jwt from 'jsonwebtoken';
import { getCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// export const logout = () => {

//   if (typeof localStorage !== 'undefined') {
//     Cookies.remove('token');
//     Cookies.remove('user');
//   }
//   if (typeof window !== 'undefined') {
//     window.location.href = '/auth/login';
//   }

// };

export const getAuth = () => {
      const token = getCookie('auth_token');
      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          if (decodedToken) {
            axios.get(`http://localhost:8080/api/auth-user/view/${decodedToken.sub}`, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`
                }
            }).then(res => {
                const user_role = res.data.user;
                console.log(user_role)       
                }).catch(error => {
            });
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







