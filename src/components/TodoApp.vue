<template>
  <v-container>
    <h1>To-do List</h1>
    <v-container v-if="$store.state.editedTodo === ''">
      <v-card 
        max-width="750"
        outlined color="transparent"
        class="mx-auto"
        >
        <v-row>
          <v-text-field
              label="Todo Task"
              placeholder="Add a todo task ...."
              v-model="newTodo"
              filled
              rounded
              dense
            ></v-text-field>
          <v-avatar @click="addTodo"><Plus /></v-avatar>
        </v-row>
      </v-card>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-text-field
            label="Todo Task"
            placeholder="Add a todo task ...."
            v-model="$store.state.editedTodo"
            filled
            rounded
            dense
          ></v-text-field>
        <v-avatar @click="updateEditedTodo"><Check /></v-avatar>
      </v-row>
    </v-container>
    <v-container v-if="$store.state.todos.length === 0" class="todos-card">
      <h1>No tasks for now</h1>
    </v-container>
    <v-container v-else>
      <v-list max-width="750" class="todo-card mx-auto" rounded v-for="(todo, index) in $store.state.todos" :key="index">
        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ todo.todoTask }}</v-list-item-title>
            </v-list-item-content>
            <v-avatar @click="updateTodo(todo.id, index)"><Pencil /></v-avatar>
            <v-avatar @click="removeTodo(todo.id)"><Delete /></v-avatar>
          </template>
        </v-list-item>
      </v-list>
    </v-container>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import store from "../store"
  import axios from "axios"
  import Plus from 'vue-material-design-icons/Plus.vue';
  import Check from 'vue-material-design-icons/Check.vue';
  import Pencil from 'vue-material-design-icons/Pencil.vue';
  import Delete from 'vue-material-design-icons/Delete.vue';

  export default Vue.extend({
    name: 'TodoApp',

    data: () => ({
      newTodo: ''
    }),
    mounted() {
      store.dispatch('getTodos')
    },
    components: {
     Plus,
     Check,
     Pencil,
     Delete
    },
    methods: {
      async addTodo() {
        if (this.newTodo === '' ) {
          alert('Enter a task to add !')
        } else {
          const response = await axios.post("http://localhost:3333/todos", {todoTask: this.newTodo})
          
          store.dispatch("addTodo", response.data)
          this.newTodo = ''
      }
      },
      updateTodo(id: number, index: number) {
        if (store.state.editedTodo === '') {
          store.state.editedTodo = store.state.todos[index].todoTask
        }
      },
      async updateEditedTodo() {
        const todoId =  store.state.todos.map((tds) => {
            if (store.state.editedTodo.includes(tds.todoTask) || tds.todoTask.includes(store.state.editedTodo)) {
              tds.todoTask = store.state.editedTodo
              return tds.id
            }
          })
          for (let id of todoId) {
            if (id !== undefined) {
              store.state.modId = id
            }
          }
          const modifiedResponse = await axios.put(`http://localhost:3333/todos/${store.state.modId}`,{todoTask: store.state.editedTodo})
          store.dispatch("updatedTodo", modifiedResponse.data)
          store.state.editedTodo = ''
      },
      async removeTodo(id: number) {
        const res = await axios.delete(`http://localhost:3333/todos/${id}`)

        console.log(res)
        store.dispatch("removeTodo", id) 
      }
    }
})
</script>

<style scoped>

.btn-container {
  background-color: rgba(255, 255, 255, 0.5);
  height: 24px;
  width: 24px;
}

.todos-card {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 18px;
  margin: 4px;
}

.todo-card {
  margin: 8px;
}

</style>