import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
 state: {
  todos: [
    {
      "id": 54,
      "todoTask": "Phew"
    }
  ],
  statusList: ['To-do', 'In-progress', 'Done'],
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