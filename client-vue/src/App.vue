<template>
  <div id="app">
    <div class="logo" hidden><img src="./assets/logo.png"></div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // toastr settings (https://www.npmjs.com/package/vue-toastr)
    this.$toastr.defaultTimeout = 5000
    this.$toastr.defaultPosition = 'toast-top-center'
    this.$toastr.defaultProgressBar = false
		},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 98.7vw;
  left: 0;
}
.logo{
  background: #427b8d;
}
</style>
