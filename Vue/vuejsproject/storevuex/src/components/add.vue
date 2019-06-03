<template>
  <div class="container">
    <div class="field is-grouped">
      <div class="control">
        <button class="button-is-primary" v-on:click="addCounter()">add</button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store/store";
//import * as type from "../store/type";
export default {
  name: "add",
  methods: {
    addCounter() {
      store.commit('INCREMENT');
    },
  }
};
</script>
