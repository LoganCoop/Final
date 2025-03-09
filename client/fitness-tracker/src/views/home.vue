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
      
      <div class="stat-card">
        <h2>Calories Burnt</h2>
        <p class="stat-value">{{ caloriesBurnt }} kcal</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
  return {
    weeklyDistance: 0,
    timeExercising: 0,
    caloriesBurnt: 0,
    userId: null 
  }
  },
  methods: {
  async fetchUserFitnessData() {
    try {

    const data = {
      weeklyDistance: 12.5,
      timeExercising: 4.2,
      caloriesBurnt: 1450
    };
    
    this.weeklyDistance = data.weeklyDistance;
    this.timeExercising = data.timeExercising;
    this.caloriesBurnt = data.caloriesBurnt;
    } catch (error) {
    console.error('Error fetching fitness data:', error);
    }
  }
  },
  mounted() {
  this.fetchUserFitnessData();
  }
}
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
