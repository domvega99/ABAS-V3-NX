import axios from 'axios';
import { API_BASE_URL } from '../../../apiConfig';
import { getCookie } from 'cookies-next';
import { SubModules } from './submodule';
import { SubModulePermissions } from './submodulePermission';
import { RolePermission } from './rolepermission';
import { Role } from './role';
const token = getCookie('auth_token');

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
    headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
    },
});

export type Modules = {
    status: number,
    message: string,
    totalPage: number,
    count: number,
    data: Module[]
};

export type Module = {
    id: number,
    name: string,
    created_by?: string,
    created_on?: string,
    modified_on?: string,
    modified_by?: string,
    stat: number,
}

export type ModuleResponse = {
    status: string,
    message: string
}

export type ModuleRolePermissions = {
    status: number,
    message: string,
    data: ModuleRolePermission[]
}

export type ModuleRolePermission = {
    role_id: number,
    role_name: string,
    sub_module_permissions: RolePermission[]
}

export type ModuleRoles = {
    status: number,
    message: string,
    data: Role[]
}
  
export const getAllModules = async (page: number, limit: number, search: string, order: string, sort: string) => {
    try {
        const url = `/modules?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
        const response = await api.get<Modules>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const addModule = async (data: Module) => {
    try {
        const response = await api.post<ModuleResponse>('/modules', data);
        return response.data;
    } catch (error: any) {
        throw error
    }
};

export const showModuleById = async (id: number) => {
    try {
        const response = await api.get<{data: Module}>(`/modules/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const updateModule = async (id: number, data: Module) => {
    try {
        const response = await api.put<ModuleResponse>(`/modules/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getModuleSubModules = async (id: number, page: number, limit: number, search: string, order: string, sort: string) => {
    try {
        const url = `/module-sub-modules/${id}?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
        const response = await api.get<SubModules>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const getModuleSubModulePermissions = async (id: number) => {
    try {
        const url = `/module-sub-module-permissions/${id}`;
        const response = await api.get<SubModulePermissions>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const getModuleRolePermissions = async (id: number) => {
    try {
        const url = `/module-role-permissions/${id}`;
        const response = await api.get<ModuleRolePermissions>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const getModuleRoles = async (id: number, page: number, limit: number, search: string, order: string, sort: string) => {
    try {
        const url = `/module-roles/${id}?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
        const response = await api.get<SubModules>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const getModuleActiveRoles = async (id: number) => {
    try {
        const url = `/module-role-actives/${id}`;
        const response = await api.get<ModuleRoles>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const getAllActiveModules = async () => {
    try {
        const url = `/module-actives`;
        const response = await api.get<Modules>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};




