const STORAGE_KEY = 'todo-list'
const todoStorage = {
  fetch: () => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: (todos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const filters = {
  all: (todos) => {
    return todos
  },
  active: (todos) => {
    return todos.filter((todo) => {
      return !todo.completed
    })
  },
  completed: (todos) => {
    return todos.filter((todo) => {
      return todo.completed
    })
  }
}

export default {
  STORAGE_KEY,
  todoStorage,
  filters
}