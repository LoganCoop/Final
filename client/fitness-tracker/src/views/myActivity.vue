<template>
    <div>
        <h1>My Activity</h1>
        <div>
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
            workouts: []
        };
    },
    computed: {
        isLoggedIn() {
            // Only check for the presence of a userToken in localStorage
            return Boolean(localStorage.getItem('userToken'));
        },
        userId() {
            // Always parse userToken as JSON to get the id
            let userToken = localStorage.getItem('userToken');
            let userObj = {};
            try {
                userObj = JSON.parse(userToken);
            } catch (e) {
                userObj = {};
            }
            // Use id for user id
            return userObj.id || null;
        }
    },
    methods: {
        async addWorkout() {
            if (this.isLoggedIn) {
                // Always parse userToken as JSON to get the id
                let userToken = localStorage.getItem('userToken');
                let userObj = {};
                try {
                    userObj = JSON.parse(userToken);
                } catch (e) {
                    userObj = {};
                }
                // DEBUG: Show the parsed user token
                console.log('userObj', userObj);
                const workoutData = {
                    workout: this.workout,
                    duration: this.duration,
                    distance: this.distance,
                    user_id: userObj['user-id'] || userObj.user_id || userObj.id || this.userId
                };
                console.log('workoutData', workoutData); // DEBUG: See what is being sent
                if (!workoutData.user_id) {
                    alert('User ID is missing. Please log in again.');
                    return;
                }
                try {
                    const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/workouts', workoutData);
                    if (response.data && response.status === 201) {
                        this.workouts.push(response.data);
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
        },
        async fetchWorkouts() {
            if (!this.isLoggedIn) return;
            // Always parse userToken as JSON to get the id
            let userToken = localStorage.getItem('userToken');
            let userObj = {};
            try {
                userObj = JSON.parse(userToken);
            } catch (e) {
                userObj = {};
            }
            try {
                const response = await axios.get('https://fitness-tracker-shxf.onrender.com/api/workouts', {
                    params: { user_id: userObj.id || this.userId }
                });
                this.workouts = response.data;
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    alert('Workout API not found (404). Please check your backend deployment.');
                } else {
                    alert('Error fetching workouts: ' + (error.response?.data?.error || error.message));
                }
            }
        }
    },
    mounted() {
        // Always fetch workouts on mount if logged in
        this.$watch(
            () => currentUser.value && currentUser.value.id,
            (newVal) => {
                if (newVal) {
                    this.fetchWorkouts();
                } else {
                    this.workouts = [];
                }
            },
            { immediate: true }
        );
    },
    watch: {
        isLoggedIn(newVal, oldVal) {
            if (newVal) {
                this.fetchWorkouts();
            } else {
                this.workouts = [];
            }
        },
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
</style>
