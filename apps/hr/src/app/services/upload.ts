import axios from 'axios';
import { API_BASE_URL } from '../../../apiConfig';
import { getCookie } from 'cookies-next';

const token = getCookie('auth_token');
const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
    headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
    },
});

export const uploadImage = async (file: File, folder: string) => {
    try {
        const fileData = new FormData();
        fileData.append('image', file);
        const response = await api.post<{ status: string, message: string, file: string }>(`/upload?folder=${folder}`, fileData);
        return response.data.file;  
    } catch (error: any) {
        throw error
    }
};