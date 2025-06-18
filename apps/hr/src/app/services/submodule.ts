import axios from 'axios';
import { API_BASE_URL } from '../../../apiConfig';
import { getCookie } from 'cookies-next';
import { SubModulePermission } from './submodulePermission';
const token = getCookie('auth_token');

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
    headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
    },
});

export type SubModules = {
    status: number,
    message: string,
    totalPage: number,
    count: number,
    data: SubModule[]
};

export type SubModule = {
    id: number,
    name: string,
    module_id: number,
    created_by?: string,
    created_on?: string,
    modified_on?: string,
    modified_by?: string,
    stat: number,
}

export type SubModuleResponse = {
    status: string,
    message: string,
}

export const addSubModule = async (data: SubModule) => {
    try {
        const response = await api.post<SubModuleResponse>('/sub-modules', data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const updateSubModule = async (id: number, data: SubModule) => {
    try {
        const response = await api.put<SubModuleResponse>(`/sub-modules/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const showSubModuleById = async (id: number) => {
    try {
        const response = await api.get<{data: SubModule}>(`/sub-modules/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const showSubModulePermissionById = async (id: number) => {
    try {
        const response = await api.get<{data: SubModulePermission}>(`/sub-modules-permission/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// export const updateModule = async (id: number, data: Module) => {
//     try {
//         const response = await api.put<ModuleResponse>(`/modules/${id}`, data);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };


