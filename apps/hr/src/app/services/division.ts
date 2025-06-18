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

export type Divisions = {
    status: number,
    message: string,
    count: number,
    data: Division[]
};

export type Division = {
    id?: number,
    name: string,
    created_by?: string,
    date_created?: string, 
    modified_by?: string,
    date_modified?: string,
    stat?: string,
}
  
// export const getAllFilteredDivisions = async (page: number, limit: number, search: string, order: string, sort: string) => {
//     try {
//         const url = `/master-departments?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
//         const response = await api.get<Departments>(url);
//         return response.data;
//     } catch (error: any) {
//         throw error;
//     }
// };

export const getAllDivisions = async () => {
    try {
        const url = `/master-divisions`;
        const response = await api.get<Divisions>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

// export const addDepartment = async (data: Department) => {
//     try {
//         const response = await api.post<{ status: string, message: string}>('/master-departments', data);
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

// export const updateModule = async (id: number, data: Module) => {
//     try {
//         const response = await api.put<ModuleResponse>(`/modules/${id}`, data);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };




