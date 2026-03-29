<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const lists = ref([]);
const newTitle = ref("");
const newDescription = ref("");

const fetchLists = async () => {
  const res = await api.get("/todoitems/");
  lists.value = res.data.results;
};

const createList = async () => {
  await api.post("/todoitems/", {
    title: newTitle.value,
    description: newDescription.value
  });
  newTitle.value = "";
  newDescription.value = "";
  fetchLists();
};

const deleteList = async (id) => {
  await api.delete(`/todoitems/${id}/`);
  fetchLists();
};

const completeList = async (id) => {
  await api.post(`/todoitems/${id}/complete/`, {
    completed: true
  });
  fetchLists();
};

onMounted(fetchLists);
</script>

<template>
  <div>
    <h2>Todo Lists</h2>

    <input v-model="newTitle" placeholder="New list" />
    <input v-model="newDescription" placeholder="Description" />
    <button @click="createList">Create</button>

    <ul>
      <li v-for="list in lists" :key="list.id">
        {{ list.title }}
        <button @click="completeList(list.id)">Complete</button>
        <button @click="deleteList(list.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>