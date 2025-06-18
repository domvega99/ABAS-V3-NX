import axios from 'axios';
import { API_BASE_URL } from '../../../apiConfig';
import { getCookie } from 'cookies-next';
import { SubModule, SubModules } from './submodule';
import { SubModulePermission, SubModulePermissions } from './submodulePermission';
import { RolePermission } from './rolepermission';
import { Role, Roles } from './role';
const token = getCookie('auth_token');

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
    headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
    },
});

export type UserLocations = {
    status: number,
    message: string,
    totalPage: number,
    count: number,
    data: UserLocation[]
};

export type UserLocation = {
    id: number,
    location_name: string,
    created_by?: string,
    created_on?: string,
    modified_on?: string,
    modified_by?: string,
    stat: number,
}

export type UserLocationResponse = {
    status: string,
    message: string
}
  
export const getAllUserLocations = async (page: number, limit: number, search: string, order: string, sort: string) => {
    try {
        const url = `/user-locations?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
        const response = await api.get<UserLocations>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

// export const addModule = async (data: Module) => {
//     try {
//         const response = await api.post<ModuleResponse>('/modules', data);
//         return response.data;
//     } catch (error: any) {
//         throw error
//     }
// };

// export const showModuleById = async (id: number) => {
//     try {
//         const response = await api.get<{data: Module}>(`/modules/${id}`);
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

export const getAllActiveUserLocations = async () => {
    try {
        const url = `/user-locations-active`;
        const response = await api.get<UserLocations>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};




