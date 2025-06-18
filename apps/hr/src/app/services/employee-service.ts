import { API } from '../../../apiConfig';

export interface Employee {
  id?: number,
  username: string,
  picture?: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  module_id?: string,
  role_id?: string,
  user_location: string,
  created_by?: string,
  created_on?: string,
  password?: string,
}


export const showUserById = async (id: number) => {
    try {
        const response = await API.get<{data: Employee}>(`/users/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};





