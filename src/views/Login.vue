<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  await auth.login({
    email: email.value,
    password: password.value
  });
  router.push("/");
};
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
        <h3 class="text-center mb-4">Login</h3>
        <form @submit.prevent="submit">
          <div class="mb-3 text-start">
            <input 
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter email"
              required
            />
          </div>
          <div class="mb-3 text-start">
            <input 
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Log In
          </button>
          <a href="" @click="$router.push('/register')">Don't have an account? Register</a>
        </form>
      </div>
    </div>
  </div>
</template>