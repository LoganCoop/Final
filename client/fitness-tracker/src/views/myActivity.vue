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
            return !!localStorage.getItem('userToken');
        }
    },
    methods: {
        async addWorkout() {
            const userToken = localStorage.getItem('userToken');
            if (userToken) {
                const workoutData = {
                    workout: this.workout,
                    duration: this.duration,
                    distance: this.distance,
                    userToken: userToken
                };
                try {
                    const response = await axios.post('http://localhost:3000/api/workouts', workoutData);
                    this.workouts.push(response.data);
                    // Reset form
                    this.workout = '';
                    this.duration = '';
                    this.distance = '';
                    console.log('Workout added:', response.data);
                } catch (error) {
                    console.error('Error adding workout:', error);
                }
            } else {
                console.log('User is not logged in.');
            }
        },
        async fetchWorkouts() {
            try {
                const response = await axios.get('http://localhost:3000/api/workouts');
                this.workouts = response.data;
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        }
    },
    mounted() {
        if (this.isLoggedIn) {
            this.fetchWorkouts();
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
