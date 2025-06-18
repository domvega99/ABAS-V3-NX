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

export type SubModulePermissions = {
    status: number,
    message: string,
    totalPage?: number,
    count?: number,
    data: SubModulePermission[]
};

export type SubModulePermission = {
    id: number,
    sub_module_id: number,
    sub_module_name?: string,
    allow: number,
    create: number,
    view: number,
    edit: number,
    update: number,
    cancel: number,
    verify: number,
    approve: number,
    note: number,
}

export type SubModulePermissionResponse = {
    status: string,
    message: string,
}

export const updateSubModulePermission = async (id: number, data: SubModulePermission) => {
    try {
        const response = await api.put<SubModulePermissionResponse>(`/sub-module-permissions/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// export const addSubModule = async (data: SubModule) => {
//     try {
//         const response = await api.post<SubModuleResponse>('/sub-modules', data);
//         return response.data;
//     } catch (error) {
//         throw error
//     }
// };

// export const updateSubModule = async (id: number, data: SubModule) => {
//     try {
//         const response = await api.put<SubModuleResponse>(`/sub-modules/${id}`, data);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const showSubModuleById = async (id: number) => {
//     try {
//         const response = await api.get<{data: SubModule}>(`/sub-modules/${id}`);
//         return response.data.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const showSubModulePermissionById = async (id: number) => {
//     try {
//         const response = await api.get<{data: SubModule}>(`/sub-modules-permission/${id}`);
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


