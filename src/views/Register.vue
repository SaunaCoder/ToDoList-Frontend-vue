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
  <div>
    <h2>Register</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="firstName" placeholder="First Name" />
    <input v-model="lastName" placeholder="Last Name" />
    <input v-model="password" type="password" placeholder="Password" />
    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Confirm Password"
    />

    <button @click="submit">Register</button>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>