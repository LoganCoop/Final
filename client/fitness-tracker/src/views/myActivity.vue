<template>
    <div>
        <h1>My Activity</h1>
        <div v-if="isLoggedIn">
            <form @submit.prevent="addWorkout">
                <div>
                    <label for="workout">Workout:</label>
                    <input type="text" v-model="workout" id="workout" required />
                </div>
                <div>
                    <label for="duration">Duration (minutes):</label>
                    <input type="number" v-model="duration" id="duration" required />
                </div>
                <div>
                    <label for="distance">Distance (km):</label>
                    <input type="number" v-model="distance" id="distance" required />
                </div>
                <button type="submit">Add Workout</button>
            </form>
            <div class="workout-list">
                <h2>Your Workouts</h2>
                <ul>
                    <li v-for="(workout, index) in workouts" :key="index">
                        <div class="workout-content">
                            <p><strong>{{ workout.workout }}</strong></p>
                            <p>{{ workout.duration }} minutes</p>
                            <p>{{ workout.distance }} km</p>
                        </div>
                        <span>{{ new Date().toLocaleDateString() }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <p>Please log in to add your workout stats.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { currentUser } from '@/models/users';

export default {
    name: 'MyActivity',
    data() {
        return {
            workout: '',
            duration: '',
            distance: '',
            workouts: []
        };
    },
    computed: {
        isLoggedIn() {
            return !!currentUser.value && !!currentUser.value.id;
        },
        userId() {
            return currentUser.value?.id;
        }
    },
    methods: {
        async addWorkout() {
            if (this.isLoggedIn) {
                const workoutData = {
                    workout: this.workout,
                    duration: this.duration,
                    distance: this.distance,
                    user_id: this.userId
                };
                try {
                    const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/workouts', workoutData);
                    this.workouts.push(response.data);
                    this.workout = '';
                    this.duration = '';
                    this.distance = '';
                } catch (error) {
                    alert('Error adding workout: ' + (error.response?.data?.error || error.message));
                }
            } else {
                alert('User is not logged in.');
            }
        },
        async fetchWorkouts() {
            if (!this.isLoggedIn) return;
            try {
                const response = await axios.get('https://fitness-tracker-shxf.onrender.com/api/workouts', {
                    params: { user_id: this.userId }
                });
                this.workouts = response.data;
            } catch (error) {
                alert('Error fetching workouts: ' + (error.response?.data?.error || error.message));
            }
        }
    },
    mounted() {
        if (this.isLoggedIn) {
            this.fetchWorkouts();
        }
    },
    watch: {
        userId(newVal, oldVal) {
            if (newVal) this.fetchWorkouts();
        }
    }
};
</script>

<style scoped>
div {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

input {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

p {
    text-align: center;
    color: #666;
}

.workout-list {
    margin-top: 20px;
}

.workout-list h2 {
    text-align: center;
    color: #333;
}

.workout-list ul {
    list-style-type: none;
    padding: 0;
}

.workout-list li {
    background-color: #f1f1f1;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
}

.workout-content {
    display: flex;
    flex-direction: column;
}

.workout-list li span {
    font-size: 12px;
    color: #999;
}
</style>
