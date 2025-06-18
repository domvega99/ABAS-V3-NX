import axios from 'axios';
import { API_BASE_URL } from '../../../apiConfig';
import { getCookie } from 'cookies-next';

const token = getCookie('auth_token');

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
    headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
    },
});

export const VesselInitial: Vessel = {
    id: 0,
    name: '',
};

export type Vessels = {
    status: number,
    message: string,
    count: number,
    data: Vessel[]
};

export type Vessel = {
    id?: number,
    name: string,
}

  
// export const getAllDepartments = async (page: number, limit: number, search: string, order: string, sort: string) => {
//     try {
//         const url = `/master-departments?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
//         const response = await api.get<Departments>(url);
//         return response.data;
//     } catch (error: any) {
//         throw error;
//     }
// };

// export const addDepartment = async (data: Department) => {
//     try {
//         const response = await api.post<{ status: string, message: string }>('/master-departments', data);
//         return response.data;
//     } catch (error: any) {
//         throw error
//     }
// };

// export const showDepartmentById = async (id: number) => {
//     try {
//         const response = await api.get<{data: Department}>(`/master-departments/${id}`);
//         return response.data.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const updateDepartment = async (id: number, data: Department) => {
//     try {
//         const response = await api.put<{ status: string, message: string }>(`/master-departments/${id}`, data);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

export const getAllActiveVessels = async (companyId: number) => {
    try {
        const url = `/vessels-by-company/${companyId}`;
        const response = await api.get<Vessels>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};




