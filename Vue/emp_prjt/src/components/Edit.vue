<template>
  <div>
    <b-container>
      <h1></h1>
      <table class="table">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee Role</th>
            <th>Employee Pre Organization</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in arr" :key="index">
            <td>
              <b-form-input
                sm="2"
                id="EmpId"
                v-validate="'required|numeric'"
                :class="[{ error_input: errors.has('EmpId'+index)}]"
                v-model="item.EmpId"
                placeholder="Enter EmpId"
                :name="'EmpId'+index"
              ></b-form-input>
              <span>{{ errors.first('EmpId'+index) }}</span>
            </td>
            <td>
              <b-form-input
                id="Name"
                v-validate="'required|min:3'"
                :class="[{ error_input: errors.has('Name'+index)}]"
                v-model="item.Name"
                placeholder="Enter Name"
                :name="'Name'+index"
              ></b-form-input>
              <span>{{ errors.first('Name'+index) }}</span>
            </td>
            <td>
              <b-form-input
                id="Role"
                v-validate="'required|min:3'"
                :class="[{ error_input: errors.has('Role'+index)}]"
                v-model="item.Role"
                placeholder="Enter Role"
                :name="'Role'+index"
              ></b-form-input>
              <span>{{ errors.first('Role'+index) }}</span>
            </td>
            <td>
              <b-form-input
                id="PreOrganization"
                v-validate="'required'"
                :class="[{ error_input: errors.has('Role'+index)}]"
                v-model="item.PreOrganization"
                placeholder="Enter PreOrganization"
                :name="'PreOrganization'+index"
              ></b-form-input>
              <span>{{ errors.first('PreOrganization'+index) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <b-button style="float:centre" variant="success" @click="postData(form)">update</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit",
  props: {
    msg: String
  },
  data() {
    return {
      arr: [],
      form: {
        EmpId: "",
        Name: "",
        Role: "",
        PreOrganization: ""
      }
    };
  },
  mounted() {
    this.addLine();
  },
  methods: {
    postData: function() {
      console.log("postdt>>>>>>>>>>>");
      var res = this.arr.filter(
        val =>
          val !== undefined &&
          val.EmpId !== "" &&
          val.Name !== "" &&
          val.Role !== "" &&
          val.PreOrganization !== ""
      );
      console.log(res);
      const param = { data: res };
      return axios
        .post("http://localhost:5000/api/post", param.data)
        .then(response => {
          console.log("result  :" + response);
          this.$router.go(-1);
          this.$router.push("/");
          //
        })
        .catch(e => {
          console.log(e.response);
          //alert("There was problem in inserting....");
          if (e.response.data.errno == 1062) {
            alert(e.response.data.sqlMessage);
          } else {
            alert(e.response.data.details[0].message);
          }
        });
    },
    addLine: function(value) {
      if (
        value === undefined ||
        (!value.EmpId &&
          !value.Name &&
          !value.Role &&
          !value.PreOrganization) ||
        (value.EmpId && value.Name && value.Role && value.PreOrganization)
      ) {
        this.arr.push({
          Name: "",
          EmpId: "",
          Role: "",
          PreOrganization: ""
        });
      } else {
        alert("Error Enter The All Detail");
      }
    },
    removeData: function(index) {
      console.log(this.index);
      this.arr.splice(index, 1);
    }
  }
};
</script>

<style>
</style>