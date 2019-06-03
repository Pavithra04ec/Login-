<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >

    <div class="text-center">
      <b-spinner variant="primary" v-show="showSpinner"></b-spinner>
    </div>
    <table class="table created">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Gender</th>
          <th>MobileNo</th>
          <th>Email</th>
          <th>Password</th>
          <th>ConfirmPassword</th>
          <th>Country</th>
          <th>Color</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in arr" :key="value.id">
          <td>{{value.id}}</td>
          <td>{{value.Name}}</td>
          <td>{{value.Gender}}</td>
          <td>{{value.MobileNo}}</td>
          <td>{{value.Email}}</td>
          <td>{{value.Password}}</td>
          <td>{{value.ConfirmPassword}}</td>
          <td>{{value.Country}}</td>
          <td>{{value.Color}}</td>
          <!-- <td><input type="checkbox" @change="showCollapse1 = true,updateData($event),form=value"></td> -->
          <td>
            <b-button @click="updateData(value)" router-link to="/edit" variant="info">
              <i style="font-size:24px" class="fa">&#xf044;</i>
            </b-button>
          </td>
          <td>
            <button @click="deleteData(value.id)" class="button">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <nav>
        <router-link to="/add" type="button">Add Users</router-link>
      </nav>
      <router-view/>
    </div>
    <!-- <form method="get" action="/add"> -->
    <!-- <button type="submit" @clcik="$router.go('/add')">Continue</button> -->
    <!-- </form> -->
  </div>
</template>


<script>
import axios from "axios";
// import vuetify from "vuetify-confirm";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      showCollapse1: false,
      modalShow: false,
      showModal: false,
      arr: [],
      showSpinner: false,
      form: {
        id: "",
        Name: "",
        Gender: "",
        MobileNo: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Country: null,
        Color: []
      },
      Countries: [
        { text: "Select One", value: null },
        "India",
        "China",
        "USA",
        "Singapore"
      ],
      show: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      //console.log(event.target.checked);
      //this.showTable = event.target.checked;
      this.showSpinner = true;
      axios({
        method: "GET",
        url: "http://localhost:5000/api/"
      })
        .then(data => {
          //console.log(data)
          this.arr = data.data;
          this.showSpinner = false;
        })
        .catch(() => {
          //console.error(e)
          this.showSpinner = false;
          //this.router.push('/add')
        });
    },
    postData: function() {
      var data = {
        id: this.form.id,
        Name: this.form.Name,
        Gender: this.form.Gender,
        MobileNo: this.form.MobileNo,
        Email: this.form.Email,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Country: this.form.Country,
        Color: this.form.Color
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
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateData: function(value) {
      this.$router.push({
        name: "update",
        params: {
          value
        }
      });
      //this.showData = form.target.checked
    },
    updateDatas: function(form) {
      this.showData = form.target.checked;
      var Id = this.form.id;
      var data = {
        Name: this.form.Name,
        Gender: this.form.Gender,
        MobileNo: this.form.MobileNo,
        Email: this.form.Email,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Country: this.form.Country,
        Color: this.form.Color
      };
      console.log(data);
      axios({
        method: "PUT",
        url: `http://localhost:5000/api/put/${Id}`,
        data
      })
        .then(response => {
          this.arr.push(response);
          console.log("result:" + response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteData: function(id) {
      // this.$dialog.confirm("If you delete this record, it'll be gone forever.", {
      //loader: true ,
      //this.$refs.modal.hide()
      axios({
        method: "DELETE",
        url: `http://localhost:5000/api/delete/${id}`
      })
        .then(result => {
          this.arr.splice(this.arr.indexOf(id), 1);
          console.log("deleted:" + result);
        })
        .catch(e => {
          console.log(e);
        });
    },
    redirect: function() {
      this.$router.go("/add");
    }
  }
};
</script>