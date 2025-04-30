<template>
    <div class="stats">
        <div v-if="isLoggedIn">
            <h2>Your Workout Stats</h2>
            <div class="stats-grid">
                <div v-for="stat in stats" :key="stat.id" class="stat-card">
                    <div class="stat-header">
                        <span class="stat-date">{{ formatDate(stat.date) }}</span>
                        <span class="stat-title">{{ stat.workout }}</span>
                    </div>
                    <div class="stat-body">
                        <div class="stat-row">
                            <span class="stat-label">Duration:</span>
                            <span class="stat-value">{{ stat.duration }} min</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Distance:</span>
                            <span class="stat-value">{{ stat.distance }} km</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="stats.length === 0" class="no-stats">No stats found.</div>
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
    methods: {
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    },
    async mounted() {
        if (this.isLoggedIn) {
            try {
                const response = await axios.get('https://fitness-tracker-shxf.onrender.com/api/workouts');
                // Remove calorie stat, use only fields from u_workouts: id, workout, duration, distance, date
                this.stats = (response.data || []).map(w => ({
                    id: w.id,
                    workout: w.workout,
                    duration: w.duration,
                    distance: w.distance,
                    date: w.date
                }));
            } catch (error) {
                // Optionally show error
            }
        }
    }
}
</script>

<style scoped>
.stats {
    padding: 32px 10vw 32px 10vw;
    background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
    min-height: 100vh;
}

.stats h1, .stats h2 {
    font-size: 2.2em;
    margin-bottom: 32px;
    color: #2d3a4b;
    font-weight: 700;
    letter-spacing: 1px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 28px;
    margin-bottom: 32px;
}

.stat-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(44, 62, 80, 0.08);
    padding: 28px 24px 20px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.15s;
    border: 1px solid #e3e3e3;
}
.stat-card:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.13);
}
.stat-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
}
.stat-date {
    font-size: 0.98em;
    color: #7b8ca7;
    font-weight: 500;
}
.stat-title {
    font-size: 1.18em;
    color: #2d3a4b;
    font-weight: 600;
}
.stat-body {
    width: 100%;
}
.stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}
.stat-label {
    color: #7b8ca7;
    font-weight: 500;
}
.stat-value {
    color: #2d3a4b;
    font-weight: 600;
}
.no-stats {
    color: #888;
    font-size: 1.1em;
    margin-top: 32px;
}
</style>
