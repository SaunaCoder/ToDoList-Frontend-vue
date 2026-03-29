<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push("/login");
};

const lists = ref([]);
const selectedList = ref(null);
const newTitle = ref("");
const newDescription = ref("");

const fetchLists = async () => {
  const res = await api.get("/todoitems/");
  lists.value = res.data.results;
};

const createList = async () => {
  if (!newTitle.value) return;
  await api.post("/todoitems/", {
    title: newTitle.value,
    description: newDescription.value
  });
  newTitle.value = "";
  newDescription.value = "";
  fetchLists();
};

const completeList = async (id) => {
  await api.post(`/todoitems/${id}/complete/`, {
    completed: true
  });
  fetchLists();
};

const deleteList = async (id) => {
  await api.delete(`/todoitems/${id}/`);
  if (selectedList.value?.id === id) selectedList.value = null;
  fetchLists();
};

const selectList = (list) => {
  selectedList.value = list;
};

onMounted(fetchLists);
</script>

<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container d-flex justify-content-between">
        <div></div>
        <span class="navbar-brand mx-auto">ToDo List</span>
        <button class="btn btn-outline-light" @click="logout">
          Log out
        </button>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="row">

        <div class="col-md-5">
          <div 
            v-for="list in lists" 
            :key="list.id"
            class="card mb-3 cursor-pointer"
            @click="selectList(list)"
            :class="{ 'completed': list.completed }"
          >
            <div class="card-body d-flex justify-content-between align-items-center">
              <h5 :class="{ 'text-decoration-line-through': list.completed }">{{ list.title }}</h5>
              <div>
                <button 
                  class="btn btn-success btn-sm me-2" 
                  @click.stop="completeList(list.id)"
                  :disabled="list.completed"
                >
                  ✓
                </button>
                <button class="btn btn-danger btn-sm" @click.stop="deleteList(list.id)">✕</button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-7">
          <div v-if="selectedList" class="card shadow p-3">
            <h4>{{ selectedList.title }}</h4>
            <p class="text-muted mt-3">
              {{ selectedList.description }}
            </p>
          </div>
        </div>

      </div>
    </div>

    <button 
      class="btn btn-primary rounded-circle shadow"
      style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px;"
      data-bs-toggle="modal"
      data-bs-target="#createModal"
    >
      +
    </button>

    <div class="modal fade" id="createModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">New Note</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <input 
              v-model="newTitle"
              class="form-control mb-3"
              placeholder="Title"
            />
            <textarea 
              v-model="newDescription"
              class="form-control"
              placeholder="Description"
            ></textarea>
          </div>

          <div class="modal-footer">
            <button 
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button 
              class="btn btn-primary"
              @click="createList"
              data-bs-dismiss="modal"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.completed {
  opacity: 0.5; /* Затухание */
  transition: opacity 0.3s ease;
}

.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
