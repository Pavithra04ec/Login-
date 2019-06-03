<template>
  <div>
    <h1>DASHBOARD</h1>
    <button   @click="timeout();onClick()" style="margin:5px;" >Home</button>
    <!-- <button  @click="onProductDetails()" style="margin:5px;">Go To Add user</button> -->
    <div class="text-center">
      <b-spinner v-if="showSpinner" variant="primary" v-show="showSpinner"></b-spinner>
    </div>
  </div>
</template>
<script>
export default {
    name: "home",
   
  data(){
    return{
       showSpinner:false,
    }
  },
methods:{
  onClick(){
    this.$router.push('/user');
  },
  onProductDetails(){
    this.$router.push({path:`/user/add`});
  },
  timeout: function() {
      console.log('hello')
      setTimeout(() =>{
        console.log("world")
        this.showSpinner=true;
      },10000)
    }
}
}
</script>

<style>
</style>