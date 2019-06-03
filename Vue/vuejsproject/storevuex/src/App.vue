<template>
  <div class="container">
    <counter></counter><br />
    <div class="columns">
      <div class="column is-11">
        <add></add>
      </div>
      <div class="column auto">
        <remove></remove>
      </div>
    </div>
 </div>
</template>

<script>
import counter from './components/counter.vue'
import add from './components/add.vue'
import remove from './components/remove.vue'

export default {
  name: 'app',
  components: {
    counter,
    add,
    remove
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
