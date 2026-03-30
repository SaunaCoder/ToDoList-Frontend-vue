import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import TodoLists from "../views/ToDoLists.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/", component: TodoLists }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (!auth.token && to.path !== "/login" && to.path !== "/register") {
    return next("/login");
  }

  next();
});

export default router;
