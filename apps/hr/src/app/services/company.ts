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

export const CompanyInitial: Company = {
    id: 0,
    name: '',
    address: '',
    telephone_no: '',
    fax_no: '',
    stat: 1,
    created_by: '',
    modified_by: '',
    created: '', 
    modified: '',
    company_tin: '',
    is_top_20000: 0,
    abbreviation: '',
    logo_path: '',
};

export type Companies = {
    status: number,
    message: string,
    count: number,
    data: Company[]
};

export type Company = {
    id?: number,
    name: string,
    address?: string,
    telephone_no?: string,
    fax_no?: string,
    stat: number,
    created_by?: string,
    modified_by?: string,
    created?: string, 
    modified?: string,
    company_tin?: string,
    is_top_20000?: number,
    abbreviation?: string,
    logo_path?: string,
}

  
export const getAllCompanies = async (page: number, limit: number, search: string, order: string, sort: string) => {
    try {
        const url = `/master-companies?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
        const response = await api.get<Companies>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const addCompany = async (data: Company) => {
    try {
        const response = await api.post<{ status: string, message: string }>('/master-companies', data);
        return response.data;
    } catch (error: any) {
        throw error
    }
};

export const showCompanyById = async (id: number) => {
    try {
        const response = await api.get<{data: Company}>(`/master-companies/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const updateCompany = async (id: number, data: Company) => {
    try {
        const response = await api.put<{ status: string, message: string }>(`/master-companies/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// export const getAllActiveDepartments = async () => {
//     try {
//         const url = `/master-departments?stat=1`;
//         const response = await API.get<Departments>(url);
//         return response.data;
//     } catch (error: any) {
//         throw error;
//     }
// };




