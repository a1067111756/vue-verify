<template>
  <div id="app">
    <WatchComponent></WatchComponent>
  </div>
</template>

<script>
import WatchComponent from '@/components/WatchComponent.vue'

export default {
  components: { WatchComponent }
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
