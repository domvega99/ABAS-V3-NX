import { API } from '../../../apiConfig';

export const authLogin = async (username: string, password: string) => {
  try {
    const { data } = await API.post('auth-login', { username, password });
    return data;
  } catch (error) {
    throw error;
  }
};

export const authLogout = async () => {
  try {
    return await API.post('auth-logout');
  } catch (error) {
    throw error;
  }
};

export const authUser = async (decodedSub: string) => {
  try {
    return await API.get(`auth-view/${decodedSub}`);
  } catch (error) {
    throw error;
  }
};
