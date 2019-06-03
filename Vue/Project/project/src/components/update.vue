<template>
<div>
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
          <label for="input-default">Gender:</label>
        </b-col>
        <b-col sm="4">
        <b-form-radio-group id="Gender" v-validate="'required'" name="Gender" v-model="form.Gender">
          <b-form-radio value="Male">Male</b-form-radio>
          <b-form-radio value="Female">Female</b-form-radio>
        </b-form-radio-group>
        <span>{{ errors.first('Gender') }}</span>
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
          placeholder="Enter MobileNo"
        ></b-form-input>
        <span>{{ errors.first('MobileNo') }}</span>
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
          placeholder="Enter email"
        ></b-form-input>
        <span>{{ errors.first('Email') }}</span>
      </b-col>
      </b-row>
     <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default" description="Give your strong password">Password:</label>
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
          placeholder="Enter your Password"
        ></b-form-input>
        <span>{{ errors.first('Password') }}</span>
      </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">ConfirmPassword:</label>
        </b-col>
        <b-col sm="4">
        <b-form-input
          id="ConfirmPassword"
          v-validate="'required|confirmed:Password'"
          v-model="form.ConfirmPassword"
          type="password"
          name="ConfirmPassword"
          required
          placeholder="Password again"
        ></b-form-input>
        <span>{{ errors.first('ConfirmPassword') }}</span>
      </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default" description="Select any one">Country:</label>
        </b-col>
        <b-col sm="4">
        <b-form-select id="Country"  v-validate="'required'" name="Country" v-model="form.Country" :options="Countries" required></b-form-select>
        <span>{{ errors.first('Country') }}</span>
     </b-col>
      </b-row>
       <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default" description="Known languages.">Language:</label>
        </b-col>
        <b-col sm="4">
        <b-form-checkbox-group  v-validate="'required'" name="Language" v-model="form.Language">
          <b-form-checkbox value="Tamil">Tamil</b-form-checkbox>
          <b-form-checkbox value="English">English</b-form-checkbox>
          <b-form-checkbox value="Hindi">Hindi</b-form-checkbox>
          <b-form-checkbox value="Telugu">Telugu</b-form-checkbox>
          <b-form-checkbox value="Malayalam">Malayalam</b-form-checkbox>
        </b-form-checkbox-group>
        <span>{{ errors.first('Language')}}</span>
     </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="4">
          <label for="input-default">DOB:</label>
        </b-col>
        <b-col sm="4">
        <b-form-input
          id="DOB"
          v-validate="'required'"
          v-model="form.DOB"
          format="yyyy-MM-dd" type="date" 
          name="DOB"
          required
          placeholder="Give your Date of Birth"
        ></b-form-input>
        <span>{{ errors.first('DOB') }}</span>
      </b-col>
      </b-row>
      <b-button @click="errorfn()" class="button" variant="primary">Update</b-button>
    </b-container>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "update",
  data() {
    return {
       id : this.$route.params.id,
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
        DOB:""
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
    this.getDataById(this.$route.params.id);
  },
  methods: {
    getData: function() {
      this.showTable = true;
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
        });
    },
    getDataById: function(id) {
      axios({
        method: "GET",
        url: `http://localhost:5000/api/get/${id}`
      })
        .then(response => {
         let splitArr = this.arr[0].Language.split(',');
         console.log(splitArr);
          console.log(response)
          this.arr = response.data;
          this.form.id =this.arr[0].id;
         this.form.Name =this.arr[0].Name;
         this.form.Gender =this.arr[0].Gender; 
         this.form.MobileNo =this.arr[0].MobileNo;
         this.form.Email=this.arr[0].Email;         
         this.form.Password =this.arr[0].Password;
         this.form.ConfirmPassword =this.arr[0].ConfirmPassword;
         this.form.Language = splitArr;
         this.form.Country =this.arr[0].Country;
         this.form.DOB = this.arr[0].DOB;
            })
        .catch(() => {
          //console.error(e)
        });
    },
    errorfn : function (){
      if(!this.form.Name | 
      !this.form.Gender | 
      !this.form.MobileNo |
      !this.form.Email |
      !this.form.Password |
      !this.form.ConfirmPassword |
      !this.form.ConfirmPassword |
      !this.form.Country |
      !this.form.Language |
      !this.form.DOB){
        return;
      }
      else{
        this.updateDatas();
      }
    },
    updateDatas: function(form) {
      var Id = this.form.id;
      var data = {
        Name: this.form.Name,
        Gender: this.form.Gender,
        MobileNo: this.form.MobileNo,
        Email: this.form.Email,
        Password: this.form.Password,
        ConfirmPassword: this.form.ConfirmPassword,
        Country: this.form.Country,
        Language: this.form.Language,
        DOB: this.form.DOB
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
          this.$router.go(-1);
          this.$router.push('/user');
          alert("updated successfully");
        })
        .catch(e => {
          console.log(e);
          alert("There is a problem in updating..")
        });
    },
  }
};
</script>