import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
 state: {
  todos: [
    {
      "id": 54,
      "todoTask": "Phew",
      "done": false
    }
  ],
  editedTodo: '',
  modId: 0
},
mutations: {
  fetch_todo(state, data) {
    state.todos = data
  },
  add_todo(state, todoData){
    state.todos.push(todoData)
  },
  todo_status(state, updatedData) {
    state.todos.map((tds, index) => {
      if (tds.id === updatedData.id) {
        state.todos[index] = updatedData
      }  
    })
  },
  updated_todo(state, response) {
    state.todos.map((tds, index) => {
      if (tds.id === response.id) {
        state.todos[index] = response
      }  
    })
  },
  remove_todo(state, id) {
    state.todos = state.todos.filter(tds => tds.id !== id)
  }
},
actions: {
  async getTodos({commit}, state) {
    const response = await axios.get("http://localhost:3333/todos")
    
    commit('fetch_todo', response.data)
  },
  addTodo({commit}, todoData) {
    commit('add_todo',todoData)
  },
  todoStatus({commit}, updatedData) {
    commit('todo_status', updatedData)
  },
  updatedTodo({commit}, response) {
    commit("updated_todo", response)
  },
  removeTodo({commit}, id) {
    commit('remove_todo', id)
  }
 },
modules: {
}
})