import { ref } from 'vue'

export const users = ref<{ username: string, password: string }[]>([])

export function refUsers() {
  return users
}

// Example usage of addToUsers function
addToUsers({ username: 'exampleUser', password: 'examplePass' });

export function addToUsers({ username, password }: { username: string, password: string }) {
  users.value.push({ username, password})
}