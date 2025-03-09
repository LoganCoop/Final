<template>
    <div v-if="isLoggedIn">
        <h1>People Search</h1>
        <input v-model="searchQuery" placeholder="Search for users..." />
        <button @click="searchUsers">Search</button>
        <div v-if="searchResults.length">
            <h2>Search Results:</h2>
            <ul>
                <li v-for="user in searchResults" :key="user.id">
                    <h3>{{ user.name }}</h3>
                    <p>{{ user.stats }}</p>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No results found.</p>
        </div>
    </div>
    <div v-else>
        <p>Please log in to access the people search.</p>
    </div>
</template>

<script>
export default {
    name: 'PeopleSearch',
    data() {
        return {
            isLoggedIn: false, 
            searchQuery: '',
            searchResults: []
        };
    },
    methods: {
        searchUsers() {
            
            const allUsers = [
                { id: 1, name: 'John Doe', stats: 'Stats for John' },
                { id: 2, name: 'Jane Smith', stats: 'Stats for Jane' }
            ];
            this.searchResults = allUsers.filter(user =>
                user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    created() {
        
        this.isLoggedIn = true; 
    }
};
</script>

<style scoped>
h1 {
    color: #2c3e50;
    font-size: 2em;
    margin-bottom: 20px;
}

input {
    padding: 10px;
    font-size: 1em;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #42b983;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #38a169;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

h3 {
    margin: 0;
    font-size: 1.2em;
}

p {
    margin: 5px 0 0;
    color: #666;
}
</style>