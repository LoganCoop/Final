<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username:</label>
                <input id="username" type="text" v-model="username" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <div v-if="showSuccess" class="login-success-popup">
            <div class="popup-content">
                <span class="success-icon">✔️</span>
                <span>Login successful!</span>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/models/users';

export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            showSuccess: false
        };
    },
    methods: {
        async login() {
            try {
                await login(this.username, this.password);
                this.showSuccess = true;
                setTimeout(() => {
                    this.showSuccess = false;
                    this.$router.push('/my-activity');
                }, 1200);
            } catch (error) {
                alert(`Error logging in: ${error.message}`);
            }
        }
    }
}
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

.login-success-popup {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e6ffed;
    border: 2px solid #38c172;
    color: #155724;
    padding: 24px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    z-index: 1000;
    display: flex;
    align-items: center;
    font-size: 1.3em;
    animation: fadeIn 0.3s;
}

.popup-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.success-icon {
    font-size: 2em;
    color: #38c172;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -60%); }
    to { opacity: 1; transform: translate(-50%, -50%); }
}
</style>