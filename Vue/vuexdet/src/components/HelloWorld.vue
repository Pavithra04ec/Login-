<template>
  <div>
    <b-container>
      <table class="table">
        <thead>
          <tr>
            <th>EmpId</th>
            <th>Name</th>
            <th>Role</th>
            <th>PreOrganization</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in arr" :key="item.EmpId">
            <td>{{item.EmpId}}</td>
            <td>{{item.Name}}</td>
            <td>{{item.Role}}</td>
            <td>{{item.PreOrganization}}</td>
          </tr>
        </tbody>
      </table>
       </b-container>
       <b-container>
      <div>
        <nav>
          <router-link to="/add" tag="b-button" style="float: right;" variant="info">+</router-link>
        </nav>
        <router-view/>
      </div>
      </b-container>
   
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted() {
    this.$store.dispatch("loadData");
  },
  computed: mapState(["arr"])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
