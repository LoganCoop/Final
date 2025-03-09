<template>
    <div class="about">
        <h1>About Us</h1>
        <p>Welcome to my Fitness Tracker application!</p>
        <p>The mission of this vue app is to help you stay fit and healthy by tracking your workouts and progress.</p>
        <p>I hope you enjoy using my app and achieve all your fitness goals!</p>
    </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about {
    padding: 20px;
    text-align: center;
}

.about h1 {
    font-size: 2em;
    margin-bottom: 20px;
}

.about p {
    font-size: 1.2em;
    margin-bottom: 10px;
}
</style>
