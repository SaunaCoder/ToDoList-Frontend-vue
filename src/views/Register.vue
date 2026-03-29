<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const confirmPassword = ref("");

const auth = useAuthStore();
const router = useRouter();

const error = ref("");

const submit = async () => {
  error.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  try {
    await auth.register({
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value,
      password: password.value
    });

    // после регистрации сразу кидаем на логин
    router.push("/login");
  } catch (e) {
    error.value = "Registration failed";
  }
};
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
        <h3 class="text-center mb-4">Register</h3>
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
              v-model="firstName"
              type="text"
              class="form-control"
              placeholder="Enter first name"
              required
            />
          </div>
          <div class="mb-3 text-start">
            <input 
              v-model="lastName"
              type="text"
              class="form-control"
              placeholder="Enter last name"
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
          <div class="mb-3 text-start">
            <input 
              v-model="confirmPassword"
              type="password"
              class="form-control"
              placeholder="Confirm password"
              required
            />
          </div>
          <button @click="submit" class="mb-3 btn btn-primary w-100">
            Register
          </button>
          <p v-if="error" style="color: red">{{ error }}</p>
          <a href="" @click="$router.push('/login')">Already have an account? Login</a>
        </form>
      </div>
    </div>
  </div>
</template>