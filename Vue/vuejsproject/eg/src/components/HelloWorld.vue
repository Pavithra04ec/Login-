<template>
  <div>
    <h1>I'm a customer</h1>
    <p>I see {{ totalCount }} TVs!</p>
    <p v-show="!totalCount">I can't buy any..</p>
    <button :disabled="!totalCount" @click="buyTv">Buy TV</button>
    <button :disabled="totalTvCount < 2" @click="buyTwoTvs">Buy Two TVs</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    totalCount() {
      return this.$store.state.totalCount;
    },
    happyStaff () {
      return this.$store.getters.happyStaff
    }
  },
  methods: {
    buyTv() {
      this.$store.dispatch("removeTv");
    },
    buyTwoTvs() {
      this.$store.dispatch("removeTv", 2);
    }
  }
};
</script>