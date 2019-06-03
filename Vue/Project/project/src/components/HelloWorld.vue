<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <div v-if="showSpinner==true" class="text-center">
      <b-spinner variant="primary" v-show="showSpinner" v-on:load="validate()"></b-spinner>
    </div>
    <div>
      <div>
        <h1 v-if="display">Server Error while Load the user</h1>
        <div v-else>
          <div v-if="userer || arr.length==0">
            <h1>User Info Not Found</h1>
            <div>
              <nav>
                <router-link to="/user/add" tag="button">Add</router-link>
              </nav>
              <router-view/>
            </div>
          </div>
          <div class="row" v-else>
            <div>
              <b-form-select v-model="form.selection" :options="selectedValue" @change="change()"></b-form-select>
              <div v-show="showBtn">
                <div v-if="this.form.selection=='Mobile No'">
                  <!-- <input id="Mobile No" required v-validate="'digits:10|required'" name="MobileNo" v-model="form.term" type="search"> -->
                  <input
                    v-validate="'digits:10|required'"
                    v-model="form.term"
                    name="term"
                    required
                    placeholder="Enter MobileNo"
                  >
                  <b-button type="submit" @click="getbyMobilno(form.term)" variant="outline-success">
                    <i class="fa fa-search"></i>
                  </b-button> 
                  <b-button type="submit" @click="select()" variant="outline-primary">
                    <i class="fa">&#xf021;</i>
                  </b-button>
                  <span>{{ errors.first('term') }}</span>
                </div>
                <div v-else>
                  <input v-model="form.text" type="Date">
                  <b-button type="submit" @click="getbyDob(form.text)" variant="outline-success">
                    <i class="fa fa-search"></i>
                  </b-button>
                  <b-button type="submit" @click="refresh()" variant="outline-primary">
                    <i class="fa">&#xf021;</i>
                  </b-button>
                </div>
              </div>
            </div>
            <table class="table">
              <thead v-show="showTable">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>MobileNo</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Language</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="value in arr" :key="value.id">
                  <td>{{value.id}}</td>
                  <td>{{value.Name}}</td>
                  <td>{{value.MobileNo}}</td>
                  <td>{{value.Email}}</td>
                  <td>{{value.Country}}</td>
                  <td>{{value.Language}}</td>
                  <td>{{value.Gender}}</td>
                  <td>{{value.DOB}}</td>
                  <td>
                    <b-button v-on:click="onClick(value.id)" variant="warning">
                      <i style="font-size:24px" class="fa">&#xf044;</i>
                    </b-button>
                  </td>
                  <td>
                    <b-button v-b-modal.modal-scoped @click="deleteId = value.id" variant="danger">
                      <i class="fa fa-trash"></i>
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <nav>
                <router-link to="user/add" tag="b-button" style="float: right;" variant="info">+</router-link>
              </nav>
              <router-view/>
            </div>
          </div>
        </div>
      </div>
      <template>
        <b-modal id="modal-scoped">
          <template slot="default">
            <p>Are you Sure ,you want to delete</p>
          </template>
          <template slot="modal-footer" slot-scope="{ ok, cancel }">
            <b-button size="sm" variant="success" @click="deleteData(deleteId)">OK</b-button>
            <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
          </template>
        </b-modal>
      </template>
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
      showSpinner: false,
      showTable: false,
      display: false,
      userer: false,
      showModal: false,
      showBtn: false,
      deletedId: null,
      arr: [],
      form: {
        id: "",
        Name: "",
        Gender: "",
        MobileNo: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Country: null,
        Language: [],
        DOB: "",
        term: "",
        text: "",
        selection: null
      },
      Countries: [
        { text: "Select One", value: null },
        "India",
        "China",
        "USA",
        "Singapore"
      ],
      selectedValue: [{ text: "Search", value: null }, "Mobile No", "DOB"],
      show: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      this.showTable = false;
      this.showSpinner = true;
      axios({
        method: "GET",
        url: "http://localhost:5000/api"
      })
        .then(data => {
          //console.log(data)
          this.arr = data.data;
          this.showTable = true;
          this.showSpinner = false;
          if (this.arr.length == 0) {
            this.display = false;
            this.userer = true;
          }
        })
        .catch(e => {
          console.error(e);
          this.showTable = true;
          this.showSpinner = false;
          this.display = true;
        });
    },
    deleteData: function(id) {
      this.$bvModal.hide("modal-scoped");
      console.log('id >>>>>>>>> ', id);
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/delete/${id}`
      })
        .then(result => {
          console.log('arr >>>>>>>>> ', this.arr);
          let deleteIndex = this.arr.findIndex(element => element.id === id)
          console.log('deleteIndex >>>>>>>>> ', deleteIndex);
          this.arr.splice(deleteIndex, 1);
          //this.arr = result.data;
          alert("Deleted successfully");
          console.log("deleted:" + result);
          this.$router.push("/user");
          //this.$router.go();
        })
        .catch(e => {
          console.log(e);
          alert("There is a problem in deleting");
        });
    },
    onClick: function(id) {
      this.$router.push(`/user/edit/${id}`);
    },
    cancel: function() {
      this.$bvModal.hide("modal-scoped");
    },
    postData: function() {
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            return;
          }
        })
        .catch(() => {});
      var data = {
        //id: this.form.id,
        Name: this.form.Name,
        Gender: this.form.Gender,
        MobileNo: this.form.MobileNo,
        Email: this.form.Email,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Country: this.form.Country,
        Language: this.form.Language
      };
      console.log(data);
      axios({
        method: "POST",
        url: "http://localhost:5000/api/post",
        data
      })
        .then(response => {
          this.arr.push(response);
          console.log("result:" + response);
          this.$router.go(-1);
          this.$router.push("/user");
        })
        .catch(e => {
          console.log(e);
        });
    },
    getbyMobilno: function(MobileNo) {
      //console.log(MobileNo);
      axios({
        method: "GET",
        url: `http://localhost:5000/api/mobileno/${MobileNo}`
      })
        .then(data => {
          this.arr = data.data;
        })
        .catch(e => {
          console.error(e);
          alert("The given mobile number is not found");
        });
    },
    getbyDob: function(DOB) {
      console.log("dOB");
      axios({
        method: "GET",
        url: `http://localhost:5000/api/dob/${DOB}`
      })
        .then(data => {
          this.arr = data.data;
        })
        .catch(e => {
          alert("The given Date of Birth is not found");
          console.error(e);
        });
    },
    select: function(term) {
      if (this.form.selection == "Mobile No") {
        this.getbyMobilno(term);
      } else if (this.form.selection == "DOB") {
        console.log("else dob");
        this.getbyDob(term);
      }
    },
    refresh: function() {
      this.$router.go();
    },
    change: function() {
      this.showBtn = true;
    },

  }
};
</script>