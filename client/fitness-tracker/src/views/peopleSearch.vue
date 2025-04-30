<template>
    <div>
        <h1>Search People</h1>
        <input v-model="searchQuery" placeholder="Enter user ID..." />
        <button @click="searchWorkouts">Search</button>
        <div v-if="searchResults.length">
            <h2>Workouts for User: {{ searchQuery }}:</h2>
            <ul>
                <li v-for="workout in searchResults" :key="workout.id">
                    <h3>{{ workout.workout || 'No workout name provided' }}</h3>
                    <p><strong>Duration:</strong> {{ workout.duration || 'N/A' }} minutes</p>
                    <p><strong>Distance:</strong> {{ workout.distance || 'N/A' }} km</p>
                    <p><em>{{ formatDate(workout.date) || 'No date available' }}</em></p>
                </li>
            </ul>
        </div>
        <div v-else-if="searchQuery">
            <p>No workouts found for user: {{ searchQuery }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PeopleSearch',
    data() {
        return {
            searchQuery: '',
            searchResults: []
        };
    },
    methods: {
        async searchWorkouts() {
            if (!this.searchQuery.trim()) {
                alert('Please enter a user ID to search.');
                return;
            }
            try {
                const response = await axios.get(`https://fitness-tracker-shxf.onrender.com/api/workouts?user_id=${this.searchQuery}`);
                this.searchResults = response.data;

                if (!this.searchResults.length) {
                    alert(`No workouts found for user ID: ${this.searchQuery}`);
                }
            } catch (error) {
                alert('Error fetching workouts: ' + (error.response?.data?.error || error.message));
            }
        },
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    }
};
</script>

<style scoped>
h1 {
    color: #2c3e50;
    font-size: 2em;
    margin-bottom: 20px;
}

input {
    padding: 10px;
    font-size: 1em;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #42b983;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #38a169;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

h3 {
    margin: 0;
    font-size: 1.2em;
}

p {
    margin: 5px 0 0;
    color: #666;
}
</style>