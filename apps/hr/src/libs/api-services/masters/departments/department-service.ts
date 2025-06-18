import { API } from "../../../../../apiConfig";

export interface FetchDepartmentsParams {
    search?: string;
    order?: string;
    sort?: string;
    page?: number;
    limit?: number;
    offset?: number;
    status?: string;
    stat?: number | string;
}

export interface Department {
    id?: number;
    name: string;
    division_name?: string;
    division_id?: string;
    sorting: number;
    created_by?: string;
    created_by_name?: string;
    created_on?: string;
    modified_by?: string;
    modified_by_name?: string;
    modified_on?: string;
    stat: string;
}

export interface Departments {
    status: number;
    message: string;
    count: number;
    data: Department[];
}

export const DepartmentInitial: Department = {
    id: 0,
    name: '',
    division_name: '',
    division_id: '',
    sorting: 0,
    created_by: '',
    created_on: '',
    modified_by: '',
    modified_on: '',
    stat: '',
};

export const fetchAllDepartments = async (params: FetchDepartmentsParams) => {
    try {
        const response = await API.get<Departments>('/master-departments', {params});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllDepartments = async (page: number, limit: number, search: string, order: string, sort: string ) => {
    try {
        const response = await API.get<Departments>(`/master-departments?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addDepartment = async (data: Department) => {
    try {
        const response = await API.post<{ status: string, message: string }>('/master-departments', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const showDepartmentById = async (id: number) => {
    try {
        const response = await API.get<{data: Department}>(`/master-departments/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const updateDepartment = async (id: number, data: Department) => {
    try {
        const response = await API.put<{ status: string, message: string }>(`/master-departments/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllActiveDepartments = async () => {
    try {
        const url = `/master-departments?stat=1`;
        const response = await API.get<Departments>(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};




