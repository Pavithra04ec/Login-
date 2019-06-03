<template>
  <div>
    <table class="table">
      <thead v-show="showtbl">
        <tr>
          <th>EmpId</th>
          <th>Name</th>
          <th>Role</th>
          <th>Pre Organization</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in arr" :key="index">
          <td>
            <b-form-input
              id="EmpId"
              v-validate="'required|numeric|between:1,100'"
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
          <td v-if="index + 1 === arr.length">
            <b-button variant="info" @click="addLine(item)">+</b-button>
          </td>
          <td v-else>
            <b-button variant="info" @click="removeData(index)">-</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <b-button style="float:centre" variant="info" @click="postData(form)">Submit</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "add",
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
      },
      showtbl :false,
    };
  },
  mounted() {
    this.addLine();
  },
  methods: {
    postData: function() {
      console.log("postdt>>>>>>>>>>>");
      //console.log("post method",this.arr);
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
          this.$router.push("/user");
        })
        .catch(e => {
          alert("There was problem in inserting....");
          console.log(e);
        });
      //}
    },
    addLine: function(value) {
      //let checkEmptyLines = this.arr.filter(line => line.number === null);
      // if (
      //   value == undefined ||
      //   !value.EmpId ||
      //   !value.Name ||
      //   !value.Role ||
      //   !value.PreOrganization
      // ) {
      //   console.log("no user");
      // } else {
      //   this.postDt.push(value);
      //   console.log("post data", this.postDt);
      // }
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
      // if (checkEmptyLines.length >= 1 && this.lines.length > 0) return;
      // return this.arr.push({
      //   EmpId: "",
      //   Name: "",
      //   Role: "",
      //   PreOrganization: ""
      // });
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