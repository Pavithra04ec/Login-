<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <b-container>
      <b-row class="my-1">
        <b-col sm="4">
          <b-form-input
            sm="2"
            id="CategoryName"
            v-model="item.CategoryName"
            placeholder="Enter CategoryName"
            name="CategoryName"
          ></b-form-input>
        </b-col>
        <b-col sm="0">
          <b-button v-b-modal.modal-scoped variant="info" @click="getData()">GO</b-button>
        </b-col>
      </b-row>
    </b-container>
    <template >
      <b-modal id="modal-scoped">
        <h2 class="text-center">Users List</h2>
        <template slot="modal-footer">
          <!-- <template> -->
          <b-container>
            <table class="table">
              <thead>
                <tr>
                  <th>
                    <b-form-checkbox v-model="selectAll"></b-form-checkbox>
                  </th>
                  <th>EmpId</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in arr" :key="item.EmpId">
                  <td>
                    <b-form-checkbox :value="item.Name" v-model="checkedNames"></b-form-checkbox>
                  </td>
                  <td>{{item.EmpId}}</td>
                  <td>{{item.Name}}</td>
                </tr>
              </tbody>
            </table>
            <b-row>
              <b-col>
                <b-button size="sm" variant="success" @click="postData()">Add</b-button>
                <b-button size="sm" variant="danger" @click="cancel()">cancel</b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <!-- </template> -->
      </b-modal>
    </template>
    <div>
      <b-container>
        <table class="table">
          <thead>
            <tr>
              <th>CategoryId</th>
              <th>CategoryName</th>
              <th>Users</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in arr1" :key="item.CategoryId">
              <td>{{item.CategoryId}}</td>
              <td>{{item.CategoryName}}</td>
              <td>{{item.Users}}</td>
              <td>
                    <b-button  variant="warning" @click="onClick(item.CategoryId)">
                      <i style="font-size:24px" class="fa">&#xf044;</i>
                    </b-button>
                  </td>
              <td>
                <b-button  variant="danger"  @click="deleteData(deletedId=item.CategoryId)">
                  <i class="fa fa-trash"></i>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      arr1: [],
      arr: [],
      form: {
        EmpId: "",
        Name: "",
        Role: "",
        PreOrganization: ""
      },
      item: {
        CategoryName: "",
        CategoryId: "",
        Users: ""
      },
      checkedNames: []
    };
  },
  computed: {
    selectAll: {
      get: function() {
        return this.arr ? this.checkedNames.length == this.arr.length : false;
      },
      set: function(value) {
        var checkedNames = [];
        if (value) {
          this.arr.forEach(function(user) {
            checkedNames.push(user.Name);
            console.log(checkedNames.push(user.Name))
          });
        }
        this.checkedNames = checkedNames;
        console.log(checkedNames);
      }
    }
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getData: function() {
      axios({
        method: "GET",
        url: "http://localhost:5000/api"
      })
        .then(data => {
          console.log(this.arr);
          this.arr = data.data;
          console.log(data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    postData: function() {
      this.$bvModal.hide("modal-scoped");
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            alert("error Enter the All Details");
            return;
          }
        })
        .catch(() => {});
      const data = {
        CategoryName: this.item.CategoryName,
        Users: this.checkedNames
      };
      axios({
        method: "POST",
        url: "http://localhost:3000/api/post",
        data,
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
          this.arr.push(response);
          alert("registered successfully");
          this.$router.go();
        })
        .catch(e => {
          console.log(e.response);
          if (e.response.status == 404) {
            alert(e.response.data.err.details[0].message);
          } else {
            alert(e.response.data.Error);
          }
        });
    },
    getCategory: function() {
      axios({
        method: "GET",
        url: "http://localhost:3000/api"
      })
        .then(data => {
          console.log(this.arr);
          this.arr1 = data.data;
          console.log(data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    cancel: function(){
      this.$bvModal.hide("modal-scoped");
    },
    deleteData: function(CategoryId) {
      console.log("id >>>>>>>>> ",CategoryId);
      axios({
        method: "DELETE",
        url: `http://localhost:3000/api/delete/${CategoryId}`
      })
        .then(result => {
          console.log("arr >>>>>>>>> ", this.arr);
          let deleteIndex = this.arr.findIndex(
            element => element.CategoryId === CategoryId
          );
          console.log("deleteIndex >>>>>>>>> ", deleteIndex);
          this.arr.splice(deleteIndex, 1);
          //this.arr = result.data;
          alert("Deleted successfully");
          console.log("deleted:" + result);
          this.$router.go();
        })
        .catch(e => {
          console.log(e);
          alert("There is a problem in deleting");
        });
    },
    onClick: function(CategoryId) {
      this.$router.push(`/edit/${CategoryId}`);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
