interface User {
  username: string;
  password: string;
}

import axios from 'axios';

export async function addToUsers(user: User) {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/signup', user);
    return response.data;
  } catch (err) {
    const error = err as { response?: { data?: { error?: string } }; message: string };
    throw new Error(`Error adding user: ${error.response?.data?.error || error.message}`);
  }
}

export async function findUser(username: string, password: string): Promise<User | null> {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
    return { username, password };
  } catch (error) {
    return null;
  }
}