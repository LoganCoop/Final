/* eslint-disable */
import { ref } from 'vue';
import axios from 'axios';

// Allow currentUser to be null or an object with username
export const currentUser = ref<{ id: number, username: string, is_admin?: boolean } | null>(null);

export async function login(username: string, password: string) {
  try {
    const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/auth/login', { username, password });
    // Assume backend returns user id and is_admin
    if (!response.data.id) {
      alert('Login failed: No user ID returned from server.');
      throw new Error('No user ID returned from server');
    }
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

export async function fetchUsers(id?: number) {
  try {
    const user = id ? { id: id } : JSON.parse(localStorage.getItem('userToken') || '{}');
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

export async function updateUser(id: number, updates: any) {
  const user = JSON.parse(localStorage.getItem('userToken') || '{}');
  const response = await axios.put(`https://fitness-tracker-shxf.onrender.com/api/users/${id}`, updates, {
    headers: { 'x-user-id': user.id }
  });
  return response.data;
}

export async function deleteUser(id: number) {
  const user = JSON.parse(localStorage.getItem('userToken') || '{}');
  const response = await axios.delete(`https://fitness-tracker-shxf.onrender.com/api/users/${id}`, {
    headers: { 'x-user-id': user.id }
  });
  return response.data;
}

export async function fetchWorkouts() {
  try {
    const response = await axios.get('https://fitness-tracker-shxf.onrender.com/api/workouts');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch workouts');
  }
}

export function logout() {
  currentUser.value = null;
  localStorage.removeItem('userToken');
}

export async function addUser(newUser: { username: string; is_admin: boolean }) {
  try {
    const user = JSON.parse(localStorage.getItem('userToken') || '{}');
    const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/users', newUser, {
      headers: { 'x-user-id': user.id }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to add user');
  }
}

export async function updateWorkout(workoutId: number, updates: { workout: string; duration: number; distance: number }) {
  try {
    const user = JSON.parse(localStorage.getItem('userToken') || '{}');
    const response = await axios.put(`https://fitness-tracker-shxf.onrender.com/api/workouts/${workoutId}`, updates, {
      headers: { 'x-user-id': user.id }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to update workout');
  }
}

export async function addWorkout(newWorkout: { workout: string; duration: number; distance: number }) {
  try {
    const user = JSON.parse(localStorage.getItem('userToken') || '{}');
    const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/workouts', newWorkout, {
      headers: { 'x-user-id': user.id }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to add workout');
  }
}

export async function deleteWorkout(workoutId: number) {
  try {
    const user = JSON.parse(localStorage.getItem('userToken') || '{}');
    const response = await axios.delete(`https://fitness-tracker-shxf.onrender.com/api/workouts/${workoutId}`, {
      headers: { 'x-user-id': user.id }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to delete workout');
  }
}
