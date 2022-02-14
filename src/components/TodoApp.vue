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
          <v-btn 
            @click="addTodo"
            class="mx-2"
            fab
            dark
            color="primary">
            <v-avatar><Plus /></v-avatar>
          </v-btn>
        </v-row>
      </v-card>
    </v-container>
    <v-container v-else>
      <v-card 
        max-width="750"
        outlined color="transparent"
        class="mx-auto"
        >
        <v-row>
          <v-text-field
              label="Todo Task"
              placeholder="Add a todo task ...."
              v-model="$store.state.editedTodo"
              filled
              rounded
              dense
            ></v-text-field>
          <v-btn  @click="updateEditedTodo"
            class="mx-2"
            fab
            dark
            color="purple lighten-2">
          <v-avatar><Check /></v-avatar>
          </v-btn>
        </v-row>
      </v-card>
    </v-container>
    <v-container v-if="$store.state.todos.length === 0" class="todos-card">
      <h1>No tasks for now</h1>
    </v-container>
    <v-container v-else>
      <v-list max-width="750" 
        class="todo-card mx-auto" 
        height="50"
        v-for="(todo, index) in $store.state.todos" 
        :key="index"
        outlined color="transparent">
        <v-list-item 
          class="todos"
          :class="{ 'green accent-1' : todo.done }">
          <template v-slot:default>
            <v-list-item-action 
              :class="{ 'blue-lighten-5' : todo.done }"
              @click="todoStatus(todo.id, todo.todoTask)"
              >
              <v-checkbox :input-value="todo.done"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ todo.todoTask }}</v-list-item-title>
            </v-list-item-content>
            <v-btn @click="updateTodo(todo.id, index)"
              class="mx-2"
              fab
              dark
              small
              color="purple lighten-2">
              <v-avatar><Pencil /></v-avatar>
            </v-btn>
            <v-btn @click="removeTodo(todo.id)"
                class="mx-2"
                fab
                small
                dark
                color="red">
              <v-avatar><Delete /></v-avatar>
            </v-btn>            
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
          const response = await axios.post("http://localhost:3333/todos", {todoTask: this.newTodo, done: false})
          
          store.dispatch("addTodo", response.data)
          this.newTodo = ''
      }
      },
      async todoStatus(id: number, todoTask: string) {
        let currentTask = store.state.todos.filter(tds => tds.id === id)[0]
        const res = await axios.put(`http://localhost:3333/todos/${currentTask.id}`,{done: !currentTask.done, todoTask: todoTask})
       
        store.dispatch('todoStatus', res.data)
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
  margin: 12px;
}

.todos {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
}

</style>