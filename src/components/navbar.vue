<template>
  <div class="navbar bg-green-200">
    <div class="flex-1">
      <router-link to="/Profile" class="btn btn-ghost normal-case text-3xl text-green-500">Welcome to Elizabeth hospital!</router-link>
    
    </div>
    <div v-if="getStatus">
      <div class="flex-none gap-2">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="imageUrls" />
            </div>
          </label>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li @click="profile"><a>Profile</a></li>
            <li @click="logout"><a>Logout</a></li>
          </ul>
        </div>
      </div>
      <span class="mx-1">{{username}}</span>
    </div>
    <div v-else>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/register">Sign up</router-link>
          </li>
          <li>
            <router-link to="/login">Sign in</router-link>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import Nprogress from 'nprogress';
import AuthService from '@/service/authService.js';
const store = useStore();
const router = useRouter();
const getStatus = computed(() => store.getters.getStatus);
const username = computed(() => store.getters.getCurrentUser == null ? '' : store.getters.getCurrentUser.username);
const imageUrls = computed(() => store.getters.getCurrentUser == null ? 'https://placeimg.com/80/80/people' : store.getters.getCurrentUser.imageUrls);

const logout = () => {
  Nprogress.start();
  AuthService.logout();
  Nprogress.done();
  router.push({ name: 'Home' });
}

const profile = () => {
  router.push({ name: 'Profile' })
}

</script>