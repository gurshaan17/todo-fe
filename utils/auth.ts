import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthResponse {
  username: string;
  email: string
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { email, password });
//   if (response.data && response.data.token) {
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('userEmail', email);
//   }
  return response.data;
};

// export const signup = async (email: string, password: string): Promise<AuthResponse> => {
//   const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, { email, password });
//   if (response.data && response.data.token) {
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('userEmail', email);
//   }
//   return response.data;
// };