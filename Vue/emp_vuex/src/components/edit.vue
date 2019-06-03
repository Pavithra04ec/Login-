<template>
  <div>
    <b-container fluid class="w-50.5">
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">CategoryName:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            id="CategoryName"
            v-validate="'alpha|required'"
            v-model="item.CategoryName"
            name="CategoryName"
            required
            placeholder="Enter CategoryName"
          ></b-form-input>
          <span>{{ errors.first('CategoryName') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Users:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            id="Users"
            v-validate="'required'"
            v-model="item.Users"
            name="Users"
            required
            placeholder="Enter Users"
          ></b-form-input>
          <span>{{ errors.first('Users') }}</span>
        </b-col>
      </b-row>
      <b-button class="button" variant="primary" @click="errorfn()">Update</b-button>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "edit",
  data() {
    return {
      CategoryId: this.$route.params.CategoryId,
      arr: [],
      item: {
        CategoryId: "",
        CategoryName: "",
        Users: ""
      }
    };
  },
  mounted() {
    this.getData();
    this.getDataById(this.$route.params.CategoryId);
  },
  methods: {
    getData: function() {
      axios({
        method: "GET",
        url: "http://localhost:3000/api"
      })
        .then(data => {
          //console.log(data)
          this.arr = data.data;
        })
        .catch(e => {
          console.error(e);
        });
    },
    getDataById: function(CategoryId) {
      axios({
        method: "GET",
        url: `http://localhost:3000/api/${CategoryId}`
      })
        .then(response => {
          //let splitArr = this.arr[0].Users.split(",");
          //console.log(splitArr);
          console.log(response);
          this.arr = response.data;
          this.item.CategoryId = this.arr[0].CategoryId;
          this.item.CategoryName = this.arr[0].CategoryName;
          this.item.Users = this.arr[0].Users;
        })
        .catch(e => {
          console.error(e);
        });
    },
    errorfn: function() {
      if (!this.item.CategoryName | !this.item.Users) {
        return;
      } else {
        this.updateDatas();
      }
    },
    updateDatas: function(item) {
      var Id = this.$route.params.CategoryId;
      var data = {
        CategoryName: this.item.CategoryName,
        Users: this.item.Users
      };
      console.log(data);
      axios({
        method: "PUT",
        url: `http://localhost:3000/api/put/${Id}`,
        data
      })
        .then(response => {
          this.arr.push(response);
          console.log("result:" + response);
          this.$router.go(-1);
          alert("updated successfully");
        })
        .catch(e => {
          console.log(e);
          alert("There is a problem in updating..");
        });
    }
  }
};
</script>