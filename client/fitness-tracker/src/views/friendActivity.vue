<template>
    <div class="friend-activity">
        <h1>Friend Activity</h1>
        <ul>
            <li v-for="activity in friendActivities" :key="activity.id" class="activity-card">
                <div class="activity-header">
                    <p><strong>{{ activity.user_id }}</strong></p>
                    <p><em>{{ formatDate(activity.created_at) }}</em></p>
                </div>
                <div class="activity-body">
                    <p><strong>Workout:</strong> {{ activity.workout }}</p>
                    <p><strong>Duration:</strong> {{ activity.duration }} minutes</p>
                    <p><strong>Distance:</strong> {{ activity.distance }} km</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FriendActivity',
    data() {
        return {
            friendActivities: [],
            newActivity: {
                user: '',
                workout: '',
                duration: '',
                distance: '',
                date: ''
            }
        };
    },
    methods: {
        async fetchActivities() {
            try {
                const response = await axios.get('https://fitness-tracker-shxf.onrender.com/api/workouts');
                this.friendActivities = response.data;
            } catch (error) {
                console.error('Error fetching activities:', error); // Added error handling
            }
        },
        async addActivity() {
            try {
                const response = await axios.post('https://fitness-tracker-shxf.onrender.com/api/workouts', this.newActivity);
                this.friendActivities.push(response.data);
                this.newActivity = { user: '', workout: '', duration: '', distance: '', date: '' };
            } catch (error) {
                console.error('Error adding activity:', error); // Added error handling
            }
        },
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    },
    mounted() {
        this.fetchActivities();
    }
};
</script>

<style scoped>
.friend-activity {
    padding: 32px 10vw;
    background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
    min-height: 100vh;
}

.friend-activity h1 {
    font-size: 2.2em;
    margin-bottom: 32px;
    color: #2d3a4b;
    font-weight: 700;
    text-align: center;
}

.friend-activity ul {
    list-style-type: none;
    padding: 0;
    max-width: 800px;
    margin: 0 auto;
}

.activity-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(44, 62, 80, 0.08);
    padding: 20px;
    margin-bottom: 16px;
    border: 1px solid #e3e3e3;
    transition: transform 0.15s;
}

.activity-card:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.13);
}

.activity-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
}

.activity-header p {
    margin: 0;
    font-weight: 600;
    color: #2d3a4b;
}

.activity-body p {
    margin: 4px 0;
    color: #555;
}
</style>
