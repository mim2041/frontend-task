/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '../utils/axios';

export interface LoginCredentials {
    login: string;
    password: string;
}

// export interface LoginResponse {
//     token: string;
//     user: {
//         id: string;
//         name: string;
//         email: string;
//     };
// }

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<any> => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    },
};