<template>
    <div class="stats">
        <div v-if="isLoggedIn">
            <h2>Previous Stats</h2>
            <ul class="stats-list">
                <li v-for="stat in stats" :key="stat.id" class="stats-item">
                    {{ stat.date }} - {{ stat.type }} - {{ stat.duration }} minutes - {{ stat.calories }} calories
                </li>
            </ul>
        </div>
        <div v-else>
            <h1>Please Log In</h1>
            <p>You need to log in or sign up to view your workout stats.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'StatsPage',
    data() {
        return {
            stats: []
        };
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem('userToken');
        }
    },
    async mounted() {
        if (this.isLoggedIn) {
            try {
                const response = await axios.get('/api/workouts');
                this.stats = response.data;
            } catch (error) {
                // Optionally show error
            }
        }
    }
}
</script>

<style scoped>
.stats {
    padding: 20px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats h1, .stats h2 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
}

.stats-list {
    list-style-type: none;
    padding: 0;
}

.stats-item {
    font-size: 1.2em;
    margin-bottom: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
