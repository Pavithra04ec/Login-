<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >

    <b-container fluid class="w-50.5" v-show="showLogin">
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default" description="We'll never share your email.">Email:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            id="Email"
            v-validate="'required'"
            v-model="item.Email"
            type="email"
            name="Email"
            required
            placeholder="Enter email"
          ></b-form-input>
          <span>{{ errors.first('Email') }}</span>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Password:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            :type="'password'"
            id="Password"
            v-validate="'required'"
            ref="Password"
            v-model="item.Password"
            name="Password"
            required
            placeholder="Enter your Password"
          ></b-form-input>
          <span>{{ errors.first('Password') }}</span>
        </b-col>
        <b-col sm="0">
          <b-button @click="showPassword()" variant="info">show</b-button>
        </b-col>
      </b-row>
      <b-button variant="success" @click="loginData()" style="float:center;">LogIn</b-button>
      <b-button variant="warning" style="float:center;" @click="forgot()">Forgot Password</b-button>
      <br>
      <br>
      <b-button v-b-modal.modal-scoped variant="primary" style="float:center;">New Register</b-button>
    </b-container>
    <b-container v-show="showOtp">
      <b-row>
        <b-col sm="4">
          <b-form-input
            sizs="sm"
            v-validate="'required'"
            v-model="item.OTP"
            name="OTP"
            required
            placeholder="Enter your OTP"
          ></b-form-input>
          <b-button
            variant="info"
            style="float:center;"
            @click="passShow=true,showOtp=false,getByOtp()"
          >Submit</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-show="passShow">
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">Password:</label>
        </b-col>
        <b-col sm="4" v-show="passShow">
          <b-form-input
          :type="'password'"
            v-validate="'required'"
            v-model="item.Password"
            name="Password"
            required
            placeholder="Enter Password"
          ></b-form-input>
          <span>{{ errors.first('Password') }}</span>
        </b-col>
        <b-col sm="0">
          <b-button @click="show()" variant="info">show</b-button>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">ConfirmPassword:</label>
        </b-col>
        <b-col sm="4">
          <b-form-input
            v-validate="'required|confirmed:Password'"
            v-model="item.ConfirmPassword"
            name="ConfirmPassword"
            type="password"
            required
            placeholder="Enter your ConfirmPassword"
          ></b-form-input>
          <span>{{ errors.first('ConfirmPassword') }}</span>
        </b-col>
      </b-row>
      <b-button
        pill
        variant="primary"
        style="float:center;"
        @click="updatePassword()"
      >Update Password</b-button>
    </b-container>
    <template>
      <b-modal id="modal-scoped">
        <p>Registration Form</p>
        <template slot="modal-footer">
          <!-- <template> -->
          <b-container fluid class="w-50.5">
            <b-row class="my-1">
              <b-col sm="4">
                <label for="input-default">Name:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input
                  id="name"
                  v-validate="'alpha|min:3|required'"
                  v-model="form.Name"
                  name="Name"
                  required
                  placeholder="Enter name"
                ></b-form-input>
                <span>{{ errors.first('Name') }}</span>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="4">
                <label for="input-default" description="We'll never share your email.">Email:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input
                  id="Email"
                  v-validate="'required'"
                  v-model="form.Email"
                  type="email"
                  name="Email"
                  required
                  placeholder="Email"
                ></b-form-input>
                <span>{{ errors.first('Email') }}</span>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="4">
                <label for="input-default">MobileNo:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input
                  id="MobileNo"
                  v-validate="'digits:10|required'"
                  v-model="form.MobileNo"
                  type="number"
                  name="MobileNo"
                  required
                  placeholder="MobileNo"
                ></b-form-input>
                <span>{{ errors.first('MobileNo') }}</span>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="4">
                <label for="input-default">Age:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input
                  id="Age"
                  v-validate="'numeric|required'"
                  v-model="form.Age"
                  name="Age"
                  required
                  placeholder="Age"
                ></b-form-input>
                <span>{{ errors.first('Age') }}</span>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="4">
                <label for="input-default">Address:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input
                  id="Address"
                  v-validate="'alpha|required'"
                  v-model="form.Address"
                  name="Address"
                  required
                  placeholder="Address"
                ></b-form-input>
                <span>{{ errors.first('Address') }}</span>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="4">
                <label for="input-default">Password:</label>
              </b-col>
              <b-col sm="4">
                <b-form-input
                  id="Password"
                  v-validate="'required'"
                  ref="Password"
                  v-model="form.Password"
                  type="password"
                  name="Password"
                  required
                  placeholder="Password"
                ></b-form-input>
                <span>{{ errors.first('Password') }}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button size="sm" type="submit" variant="success" @click="registerData()">OK</b-button>
                <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <!-- </template> -->
      </b-modal>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      arr: [],
      item: {
        Email: "",
        Password: "",
        OTP: "",
        token: ""
      },
      form: {
        Name: "",
        Email: "",
        MobileNo: "",
        Age: "",
        Address: "",
        Password: "",
        ConfirmPassword: ""
      },
      showLogin: true,
      showOtp: false,
      passShow: false,
      loggedIn: false
    };
  },
  mounted: function() {
    this.token = localStorage.getItem("token");
    this.$store.commit("setToken", this.token);
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    registerData: function() {
      this.passShow = false;
      this.showOtp = false;
      this.$bvModal.hide("modal-scoped");
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            //alert("error Enter the All Details");
            return;
          }
        })
        .catch(() => {});
      const data = {
        Name: this.form.Name,
        Email: this.form.Email,
        MobileNo: this.form.MobileNo,
        Age: this.form.Age,
        Address: this.form.Address,
        Password: this.form.Password
      };
      axios({
        method: "POST",
        url: "http://localhost:3000/api/register",
        data
        // headers: {
        //   "Content-type": "application/json"
        // }
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
    cancel: function() {
      this.$bvModal.hide("modal-scoped");
    },
    showPassword: function() {
      this.passShow = false;
      this.showOtp = false;
      var x = document.getElementById("Password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    forgot: function() {
      this.passShow = false;
      const Email = this.item.Email;
      if (Email === "") {
        alert("Enter Email");
      } else {
        axios({
          method: "GET",
          url: `http://localhost:3000/api/forgotpassword/${Email}`
        }).then(
          response => {
            console.log(response);
            this.arr = response.data;
            this.showLogin = false;
            this.showOtp = true;
          },
          error => {
            console.log(error.response);
            alert(error.response.data.Error);
            this.showOtp = false;
            this.showLogin = true;
          }
        );
      }
    },
    getByOtp: function() {
      const OTP = this.item.OTP;
      if (OTP === "") {
        alert("Enter OTP");
      } else {
        axios({
          method: "GET",
          url: `http://localhost:3000/api/otp/${OTP}`
        }).then(
          response => {
            console.log(response);
            this.arr = response.data.Data;
          },
          error => {
            console.log(error.response.data.Error);
            alert(error.response.data.Error);
            this.passShow = false;
            this.showOtp = true;
          }
        );
      }
    },
    updatePassword: function() {
      const Password = this.item.Password;
      const ConfirmPassword = this.item.ConfirmPassword;
      if (Password === ConfirmPassword) {
        var Email = this.item.Email;
        var data = {
          Password: this.item.Password
        };
        console.log(data);
        return axios
          .put(`http://localhost:3000/api/putPass/${Email}`, data)
          .then(response => {
            console.log("result  :" + response);
            alert("Password updated successfully");
            //this.$router.push(`/profile/${Email}`)
            //this.$router.go(-1);
            this.$router.go();
          })
          .catch(e => {
            console.log(e.response);
          });
      } else {
        alert("Password is incorrect");
      }
    },
    loginData: function() {
      this.passShow = false;
      this.showOtp = false;
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) {
            //alert("error Enter the All Details");
            return;
          }
        })
        .catch(() => {});
      const data = {
        Email: this.item.Email,
        Password: this.item.Password
      };
      console.log(data);
      if (data.Email === "") {
        alert("Enter Email and Password");
      } else {
        axios({
          method: "POST",
          url: "http://localhost:3000/api/login",
          data
        })
          .then(response => {
            this.arr.push(response);
            console.log("result:" + response.data.token);
            //const token = response.data.token;
            this.$store.commit("setToken", response.data.token);
            alert("logged in successfully");
            this.$router.push(`/profile/${data.Email}`);
          })
          .catch(e => {
            console.log(e.response);
            if (e.response.status == 401) {
              alert(e.response.data.failed);
            } else {
              alert(e.response.data.Error);
            }
          });
        //);
      }
    },
    show: function(){
      var x = document.getElementById("Password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
        // login: function() {
    //   this.$validator
    //     .validateAll()
    //     .then(result => {
    //       if (!result) {
    //         //alert("error Enter the All Details");
    //         return;
    //       }
    //     })
    //     .catch(() => {});
    //   //console.log('login')
    //   let payload = {
    //     Email: this.item.Email,
    //     Password: this.item.Password
    //   };
    //   //console.log(payload.Email,payload.Password)
    //   this.$store.dispatch("loginData", payload);
    //   console.log(this.$store.state.err === "");
    //   if (this.$store.state.err === "") {
    //     console.log("ifff");
    //     alert("Unauthorized Access");
    //   } else {
    //     console.log("elseee");
    //     this.$router.push(`/profile/${payload.Email}`);
    //   }
    // },
  }
};
</script>

<style scoped>
</style>

