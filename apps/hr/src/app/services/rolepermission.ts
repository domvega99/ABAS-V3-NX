import axios from 'axios';
import { API_BASE_URL } from '../../../apiConfig';
import { getCookie } from 'cookies-next';
import { SubModule, SubModules } from './submodule';
const token = getCookie('auth_token');

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
    headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
    },
});

export type RolePermissions = {
    status: number,
    message: string,
    totalPage?: number,
    count?: number,
    data: RolePermission[]
};

export type RolePermission = {
    id: number,
    module_id: number,
    role_id: number,
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

export type RolePermissionResponse = {
    status: string,
    message: string
}
  
// export const getAllRoles = async (page: number, limit: number, search: string, order: string, sort: string) => {
//     try {
//         const url = `/roles?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
//         const response = await api.get<Roles>(url);
//         return response.data;
//     } catch (error: any) {
//         throw error;
//     }
// };

export const addRolePermission = async (data: RolePermission) => {
    try {
        const response = await api.post<RolePermissionResponse>('/role-permissions', data);
        return response.data;
    } catch (error: any) {
        throw error
    }
};

// export const showRoleById = async (id: number) => {
//     try {
//         const response = await api.get<{data: Role}>(`/roles/${id}`);
//         return response.data.data;
//     } catch (error) {
//         throw error;
//     }
// };

export const updateRolePermission = async (id: number, data: RolePermission) => {
    try {
        const response = await api.put<RolePermissionResponse>(`/role-permissions/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// export const getAllActiveRoles = async () => {
//     try {
//         const url = `/role-actives`;
//         const response = await api.get<Roles>(url);
//         return response.data;
//     } catch (error: any) {
//         throw error;
//     }
// };


