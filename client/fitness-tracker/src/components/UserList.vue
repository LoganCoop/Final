<script setup lang="ts">
import { refUsers } from '@/models/users';

const users = refUsers();
</script>

<template>
    <div class="user-list">
        <h2 class="title is-4">
            User List
        </h2>
        <ul>
            <li v-for="user in users" :key="user.username">
                {{ user.username }} - {{ user.password }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.user-list {
    margin: 1rem;
}
</style>