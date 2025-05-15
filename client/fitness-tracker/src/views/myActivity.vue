<template>
    <div>
        <h1>My Activity</h1>
        <div>
            <form @submit.prevent="addWorkout">
                <div>
                    <label for="workout">Workout:</label>
                    <v-autocomplete
                        v-model="workout"
                        :items="workoutSuggestions"
                        label="Workout"
                        required
                        :filter="(item, queryText) => item.toLowerCase().includes(queryText.toLowerCase())"
                        :allow-new="true"
                        clearable
                        placeholder="Enter or select a workout"
                        @update:model-value="onWorkoutInput"
                        v-model:search-input="workout"
                    ></v-autocomplete>
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
                        <div class="workout-actions">
                            <button @click="editWorkout(index)" class="button is-small is-info">Edit</button>
                            <button @click="deleteWorkout(index)" class="button is-small is-danger">Delete</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="!isLoggedIn" class="login-required-popup">
            <div class="popup-content">
                <span class="warning-icon">⚠️</span>
                <span>Please log in to add your workout stats.</span>
            </div>
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
            workouts: [],
            workoutSuggestions: [],
            editIndex: null,
        };
    },
    computed: {
        isLoggedIn() {
            return Boolean(localStorage.getItem('userToken'));
        },
        userId() {
            let userToken = localStorage.getItem('userToken');
            let userObj = {};
            try {
                userObj = JSON.parse(userToken);
            } catch (e) {
                userObj = {};
            }
            return userObj.id || null;
        },
    },
    methods: {
        async addWorkout() {
            if (this.editIndex !== null) {
                this.workouts[this.editIndex] = {
                    workout: this.workout,
                    duration: this.duration,
                    distance: this.distance,
                };
                this.editIndex = null;
            } else {
                if (this.isLoggedIn) {
                    let userToken = localStorage.getItem('userToken');
                    let userObj = {};
                    try {
                        userObj = JSON.parse(userToken);
                    } catch (e) {
                        userObj = {};
                    }
                    if (!userObj.username) {
                        alert('Username not found. Please log in again.');
                        return;
                    }
                    const workoutData = {
                        workout: this.workout,
                        duration: this.duration,
                        distance: this.distance,
                        user_id: userObj.username,
                    };
                    console.log('Adding workout:', this.workout);
                    console.log('Workout data being sent:', workoutData);
                    try {
                        const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/workouts', workoutData);
                        if (response.data && response.status === 201) {
                            this.workouts.push(response.data);
                            if (!this.workoutSuggestions.includes(this.workout)) {
                                this.workoutSuggestions.push(this.workout);
                            }
                        } else {
                            alert('Workout not created. Please try again.');
                        }
                        this.workout = '';
                        this.duration = '';
                        this.distance = '';
                    } catch (error) {
                        if (error.response && error.response.status === 404) {
                            alert('Workout API not found (404). Please check your backend deployment.');
                        } else {
                            alert('Error adding workout: ' + (error.response?.data?.error || error.message));
                        }
                    }
                } else {
                    alert('User is not logged in.');
                }
            }
            this.workout = '';
            this.duration = '';
            this.distance = '';
        },
        async fetchWorkoutSuggestions() {
            if (!this.isLoggedIn) {
                console.log('User is not logged in. Skipping fetchWorkoutSuggestions.');
                return;
            }
            let userToken = localStorage.getItem('userToken');
            let username = null;
            try {
                username = JSON.parse(userToken).username;
                console.log('Parsed username from token:', username);
            } catch (e) {
                console.error('Error parsing userToken:', e);
                username = null;
            }
            try {
                const response = await axios.get('https://fitness-tracker-shxf.onrender.com/api/workouts');
                console.log('API response for workouts:', response);
                this.workoutSuggestions = (response.data || [])
                    .filter((w) => w.user_id === username)
                    .map((w) => w.workout);
                console.log('Filtered workout suggestions:', this.workoutSuggestions);
            } catch (error) {
                console.error('Error fetching workout suggestions:', error);
                if (error.response && error.response.status === 404) {
                    alert('Workout API not found (404). Please check your backend deployment.');
                } else {
                    alert('Error fetching workout suggestions: ' + (error.response?.data?.error || error.message));
                }
            }
        },
        onWorkoutInput(newValue) {

            this.workout = newValue;
        },
    },
    mounted() {
        this.fetchWorkoutSuggestions();
    },
};
</script>

<style scoped>
.my-activity {
    padding: 32px 10vw 32px 10vw;
    background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
    min-height: 100vh;
}

.my-activity h1, .my-activity h2 {
    font-size: 2.2em;
    margin-bottom: 32px;
    color: #2d3a4b;
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
}

form {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(44, 62, 80, 0.08);
    padding: 28px 24px 20px 24px;
    margin-bottom: 32px;
    border: 1px solid #e3e3e3;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

form label {
    font-weight: 600;
    color: #2d3a4b;
    margin-bottom: 8px;
    display: block;
}

form input {
    margin-bottom: 16px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
    font-size: 1em;
}

form button {
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
    width: 100%;
    font-size: 1.1em;
}

form button:hover {
    background-color: #0056b3;
}

.workout-list {
    max-width: 800px;
    margin: 0 auto;
}

.workout-list ul {
    list-style-type: none;
    padding: 0;
}

.workout-list li {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(44, 62, 80, 0.08);
    padding: 20px;
    margin-bottom: 16px;
    border: 1px solid #e3e3e3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.15s;
}

.workout-list li:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.13);
}

.workout-content p {
    margin: 0;
    color: #2d3a4b;
    font-weight: 500;
}

.workout-list li span {
    font-size: 0.9em;
    color: #7b8ca7;
    font-weight: 500;
}

.login-required-popup {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff3cd;
    border: 2px solid #ffe066;
    color: #856404;
    padding: 24px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    z-index: 1000;
    display: flex;
    align-items: center;
    font-size: 1.3em;
    animation: fadeIn 0.3s;
}

.warning-icon {
    font-size: 2em;
    color: #ffc107;
    margin-right: 12px;
}

.workout-actions {
    display: flex;
    gap: 8px;
}
</style>
