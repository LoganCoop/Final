<template>
    <div class="admin-view">
        <h1>Admin Panel</h1>
        
        <div class="user-list">
            <h2>Users</h2>
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.name }} - {{ user.email }}
                    <button @click="editUser(user)">Edit</button>
                    <button @click="deleteUser(user.id)">Delete</button>
                </li>
            </ul>
        </div>

        <div class="user-add">
            <h2>Add User</h2>
            <form @submit.prevent="addUser">
                <input v-model="newUser.name" placeholder="Name" required />
                <input v-model="newUser.email" placeholder="Email" required />
                <button type="submit">Add</button>
            </form>
        </div>

        <div class="user-edit" v-if="isEditing">
            <h2>Edit User</h2>
            <form @submit.prevent="updateUser">
                <input v-model="userForm.name" placeholder="Name" required />
                <input v-model="userForm.email" placeholder="Email" required />
                <button type="submit">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
import { fetchUsers } from '@/models/users';

export default {
    name: 'AdminPanel',
    data() {
        return {
            users: [],
            newUser: {
                name: '',
                email: ''
            },
            userForm: {
                id: null,
                name: '',
                email: ''
            },
            isEditing: false
        };
    },
    methods: {
        async fetchUsers() {
            try {
                this.users = await fetchUsers();
            } catch (error) {
                alert('Failed to fetch users: ' + error.message);
            }
        },
        addUser() {
            // Implement add user via API if needed
        },
        updateUser() {
            // Implement update user via API if needed
        },
        editUser(user) {
            this.userForm = { ...user };
            this.isEditing = true;
        },
        deleteUser(userId) {
            // Implement delete user via API if needed
        },
        resetForm() {
            this.userForm = { id: null, name: '', email: '' };
            this.isEditing = false;
        },
        saveUsers() {
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    },
    mounted() {
        this.fetchUsers();
    }
};
</script>

<style scoped>
.admin-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
}

h1, h2 {
    color: #444;
    text-align: center;
    margin-bottom: 20px;
}

.user-list, .user-add, .user-edit {
    margin-bottom: 30px;
}

.user-list ul {
    list-style: none;
    padding: 0;
}

.user-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s;
}

.user-list li:hover {
    background-color: #f1f1f1;
}

.user-list button {
    margin-left: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    transition: background-color 0.3s;
}

.user-list button:hover {
    background-color: #0056b3;
}

.user-add, .user-edit {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-add form, .user-edit form {
    display: flex;
    flex-direction: column;
}

.user-add input, .user-edit input {
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

.user-add button, .user-edit button {
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.user-add button:hover, .user-edit button:hover {
    background-color: #218838;
}
</style>
