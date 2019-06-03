<template>
  <div class="customer">
    <h1>I'm a customer</h1>
    <p>I see {{ totalTvCount }} TVs!</p>
  </div>
</template>

<script>
//import store from './store.js'
export default {
  name: "HelloWorld",
 computed: {
    totalTvCount () {
      return this.$store.state.totalTvCount
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
