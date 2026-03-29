<script setup>
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<template>
  <div>
    <nav>
      <button v-if="!auth.token" @click="$router.push('/login')">
        Login
      </button>

      <button v-if="!auth.token" @click="$router.push('/register')">
        Register
      </button>

      <button v-if="auth.token" @click="$router.push('/')">
        Todo Lists
      </button>

      <button v-if="auth.token" @click="logout">
        Logout
      </button>
    </nav>

    <hr />

    <router-view />
  </div>
</template>