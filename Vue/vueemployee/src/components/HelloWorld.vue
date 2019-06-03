<template>
  <div>
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
        <tr v-for="value in arr" :key="value.EmpId">
          <td>{{value.EmpId}}</td>
          <td>{{value.Name}}</td>
          <td>{{value.Role}}</td>
          <td>{{value.PreOrganization}}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <nav>
        <router-link to="/adduser" tag="b-button" style="float: right;" variant="info">+</router-link>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "HelloWorld",
   props: {
    msg: String
  },
  data() {
    return {
      arr: [],
      form:{
        EmpId: "",
        Name: "",
        Role: "",
        PreOrganization: ""
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      console.log("user")
      axios({
        method: "GET",
        url: "http://localhost:5000/api"
      })
        .then(data => {
          console.log(this.arr)
          this.arr = data.data;
          console.log(data)
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>
<style scoped>
</style>
