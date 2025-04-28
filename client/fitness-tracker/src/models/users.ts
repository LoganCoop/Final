/* eslint-disable */
import { ref } from 'vue';
import axios from 'axios';

// Allow currentUser to be null or an object with username
export const currentUser = ref<{ id: number, username: string, is_admin?: boolean } | null>(null);

export async function login(username: string, password: string) {
  try {
    const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/auth/login', { username, password });
    // Assume backend returns user id and is_admin
    currentUser.value = { id: response.data.id, username, is_admin: response.data.is_admin };
    localStorage.setItem('userToken', JSON.stringify(currentUser.value));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
}

export async function signup(username: string, password: string) {
  try {
    const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/auth/signup', { username, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Signup failed');
  }
}

export async function fetchUsers(userId?: number) {
  try {
    const user = userId ? { id: userId } : JSON.parse(localStorage.getItem('userToken') || '{}');
    const response = await axios.get('https://fitness-tracker-shxf.onrender.com/api/users', {
      headers: { 'x-user-id': user.id }
    });
    return response.data;
  } catch (error: any) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      throw new Error(`${error.response.status}: Unauthorized or forbidden. You must be an admin.`);
    }
    throw new Error(error.response?.data?.error || 'Failed to fetch users');
  }
}

export async function updateUser(userId: number, updates: any) {
  const user = JSON.parse(localStorage.getItem('userToken') || '{}');
  const response = await axios.put(`https://fitness-tracker-shxf.onrender.com/api/users/${userId}`, updates, {
    headers: { 'x-user-id': user.id }
  });
  return response.data;
}

export async function deleteUser(userId: number) {
  const user = JSON.parse(localStorage.getItem('userToken') || '{}');
  const response = await axios.delete(`https://fitness-tracker-shxf.onrender.com/api/users/${userId}`, {
    headers: { 'x-user-id': user.id }
  });
  return response.data;
}

export function logout() {
  currentUser.value = null;
  localStorage.removeItem('userToken');
}
