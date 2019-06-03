<template>
  <div>
    <b-container fluid class="w-50.5">
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">EmpId:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            id="EmpId"
            v-validate="'numeric|required'"
            v-model="EmpId"
            name="EmpId"
            required
            placeholder="Enter EmpId"
          ></b-form-input>
          <span>{{ errors.first('EmpId') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Name:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            id="name"
            v-validate="'alpha|min:3|required'"
            v-model="Name"
            name="Name"
            required
            placeholder="Enter name"
          ></b-form-input>
          <span>{{ errors.first('Name') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Role:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            id="Role"
            v-validate="'alpha|min:3|required'"
            v-model="Role"
            name="Role"
            required
            placeholder="Enter Role"
          ></b-form-input>
          <span>{{ errors.first('Role') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Pre Oraganization:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            id="PreOrganization"
            v-validate="'required'"
            v-model="PreOrganization"
            name="PreOrganization"
            required
            placeholder="Enter PreOrganization"
          ></b-form-input>
          <span>{{ errors.first('PreOrganization') }}</span>
        </b-col>
      </b-row>
      <!-- <b-button variant="success" @click="postData()" >Submit</b-button> -->
      <b-button variant="success" style="float:center;" @click="postData()">Submit</b-button>
    </b-container>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "add",
  props: {
    msg: String
  },
  data() {
    return {
      //arr: [],
      EmpId: "",
      Name: "",
      Role: "",
      PreOrganization: ""
    };
  },
 methods:{
     postData: function(){
         let payload = {
             EmpId: this.EmpId,
             Name: this.Name,
             Role: this.Role,
             PreOrganization: this.PreOrganization
         }
         this.$store.dispatch('submitProduct', payload)
         this.$router.push('/')
     }
 }
};
</script>