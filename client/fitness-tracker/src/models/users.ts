import { ref } from 'vue';

interface User {
  username: string;
  password: string;
}

export const users = ref<User[]>([]);

export function refUsers() {
  return users;
}

export function addToUsers(user: User) {
  users.value.push(user);
}

export function findUser(username: string): User | undefined {
  return users.value.find(user => user.username === username);
}

export const currentUser = ref<User | null>(null);

export function setCurrentUser(username: string, password: string) {
  const user = findUser(username);
  if (user && user.password === password) {
    currentUser.value = user;
  } else {
    currentUser.value = null;
  }
}

// Example usage of addToUsers function
//addToUsers({ username: 'use', password: 'pass' });