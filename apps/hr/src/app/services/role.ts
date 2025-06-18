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

export type Roles = {
    status: number,
    message: string,
    totalPage?: number,
    count?: number,
    data: Role[]
};

export type Role = {
    id: number,
    name: string,
    module_id: number,
    created_by?: string,
    created_on?: string,
    modified_on?: string,
    modified_by?: string,
    stat: number,
}

export type RoleResponse = {
    status: string,
    message: string
}
  
export const getAllRoles = async (page: number, limit: number, search: string, order: string, sort: string) => {
    try {
        const url = `/roles?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
        const response = await api.get<Roles>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const addRole = async (data: Role) => {
    try {
        const response = await api.post<RoleResponse>('/roles', data);
        return response.data;
    } catch (error: any) {
        throw error
    }
};

export const showRoleById = async (id: number) => {
    try {
        const response = await api.get<{data: Role}>(`/roles/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (id: number, data: Role) => {
    try {
        const response = await api.put<RoleResponse>(`/roles/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};




