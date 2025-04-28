/* eslint-disable */
<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!isAdmin">
        <h2>Access Denied</h2>
        <p>You must be an admin to view this page.</p>
    </div>
    <div v-else class="admin-view">
        <h1>Admin Panel</h1>
        <div class="user-list">
            <h2>Users</h2>
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.username }} - {{ user.email }} <span v-if="user.is_admin">(admin)</span>
                    <button @click="editUser(user)">Edit</button>
                    <button @click="deleteUser(user.id)">Delete</button>
                </li>
            </ul>
        </div>
        <div class="user-edit" v-if="isEditing">
            <h2>Edit User</h2>
            <form @submit.prevent="updateUser">
                <input v-model="userForm.username" placeholder="Username" required />
                <input v-model="userForm.email" placeholder="Email" required />
                <label><input type="checkbox" v-model="userForm.is_admin" /> Admin</label>
                <button type="submit">Update</button>
                <button type="button" @click="resetForm">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import { fetchUsers, updateUser, deleteUser, currentUser } from '@/models/users';

export default {
    name: 'AdminPanel',
    data() {
        return {
            users: [],
            userForm: {
                id: null,
                username: '',
                email: '',
                is_admin: false
            },
            isEditing: false,
            isAdmin: false,
            loading: true
        };
    },
    computed: {
        currentUser() {
            return currentUser.value;
        }
    },
    methods: {
        async fetchUsersList() {
            if (!this.currentUser || !this.currentUser.is_admin) {
                this.isAdmin = false;
                this.loading = false;
                return;
            }
            try {
                // Always send x-user-id header for admin routes
                const userId = this.currentUser.id;
                this.users = await fetchUsers(userId);
            } catch (error) {
                if (error.message.includes('401') || error.message.includes('403')) {
                    this.isAdmin = false;
                } else {
                    alert('Failed to fetch users: ' + error.message);
                }
            } finally {
                this.loading = false;
            }
        },
        async updateUser() {
            try {
                await updateUser(this.userForm.id, {
                    username: this.userForm.username,
                    email: this.userForm.email,
                    is_admin: this.userForm.is_admin
                });
                this.isEditing = false;
                this.fetchUsersList();
            } catch (error) {
                alert('Failed to update user: ' + error.message);
            }
        },
        editUser(user) {
            this.userForm = { ...user };
            this.isEditing = true;
        },
        async deleteUser(userId) {
            if (!confirm('Are you sure you want to delete this user?')) return;
            try {
                await deleteUser(userId);
                this.fetchUsersList();
            } catch (error) {
                alert('Failed to delete user: ' + error.message);
            }
        },
        resetForm() {
            this.userForm = { id: null, username: '', email: '', is_admin: false };
            this.isEditing = false;
        }
    },
    async mounted() {
        this.loading = true;
        await this.fetchUsersList();
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
