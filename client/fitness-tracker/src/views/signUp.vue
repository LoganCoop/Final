<template>
    <div class="sign-up">
        <h1>Sign Up</h1>
        <form @submit.prevent="signUp">
            <div>
                <label for="username">Username:</label>
                <input type="text" v-model="username" id="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" id="password" required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>

<script>
import { addToUsers } from '@/models/users.ts';

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        signUp() {
            addToUsers({ username: this.username, password: this.password });
            alert('User created successfully');
            this.$router.push('/login');
            
        }
    }
};
</script>

<style scoped>
.sign-up {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.sign-up h1 {
    text-align: center;
}
.sign-up form div {
    margin-bottom: 15px;
}
.sign-up form label {
    display: block;
    margin-bottom: 5px;
}
.sign-up form input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
.sign-up form button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.sign-up form button:hover {
    background-color: #218838;
}
</style>