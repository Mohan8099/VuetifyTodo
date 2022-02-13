<template>
  <v-container>
    <h1>To-do List</h1>
    <v-container v-if="$store.state.editedTodo === ''">
      <v-row>
        <v-text-field v-model="newTodo" label="Add a todo task ...." :rules="rules" hide-details="auto" width='50%'></v-text-field>
        <v-btn @click="addTodo"><Plus /></v-btn>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-text-field v-model="$store.state.editedTodo" :rules="rules" hide-details="auto" width='50%'></v-text-field>
        <v-btn @click="updateEditedTodo"><Check /></v-btn>
      </v-row>
    </v-container>
    <v-list v-for="(todo, index) in $store.state.todos" :key="index">
      <v-list-item>
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox :input-value="active"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ todo.todoTask }}</v-list-item-title>
          </v-list-item-content>
          <v-btn @click="updateTodo(todo.id, index)"><Pencil /></v-btn>
          <v-btn @click="removeTodo(todo.id)"><Delete /></v-btn>
        </template>
      </v-list-item>
    </v-list>
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
