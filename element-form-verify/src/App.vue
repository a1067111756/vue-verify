<template>
  <div id="app">
    <TestComponent></TestComponent>
  </div>
</template>

<script>
import TestComponent from '@/components/TestComponent/index.vue'

export default {
  components: { TestComponent }
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  width: 800px;
  margin: auto;
  margin-top: 50px;
}
</style>
