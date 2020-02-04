<template>
  <div id="app">
    <section class="todoapp">
      <todo-header></todo-header>
      <todo-list></todo-list>
    </section>
  </div>
</template>

<script>
import Storage from '@/Storage'
import TodoList from '@/components/TodoList'
import TodoHeader from '@/components/TodoHeader'
export default {
  name: 'app',
  components: {
    TodoList,
    TodoHeader
  },
  created () {
    this.$store.state.todos = Storage.todoStorage.fetch()
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  -webkit-user-select: none;
   -khtml-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
@font-face {
  font-family: 'NanumSquare';
  src: url('./fonts/NanumSquareR.eot');
  src: url('./fonts/NanumSquareR.eot#iefix') format('embedded-opentype'),
       url('./fonts/NanumSquareR.woff') format('woff'),
       url('./fonts/NanumSquareR.ttf') format('truetype');
}
#app {
  font-family: 'NanumSquare', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body {
  margin: 0;
  padding: 0;
}
</style>
