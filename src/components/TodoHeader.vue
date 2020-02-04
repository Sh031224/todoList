<template>
  <header class="header">
    <img src="../assets/logo.png" class="logo">
    <h1>TodoList</h1>
    <div class="input">
      <input class="new-todo"
        autofocus autocomplete="off"
        v-model="newTodo"
        @keyup.enter="addTodo" required />
      <div class="placeholder">여기에 입력하세요.</div>
    </div>
  </header>
</template>

<script>
import Storage from '@/Storage'
export default {
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    addTodo () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.$store.commit('addTodo', {
        id: Storage.todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
      Storage.todoStorage.save(this.$store.state.todos)
    }
  }
}
</script>

<style lang="scss">
.header {
  padding-top: 40px;
  .logo {
    width: 150px;
    @media screen and (max-width: 768px) {
      width: 70px;
    }
  }
  h1 {
    font-size: 20pt;
    margin-bottom: 30px;
    @media screen and (max-width: 768px) {
      margin-bottom: 20px;
    }
  }
  .input {
    display: flex;
    display: -webkit-flex;
    box-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    min-width: 0%;
    margin: 0 auto;
    position: relative;
    width: 80%;
    @media screen and (min-width: 768px) {
      width: 600px;
    }
  }
  .new-todo {
    border: 1px solid rgb(221, 221, 221);
    border-radius: 10px;
    box-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    padding: 13px;
    outline: none;
    line-height: 24px;
    display: block;
    margin-bottom: 10px;
    &:focus {
      border: 1px solid #1a73e8;
    }
  }
  .placeholder {
    position: absolute;
    pointer-events: none;
    font-size: 17px;
    left: 5px;
    top: 17px;
    background: white;
    padding: 0px 10px;
    transition: 0.1s;
    color: gray;
  }
  .new-todo:focus ~ .placeholder,
  .new-todo:valid ~ .placeholder {
    opacity: 1;
    color: #1a73e8;
    left: 8px;
    top: -10px;
  }
  .new-todo:not(:focus):valid ~ .placeholder {
    color: rgb(116, 116, 116);
  }
}
</style>