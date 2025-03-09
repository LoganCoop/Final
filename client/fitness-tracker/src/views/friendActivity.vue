<template>
    <div class="friend-activity">
        <h1>Friend Activity</h1>
        <ul>
            <li v-for="activity in friendActivities" :key="activity.id">
                <p><strong>{{ activity.user }}</strong> completed a workout:</p>
                <p>{{ activity.workout }}</p>
                <p><em>{{ activity.date }}</em></p>
            </li>
        </ul>
        <div class="add-activity">
            <h2>Add Your Activity</h2>
            <form @submit.prevent="addActivity">
                <input v-model="newActivity.user" type="text" placeholder="Your Name" required>
                <input v-model="newActivity.workout" type="text" placeholder="Workout Description" required>
                <input v-model="newActivity.date" type="date" required>
                <button type="submit">Add Activity</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FriendActivity',
    data() {
        return {
            friendActivities: [
                { id: 1, user: 'John Doe', workout: '5km run', date: '2023-10-01' },
                { id: 2, user: 'Jane Smith', workout: 'Yoga session', date: '2023-10-02' },
                // Add more activities here
            ],
            newActivity: {
                user: '',
                workout: '',
                date: ''
            }
        };
    },
    methods: {
        getUserToken() {
            // Replace this with the actual logic to retrieve the user token
            return 'userToken';
        },
        addActivity() {
            const newId = this.friendActivities.length + 1;
            this.friendActivities.push({ id: newId, ...this.newActivity });
            localStorage.setItem(this.getUserToken(), JSON.stringify(this.friendActivities));
            this.newActivity = { user: '', workout: '', date: '' };
        }
    }
};
</script>

<style scoped>
.friend-activity {
    padding: 20px;
    background-color: #f0f8ff;
    border-radius: 10px;
}

.friend-activity h1 {
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

.friend-activity ul {
    list-style-type: none;
    padding: 0;
}

.friend-activity li {
    background: #ffffff;
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.friend-activity p {
    margin: 5px 0;
    color: #555;
}

.friend-activity p strong {
    color: #000;
}

.friend-activity p em {
    color: #888;
}

.add-activity {
    margin-top: 30px;
}

.add-activity h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
    text-align: center;
}

.add-activity form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.add-activity input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
}

.add-activity button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.add-activity button:hover {
    background-color: #0056b3;
}
</style>
