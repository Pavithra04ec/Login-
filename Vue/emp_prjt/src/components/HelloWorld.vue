<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <b-container>
      <h1 style="text-align:center;">DASHBOARD</h1>
      <p style="text-align: center;">
        <b-button type="submit" v-on:click="showTable=true;getData()" variant="info">view user list</b-button>
      </p>
      <p style="text-align: center;">No Of users {{count}}</p>
      <div v-if="showSpinner==true" class="text-center">
        <b-spinner variant="primary" v-show="showSpinner"></b-spinner>
      </div>
    </b-container>
    <div v-if="userer && arr.length==0">
      <div style="text-align: center;">
        <span style="font-size:100px;">&#9888;</span>
      </div>
      <h1 style="text-align: center;">User Info Not Found</h1>
      <div style="text-align: center;">
        <nav>
          <router-link to="/adduser" tag="b-button" variant="primary">AddUser</router-link>
        </nav>
      </div>
    </div>
    <div v-else>
      <b-container>
        <div v-show="showTable">
          <div>
            <nav>
              <router-link to="/adduser" tag="b-button" style="float: right;">AddUser</router-link>
            </nav>
          </div>
          <div>
            <b-button
              size="sm"
              variant="primary"
              @click="showCheckBox=true;showDelete=true;showBtn=false"
            >Selected rows</b-button>
            <!-- <input type="checkbox" v-model="selectAll" v-show="showCheckBox" @click="select"> -->
            <!-- <input type="checkbox" @click="selectAll" v-show="showCheckBox"> -->
            <!-- <i class="form-icon"></i> -->
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>
                  <b-form-checkbox v-show="showCheckBox" v-model="selectAll"></b-form-checkbox>
                </th>
                <th>EmpId</th>
                <th>Name</th>
                <th>Role</th>
                <th>PreOrganization</th>
                <!-- <th v-show="showBtn">Edit</th> -->
                <th v-show="showBtn">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in arr" :key="item.EmpId">
               <td>
                  <b-form-checkbox v-show="showCheckBox" :value="item.EmpId" v-model="checkedNames"></b-form-checkbox>
                </td>
                <td>{{item.EmpId}}</td>
                <td>{{item.Name}}</td>
                <td>{{item.Role}}</td>
                <td>{{item.PreOrganization}}</td>
                 <!-- <td>
                    <b-button v-on:click="onClick(item.EmpId)" v-show="showBtn" variant="warning">
                      <i style="font-size:24px" class="fa">&#xf044;</i>
                    </b-button>
                  </td> -->
                <td>
                  <b-button
                    v-show="showBtn"
                    v-b-modal.modal-scoped
                    @click="deleteData(deletedId=item.EmpId)"
                    variant="danger"
                  >
                    <i class="fa fa-trash"></i>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <b-button v-b-modal.modal-scoped v-show="showDelete" variant="dark">Delete</b-button>
        </div>
      </b-container>
    </div>
    <template>
      <b-modal id="modal-scoped">
        <template slot="default">
          <p>Are you Sure ,you want to delete</p>
        </template>
        <template slot="modal-footer">
          <b-button size="sm" variant="success" @click="deleteDataById()">OK</b-button>
          <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
        </template>
      </b-modal>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      count: "",
      arr: [],
      form: {
        EmpId: "",
        Name: "",
        Role: "",
        PreOrganization: ""
      },
      showTable: false,
      userer: false,
      showSpinner: false,
      showCheckBox: false,
      showDelete: false,
      checkedNames: [],
      showBtn: false
    };
  },
  mounted() {
    //this.getData();
    this.getCount();
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
            checkedNames.push(user.EmpId);
          });
        }
        this.checkedNames = checkedNames;
        console.log(checkedNames)
      }
    }
  },
  
  methods: {
    getData: function() {
      this.showSpinner = true;
      this.userer = false;
      this.showTable = false;
      console.log("user");
      setTimeout(() => {
        axios({
          method: "GET",
          url: "http://localhost:5000/api"
        })
          .then(data => {
            console.log(this.arr);
            this.arr = data.data;
            this.showTable = true;
            this.showBtn = true;
            this.showSpinner = false;
            this.userer = false;

            console.log(data);
            if (this.arr.length == 0) {
              this.userer = true;
            }
          })
          .catch(e => {
            console.error(e);
          });
      }, 2000);
    },
    getCount: function() {
      this.userer = false;
      axios({
        method: "GET",
        url: "http://localhost:5000/api/count"
      })
        .then(response => {
          console.log(response);
          this.count = response.data[0].NoOfuser;
          console.log(this.count);
          this.userer = false;
        })
        .catch(e => {
          console.error(e);
        });
    },
    deleteData: function(EmpId) {
      this.userer = false;
      this.$bvModal.hide("modal-scoped");
      console.log("id >>>>>>>>> ",EmpId);
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/delete/${EmpId}`
      })
        .then(result => {
          console.log("arr >>>>>>>>> ", this.arr);
          let deleteIndex = this.arr.findIndex(
            element => element.EmpId === EmpId
          );
          console.log("deleteIndex >>>>>>>>> ", deleteIndex);
          this.arr.splice(deleteIndex, 1);
          //this.arr = result.data;
          alert("Deleted successfully");
          console.log("deleted:" + result);
          if (this.arr.length == 0) {
            this.userer = true;
          }
        })
        .catch(e => {
          console.log(e);
          alert("There is a problem in deleting");
        });
    },
    deleteDataById: function(){
       this.userer = false;
      this.$bvModal.hide("modal-scoped");
      console.log("id >>>>>>>>> ", );
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/deletebyId?EmpId=[${this.checkedNames}]`
      })
        .then(result => { 
          alert("Deleted successfully");
          this.getData();
          console.log("deleted:" + result);
          if (this.arr.length == 0) {
            this.userer = true;
          }
        })
        .catch(e => {
          console.log(e);
          alert("There is a problem in deleting");
        });
    },
    cancel: function(){
      this.$bvModal.hide("modal-scoped");
    },
    onClick: function(EmpId) {
      this.$router.push(`/edituser/${EmpId}`);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
