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

export const SupplierInitial: Supplier = {
    id: 0,
    name: '',
    address: '',
    email: '',
    telephone_no: '',
    fax_no: '',
    contact_person: '',
    bank_name: '',
    payment_terms: 0,
    account_name: '',
    bank_account_no: '',
    tin: '',
    vat_computation: '',
    taxation_percentile: '',
    type: '',
    issues_reciepts: '',
    stat: '',
};

export type Suppliers = {
    status: number,
    message: string,
    count: number,
    data: Supplier[]
};

export type Supplier = {
    id?: number,
    name: string,
    address: string,
    email: string,
    telephone_no: string,
    fax_no: string,
    contact_person: string,
    bank_name: string,
    payment_terms: number,
    account_name: string,
    bank_account_no: string,
    tin: string,
    vat_computation: string,
    taxation_percentile: string,
    type: string,
    issues_reciepts: string,
    status?: string,
    supplier_of?: string,
    category?: string,
    created_by?: string,
    created_on?: string, 
    modified_by?: string,
    modified_on?: string,
    stat: string,
}

  
export const getAllSuppliers = async (page: number, limit: number, search: string, order: string, sort: string) => {
    try {
        const url = `/master-suppliers?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}&order=${order}&sort=${sort}`;
        const response = await api.get<Suppliers>(url);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const addSupplier = async (data: Supplier) => {
    try {
        const response = await api.post<{ status: string, message: string }>('/master-suppliers', data);
        return response.data;
    } catch (error: any) {
        throw error
    }
};

export const showSupplierById = async (id: number) => {
    try {
        const response = await api.get<{data: Supplier}>(`/master-suppliers/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const updateSupplier = async (id: number, data: Supplier) => {
    try {
        const response = await api.put<{ status: string, message: string }>(`/master-suppliers/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};