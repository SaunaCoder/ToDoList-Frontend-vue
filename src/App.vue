<script setup>
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

if (!auth.isAuthenticated && !router.currentRoute.value.path === "/register") {
  router.push("/login");
}
</script>

<template>
    <router-view />
</template>