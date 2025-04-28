<script setup lang="ts">
import { ref, computed } from 'vue'
import { currentUser } from '@/models/users'

const isActive = ref(false)
const username = computed(() => currentUser.value?.username)
</script>

<template>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="vuejs.org">
                    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="30" />
                </a>

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
                            <span v-if="username" class="user-info" style="margin-left: 1em; font-weight: bold; color: #fff;">
                                {{ username }}
                            </span>
                            <div class="dropdown is-hoverable">
                                <div class="dropdown-trigger">
                                    <button class="button is-light" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span>Log in</span>
                                        <span class="icon is-small">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <RouterLink to="/login" class="dropdown-item">
                                            Log in
                                        </RouterLink>
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
