import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: null
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    }
  },
  getters: {
    returnTodo (state) {
      return state.todos
    }
  }
  // actions: {
  // },
  // modules: {
  // }
})