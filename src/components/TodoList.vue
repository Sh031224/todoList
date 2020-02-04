<template>
  <div>
    <section class="main" v-show="filteredTodos.length" v-cloak>
      <div class="all-select">
        <span class="toggle-all">
          <input id="toggle-all" type="checkbox" v-model="allDone">
          <label for="toggle-all"></label>
        </span>
        <span class="to-a">모두 선택</span>
      </div>
      <div class="container-todo">
        <div class="todo-list">
          <div v-for="todo in filteredTodos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" :id="todo.id">
              <label class="toggle-label" :for="todo.id"></label>
              <label class="title" @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input class="edit" type="text"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)">
          </div>
        </div>
      </div>
    </section>
    <footer class="footer" v-show="todos.length" v-cloak>
      <span class="todo-count" v-show="filteredTodos.length" v-cloak>
        <strong>{{ remaining }}</strong> left
      </span>
      <div class="filters">
        <span @click="onChange('all')" :class="{ selected: visibility == 'all' }">All</span>
        <span @click="onChange('active')" :class="{ selected: visibility == 'active' }">Active</span>
        <span @click="onChange('completed')" :class="{ selected: visibility == 'completed' }">Completed</span>
      </div>
      <div class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
        완료 항목 지우기
      </div>
    </footer>
  </div>
</template>

<script>
import Storage from '@/Storage'
export default {
  data() {
    return {
      editedTodo: null,
      visibility: 'all'
    }
  },
  computed: {
    todos: {
      get: function () {
        return this.$store.state.todos
      },
      set: function () {
        console.log('---------')
      }
    },
    filteredTodos: function () {
      return Storage.filters[this.visibility](this.todos)
    },
    remaining: function () {
      return Storage.filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        this.$store.state.todos = this.todos
        Storage.todoStorage.save(todos)
      },
      deep: true
    }
  },
  methods: {
    removeCompleted: function () {
      this.todos = Storage.filters.active(this.todos)
      this.$store.state.todos = Storage.filters.active(this.todos)
    },
    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    editTodo: function (todo) {
      // this.beforeEditCache = todo.title
      document.getElementsByClassName('view')[todo.id].style.display = "none"
      document.getElementsByClassName('edit')[todo.id].style.display = "block"
      this.editedTodo = todo
    },
    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
      document.getElementsByClassName('view')[todo.id].style.display = "block"
      document.getElementsByClassName('edit')[todo.id].style.display = "none"
    },
    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    onChange (visibility) {
      if (Storage.filters[visibility]) {
        this.visibility = visibility
      } else {
        this.visibility = 'all'
      }
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss">
.container-todo {
  display: flex;
  display: -webkit-flex;
  box-flex: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  min-width: 0%;
  margin: 0 auto;
  position: relative;
  padding: 0;
  width: 80%;
  @media screen and (min-width: 768px) {
    width: 600px;
  }
}
.todo-list {
  box-flex: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  outline: none;
  line-height: 24px;
  display: block;
}
.to-a {
  font-size: 12pt;
}
.all-select {
  position: relative;
  text-align: center;
  margin-bottom: 10px;
}
.toggle-all {
  width: 15px;
  height: 15px;
  margin-right: 30px;
  position: relative;
  label {
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }
  input {
    display: none;
    &:checked + label::after {
      position: absolute;
      width: 15px;
      height: 15px;
      font-size: 7pt;
      border: 1px solid rgb(190, 43, 43);
      color: rgb(190, 43, 43);
      border-radius: 50%;
      left: 0;
      content: '✔';
      text-align: center;
    }
    &:not(:checked) + label {
      border: 1px solid #bcbcbc;
      text-align: center;
      content: '';
    }
  }
}
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  display: none;
  margin-left: 0;
  width: 100%;
  padding: 10px;
  padding-left: 50px;
  border: 1px solid rgb(180, 180, 180);
}
.toggle {
  display: none;
  opacity: 0;
}
.toggle-label {
  position: absolute;
  width: 25px;
  border-radius: 50%;
  height: 25px;
  margin: 0;
  cursor: pointer;
}
.toggle:not(:checked) + label {
  border: 1px solid #bcbcbc;
  content: '';
}
.toggle:checked + label::after {
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  border: 1px solid rgb(43, 190, 43);
  color: rgb(43, 190, 43);
  content: '✔';
}
.title {
  padding-left: 40px;
  margin: 0;
  font-size: 17pt;
}
.todo-list div.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

.destroy {
  position: absolute;
	width: 20px;
	height: 20px;
  right: 15px;
  background: none;
  border: none;
	font-size: 20pt;
	color: #cc9a9a;
	transition: color 0.2s ease-out;
  &::after {
    content: '×';
  }
  &:hover {
    color: #af5b5e;
  }
}
.view {
  display: block;
  margin-left: 0;
  width: 100%;
  padding: 10px;
  padding-right: 30px;
  text-align: left;
}
.filters span {
  margin: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.selected {
  color:rgb(43, 190, 43);
}
.clear-completed {
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    color:rgb(190, 43, 43);
  }
}
.footer {
  margin-top: 30px;
}
[v-cloak] { display: none; }
</style>