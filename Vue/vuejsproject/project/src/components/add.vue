<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <div>
      <b-button
        :class="showCollapse1 ? 'collapsed' : null"
        :aria-expanded="showCollapse1 ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="showCollapse1 = !showCollapse1"
      >Add</b-button>
      <b-collapse id="collapse-5" v-model="showCollapse1" class="mt-1">
        <b-form class="w-25" size="sm">
          <b-form-group label="Your id:">
            <b-form-input
              v-validate="'numeric|required'"
              v-model="form.id"
              name="id"
              required
              placeholder="Enter Id"
            ></b-form-input>
            <span>{{ errors.first('id') }}</span>
          </b-form-group>
          <b-form-group label="Your Name:">
            <b-form-input
              v-validate="'alpha|min:3|required'"
              v-model="form.Name"
              name="Name"
              required
              placeholder="Enter name"
            ></b-form-input>
            <span>{{ errors.first('Name') }}</span>
          </b-form-group>
          <b-form-group>
            <b-form-radio-group v-model="form.Gender">
              <b-form-radio value="Male">Male</b-form-radio>
              <b-form-radio value="Female">Female</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group label="Your MobileNo:">
            <b-form-input
              v-validate="'digits:10|required'"
              v-model="form.MobileNo"
              type="number"
              name="MobileNo"
              required
              placeholder="Enter MobileNo"
            ></b-form-input>
            <span>{{ errors.first('MobileNo') }}</span>
          </b-form-group>
          <b-form-group
            label="Email address:"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              v-validate="'email'"
              v-model="form.Email"
              type="email"
              name="Email"
              required
              placeholder="Enter email"
            ></b-form-input>
            <span>{{ errors.first('Email') }}</span>
          </b-form-group>
          <b-form-group label="Password:" description="Give your strong password">
            <b-form-input
              v-validate="'required'"
              ref="Password"
              v-model="form.Password"
              type="password"
              name="Password"
              required
              placeholder="Enter your Password"
            ></b-form-input>
            <span>{{ errors.first('Password') }}</span>
          </b-form-group>
          <b-form-group label="Confirm Password:" description="Enter your correct password.">
            <b-form-input
              v-validate="'required|confirmed:Password'"
              v-model="form.ConfirmPassword"
              type="password"
              name="ConfirmPassword"
              required
              placeholder="Password again"
            ></b-form-input>
            <span>{{ errors.first('ConfirmPassword') }}</span>
          </b-form-group>
          <b-form-group label="Country:">
            <b-form-select v-model="form.Country" :options="Countries" required></b-form-select>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox-group v-model="form.Color">
              <b-form-checkbox value="Red">Red</b-form-checkbox>
              <b-form-checkbox value="Black">Black</b-form-checkbox>
              <b-form-checkbox value="Blue">Blue</b-form-checkbox>
              <b-form-checkbox value="Green">Green</b-form-checkbox>
              <b-form-checkbox value="White">White</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <b-button variant="success" @click="postData()" class="button">Submit</b-button>
          <b-button @click="updateDatas(form)" variant="warning" class="button">Update</b-button>
        </b-form>
      </b-collapse>
    </div>
  </div>
</template>


<script>
import axios from "axios";
//import modal from "./delete.vue"
import VueInstantLoadingSpinner from 'vue-instant-loading-spinner'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    VueInstantLoadingSpinner
  },
   data() {
    return {
      showCollapse1: false,
      modalShow: false,
      showModal : false,
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
//   mounted() {
//     this.getData();
//   },
  methods: {
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
  }
};
</script>
