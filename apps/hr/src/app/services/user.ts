import axios from 'axios';
import { API, API_BASE_URL } from '../../../apiConfig';
import { getCookie } from 'cookies-next';
const newAuthToken = getCookie('auth_new');

const newAuthApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Authorization': `${newAuthToken}`,
    'Content-Type': 'application/json',
  },
});

export type Users = {
  status: number,
  message: string,
  totalPage: number,
  count: number,
  data: User[]
};

export type User = {
  id?: number,
  username: string,
  picture?: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  module_id?: string,
  role_id?: string,
  user_location: string,
  created_by?: string,
  created_on?: string,
  password?: string,
}

export const UserInitial: User = {
  username: '',
  picture: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '', 
  user_location: '',
  module_id: '',
  role_id: ''
};

export type UserResponse = {
  status: string,
  message: string
}
  
export const getAllUsers = async (page: number, limit: number, search: string, order: string, sort: string) => {
  try {
      const url = `/users?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
      const response = await API.get<Users>(url);
      return response.data;
  } catch (error: any) {
      throw error;
  }
};

export const addUser = async (data: User) => {
  try {
      const response = await API.post<{status: string, message: string}>('/users', data);
      return response.data;
  } catch (error: any) {
      throw error
  }
};

export const showUserById = async (id: number) => {
  try {
      const response = await API.get<{data: User}>(`/users/${id}`);
      return response.data.data;
  } catch (error) {
      throw error;
  }
};

export const updateUser = async (id: number, data: User) => {
  try {
      const response = await API.put<UserResponse>(`/users/${id}`, data);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const changePassUser = async (data: User) => {
  try {
      const response = await newAuthApi.put<UserResponse>(`/user-changepass`, data);
      return response.data;
  } catch (error) {
      throw error;
  }
};


