<script setup lang="ts">
import { ref, computed } from 'vue'
import { currentUser, logout } from '@/models/users'

const isActive = ref(false)
const username = computed(() => currentUser.value?.username)

function handleLogout() {
  logout()
}
</script>

<template>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <span class="navbar-item">
                    <img alt="Fitness Tracker Logo" class="logo" src="@/assets/logo.png" width="30" />
                </span>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                   :class="{ 'is-active': isActive }" @click="isActive = !isActive">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': isActive }">
                <div class="navbar-start">
                    <RouterLink to="/" class="navbar-item">
                        <span class="icon">
                            <i class="fas fa-home"></i>
                        </span>
                        <span>Home</span>
                    </RouterLink>
                    <RouterLink to="/my-activity" class="navbar-item">
                        <span class="icon">
                            <i class="fas fa-running"></i>
                        </span>
                        <span>My Activity</span>
                    </RouterLink>
                    <RouterLink to="/stats" class="navbar-item">
                        <span class="icon">
                            <i class="fas fa-chart-bar"></i>
                        </span>
                        <span>Statistics</span>
                    </RouterLink>
                    <RouterLink to="/friend-activity" class="navbar-item">
                        <span class="icon">
                            <i class="fas fa-user-friends"></i>
                        </span>
                        <span>Friends Activity</span>
                    </RouterLink>
                    <RouterLink to="/people-search" class="navbar-item">
                        <span class="icon">
                            <i class="fas fa-search"></i>
                        </span>
                        <span>People Search</span>
                    </RouterLink>
                    <RouterLink to="/admin" class="navbar-item">
                        <span class="icon">
                            <i class="fas fa-user-shield"></i>
                        </span>
                        <span>Admin</span>
                    </RouterLink>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <RouterLink to="/sign-up" class="button is-primary">
                                <strong>Sign up</strong>
                            </RouterLink>
                            <!-- Remove username and logout from here -->
                            <div class="dropdown is-hoverable">
                                <div class="dropdown-trigger">
                                    <button class="button is-light" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span v-if="username"><i class="fas fa-user"></i> {{ username }}</span>
                                        <span v-else>Log in</span>
                                        <span class="icon is-small">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <RouterLink v-if="!username" to="/login" class="dropdown-item">
                                            Log in
                                        </RouterLink>
                                        <div v-else class="dropdown-item" style="display: flex; align-items: center;">
                                            <i class="fas fa-user" style="margin-right: 0.5em;"></i> {{ username }}
                                        </div>
                                        <button v-if="username" class="dropdown-item button is-danger is-small" @click="handleLogout">
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
