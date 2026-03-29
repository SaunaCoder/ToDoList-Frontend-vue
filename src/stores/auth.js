import { defineStore } from "pinia";
import api from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    refresh: localStorage.getItem("refresh") || null
  }),

  actions: {
    async login(data) {
      const res = await api.post("/account/token/", data);
      this.token = res.data.access;
      this.refresh = res.data.refresh;

      localStorage.setItem("token", this.token);
      localStorage.setItem("refresh", this.refresh);
    },

    async register(data) {
      await api.post("/account/register/", data);
    },

    logout() {
      this.token = null;
      this.refresh = null;
      localStorage.clear();
    }
  }
});
