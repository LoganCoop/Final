/* eslint-disable */
<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!isAdmin">
        <h2>Access Denied</h2>
        <p>You must be an admin to view this page.</p>
    </div>
    <div v-else class="admin-view">
        <h1>Admin Panel</h1>

        <!-- Users Table -->
        <div class="user-list">
            <h2>Users</h2>
            <button @click="addUser">Add User</button>
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.username }} <span v-if="user.is_admin">(admin)</span>
                    <button @click="editUser(user)">Edit</button>
                    <button @click="deleteUser(user.id)">Delete</button>
                </li>
            </ul>
        </div>

        <!-- Workouts Table -->
        <div class="workout-list">
            <h2>Workouts</h2>
            <button @click="addWorkout">Add Workout</button>
            <ul>
                <li v-for="workout in workouts" :key="workout.id">
                    {{ workout.workout }} - {{ workout.duration }} min - {{ workout.distance }} km
                    <button @click="editWorkout(workout)">Edit</button>
                    <button @click="deleteWorkout(workout.id)">Delete</button>
                </li>
            </ul>
        </div>

        <!-- Edit User Form -->
        <div class="user-edit" v-if="isEditingUser">
            <h2>Edit User</h2>
            <form @submit.prevent="updateUser">
                <input v-model="userForm.username" placeholder="Username" required />
                <label><input type="checkbox" v-model="userForm.is_admin" /> Admin</label>
                <button type="submit">Update</button>
                <button type="button" @click="resetUserForm">Cancel</button>
            </form>
        </div>

        <!-- Edit Workout Form -->
        <div class="workout-edit" v-if="isEditingWorkout">
            <h2>Edit Workout</h2>
            <form @submit.prevent="updateWorkout">
                <input v-model="workoutForm.workout" placeholder="Workout Name" required />
                <input v-model="workoutForm.duration" type="number" placeholder="Duration (min)" required />
                <input v-model="workoutForm.distance" type="number" placeholder="Distance (km)" required />
                <button type="submit">Update</button>
                <button type="button" @click="resetWorkoutForm">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import { fetchUsers, updateUser, deleteUser, addUser, fetchWorkouts, updateWorkout, deleteWorkout, addWorkout, currentUser } from '@/models/users';

export default {
    name: 'AdminPanel',
    data() {
        return {
            users: [],
            workouts: [],
            userForm: {
                id: null,
                username: '',
                is_admin: false
            },
            workoutForm: {
                id: null,
                workout: '',
                duration: '',
                distance: ''
            },
            isEditingUser: false,
            isEditingWorkout: false,
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
            try {
                this.users = await fetchUsers();
            } catch (error) {
                alert('Failed to fetch users: ' + error.message);
            }
        },
        async fetchWorkoutsList() {
            try {
                this.workouts = await fetchWorkouts();
            } catch (error) {
                alert('Failed to fetch workouts: ' + error.message);
            }
        },
        async updateUser() {
            try {
                console.log('Updating user with payload:', this.userForm); // Debugging log
                // Ensure the payload matches the server's expected format
                const payload = {
                    username: this.userForm.username,
                    is_admin: this.userForm.is_admin
                };
                await updateUser(this.userForm.id, payload);
                this.isEditingUser = false;
                this.fetchUsersList();
            } catch (error) {
                console.error('Error updating user:', error); // Debugging log
                alert('Failed to update user: ' + (error.response?.data?.error || error.message));
            }
        },
        async updateWorkout() {
            try {
                await updateWorkout(this.workoutForm.id, {
                    workout: this.workoutForm.workout,
                    duration: this.workoutForm.duration,
                    distance: this.workoutForm.distance
                });
                this.isEditingWorkout = false;
                this.fetchWorkoutsList();
            } catch (error) {
                alert('Failed to update workout: ' + error.message);
            }
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
        async deleteWorkout(workoutId) {
            if (!confirm('Are you sure you want to delete this workout?')) return;
            try {
                await deleteWorkout(workoutId);
                this.fetchWorkoutsList();
            } catch (error) {
                alert('Failed to delete workout: ' + error.message);
            }
        },
        async addUser() {
            try {
                const newUser = { username: 'New User', is_admin: false };
                await addUser(newUser);
                this.fetchUsersList();
            } catch (error) {
                alert('Failed to add user: ' + error.message);
            }
        },
        async addWorkout() {
            try {
                const newWorkout = { workout: 'New Workout', duration: 30, distance: 5 };
                await addWorkout(newWorkout);
                this.fetchWorkoutsList();
            } catch (error) {
                alert('Failed to add workout: ' + error.message);
            }
        },
        editUser(user) {
            console.log('Editing user:', user); // Debugging log
            this.userForm = { ...user };
            this.isEditingUser = true;
        },
        editWorkout(workout) {
            this.workoutForm = { ...workout };
            this.isEditingWorkout = true;
        },
        resetUserForm() {
            this.userForm = { id: null, username: '', is_admin: false };
            this.isEditingUser = false;
        },
        resetWorkoutForm() {
            this.workoutForm = { id: null, workout: '', duration: '', distance: '' };
            this.isEditingWorkout = false;
        }
    },
    async mounted() {
        this.loading = true;
        if (this.currentUser && this.currentUser.is_admin) {
            this.isAdmin = true;
            await this.fetchUsersList();
            await this.fetchWorkoutsList();
        } else {
            this.isAdmin = false;
        }
        this.loading = false;
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

.user-list, .user-add, .user-edit, .workout-list, .workout-add, .workout-edit {
    margin-bottom: 30px;
}

.user-list ul, .workout-list ul {
    list-style: none;
    padding: 0;
}

.user-list li, .workout-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s;
}

.user-list li:hover, .workout-list li:hover {
    background-color: #f1f1f1;
}

.user-list button, .workout-list button {
    margin-left: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    transition: background-color 0.3s;
}

.user-list button:hover, .workout-list button:hover {
    background-color: #0056b3;
}

.user-add, .user-edit, .workout-add, .workout-edit {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-add form, .user-edit form, .workout-add form, .workout-edit form {
    display: flex;
    flex-direction: column;
}

.user-add input, .user-edit input, .workout-add input, .workout-edit input {
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

.user-add button, .user-edit button, .workout-add button, .workout-edit button {
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.user-add button:hover, .user-edit button:hover, .workout-add button:hover, .workout-edit button:hover {
    background-color: #218838;
}
</style>
