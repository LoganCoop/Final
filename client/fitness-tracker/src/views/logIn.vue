<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" v-model="username" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { users } from '@/models/users'; 

export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        login() {
            let user = null;
            for (let i = 0; i < users.length; i++) {
            if (users[i].username === this.username && users[i].password === this.password) {
                user = users[i];
                break;
            }
            }

            if (user) {
            alert('Login successful');
            this.$router.push('/');
            } else {
            alert('Incorrect username or password');
            }
        }
    }
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>