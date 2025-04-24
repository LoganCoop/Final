import { ref } from 'vue';
import axios from 'axios';

// Allow currentUser to be null or an object with username
export const currentUser = ref<{ username: string } | null>(null);

export async function login(username: string, password: string) {
  try {
    const response = await axios.post('/api/auth/login', { username, password });
    currentUser.value = { username };
    localStorage.setItem('userToken', username); // Replace with real token if available
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
}

export async function signup(username: string, password: string) {
  try {
    const response = await axios.post('/api/auth/signup', { username, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Signup failed');
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch users');
  }
}

export function logout() {
  currentUser.value = null;
  localStorage.removeItem('userToken');
}
