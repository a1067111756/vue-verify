<template>
  <div id="app">
    <TriggerComponent></TriggerComponent>
  </div>
</template>

<script>
import TriggerComponent from '@/components/TriggerComponent.vue'

export default {
  components: { TriggerComponent }
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
