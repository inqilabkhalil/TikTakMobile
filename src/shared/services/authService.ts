import { api } from '../../shared/services/api';

export interface RegisterData {
  full_name: string;
  phone: string;
  password: string;
}

export const authService = {
register: async (data: RegisterData) => {
  try {
    console.log('REGISTER REQUEST:', data);

    const response = await api.post('/auth/signup', data);

    console.log('REGISTER RESPONSE:', response.data);

    return response.data;
  } catch (error: any) {
    console.log('REGISTER STATUS:', error.response?.status);

    console.log(
      'REGISTER ERROR DATA:',
      JSON.stringify(error.response?.data, null, 2),
    );

    throw error;
  }
},

  login: async (phone: string, password: string) => {
    const response = await api.post('/auth/login', {
      phone,
      password,
    });

    return response.data;
  },
};