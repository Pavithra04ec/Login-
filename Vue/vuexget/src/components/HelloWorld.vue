<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>EmpId</th>
          <th>Name</th>
          <th>Role</th>
          <th>Pre Organization</th>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: "HelloWorld",
   props: {
    msg: String
  },
  mounted () {
    this.$store.dispatch('loadData')
  },
  computed: mapState([
    'arr'
  ])
};
</script>

<style scoped>
</style>
