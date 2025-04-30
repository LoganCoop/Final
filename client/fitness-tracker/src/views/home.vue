<template>
  <div class="home">
    <h1>Welcome to the Fitness Tracker</h1>
    <p>Track your fitness goals and progress.</p>
    
    <div class="stats-container">
      <div class="stat-card">
        <h2>Weekly Distance</h2>
        <p class="stat-value">{{ weeklyDistance }} km</p>
      </div>
      
      <div class="stat-card">
        <h2>Time Exercising</h2>
        <p class="stat-value">{{ timeExercising }} hours</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      weeklyDistance: 0,
      timeExercising: 0,
      isLoggedIn: false,
      userId: null
    };
  },
  async mounted() {
    // Check login
    let userObj = {};
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      try {
        userObj = JSON.parse(userToken);
        this.isLoggedIn = true;
        this.userId = userObj.id;
      } catch (e) {
        this.isLoggedIn = false;
      }
    }

    if (this.isLoggedIn) {
      try {
        const response = await axios.get('https://fitness-tracker-shxf.onrender.com/api/workouts');
        const workouts = response.data || [];
        // Get current week range
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        startOfWeek.setHours(0,0,0,0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        // Filter for this user and this week
        const userWorkouts = workouts.filter(w => {
          // If userId is present in workout, filter by it; else, show all
          if (w.user_id && this.userId) {
            if (w.user_id !== this.userId) return false;
          }
          // Parse date
          const workoutDate = w.date ? new Date(w.date) : null;
          if (!workoutDate) return false;
          return workoutDate >= startOfWeek && workoutDate < endOfWeek;
        });

        // Calculate totals
        this.weeklyDistance = userWorkouts.reduce((sum, w) => sum + (Number(w.distance) || 0), 0);
        const totalMinutes = userWorkouts.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);
        this.timeExercising = (totalMinutes / 60).toFixed(1);
      } catch (e) {
        this.weeklyDistance = 0;
        this.timeExercising = 0;
      }
    } else {
      this.weeklyDistance = 0;
      this.timeExercising = 0;
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5em;
  color: #42b983;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  color: #555;
  line-height: 1.6;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
}

.stat-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  margin: 15px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h2 {
  color: #42b983;
  font-size: 1.3em;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
}
</style>
