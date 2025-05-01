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
import { fetchUsers, updateUser, deleteUser, fetchWorkouts, updateWorkout, deleteWorkout, currentUser } from '@/models/users';

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
                if (!this.userForm.id) {
                    console.error('Error: User ID is missing in userForm:', this.userForm); // Debugging log
                    alert('Error: User ID is missing. Cannot update this user.');
                    return;
                }

                const payload = JSON.parse(JSON.stringify({
                    username: this.userForm.username,
                    is_admin: this.userForm.is_admin,
                    updated_at: new Date().toISOString()
                })); // Ensure payload is a plain object

                console.log('Updating user with ID:', this.userForm.id); // Debugging log
                console.log('Payload:', payload); // Debugging log

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
        editUser(user) {
            console.log('Editing user:', user); // Debugging log
            if (!user.id) {
                console.error('User ID is missing:', user); // Debugging log
                alert('Error: User ID is missing. Cannot edit this user.');
                return;
            }
            this.userForm = { id: user.id, username: user.username, is_admin: user.is_admin };
            console.log('User form populated:', this.userForm); // Debugging log
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
    padding: 32px 10vw;
    background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
    min-height: 100vh;
}

.admin-view h1 {
    font-size: 2.5em;
    margin-bottom: 32px;
    color: #2d3a4b;
    font-weight: 700;
    text-align: center;
}

.user-list, .workout-list {
    margin-bottom: 40px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(44, 62, 80, 0.08);
    padding: 24px;
    border: 1px solid #e3e3e3;
}

.user-list h2, .workout-list h2 {
    font-size: 1.8em;
    margin-bottom: 20px;
    color: #2d3a4b;
    font-weight: 600;
}

.user-list ul, .workout-list ul {
    list-style-type: none;
    padding: 0;
}

.user-list li, .workout-list li {
    background: #f9f9f9;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.15s;
    border: 1px solid #ddd;
}

.user-list li:hover, .workout-list li:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.12);
}

button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #0056b3;
}

button.is-danger {
    background-color: #dc3545;
}

button.is-danger:hover {
    background-color: #a71d2a;
}

.user-edit, .workout-edit {
    margin-top: 40px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(44, 62, 80, 0.08);
    padding: 24px;
    border: 1px solid #e3e3e3;
}

.user-edit h2, .workout-edit h2 {
    font-size: 1.8em;
    margin-bottom: 20px;
    color: #2d3a4b;
    font-weight: 600;
}

form input {
    margin-bottom: 16px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
    font-size: 1em;
}

form label {
    font-weight: 600;
    color: #2d3a4b;
    margin-bottom: 8px;
    display: block;
}
</style>
