<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>

    <footer class="footer is-primary">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <font-awesome-icon :icon="['fab', 'facebook-f']" class="social-media-icons"/>
            <font-awesome-icon :icon="['fab', 'twitter']" class="social-media-icons"/>
            <font-awesome-icon :icon="['fab', 'github']" class="social-media-icons"/>
            <font-awesome-icon :icon="['fab', 'linkedin-in']" class="social-media-icons"/>            
          </div>
        </div>  
        <div class="row copy-rights">
            <div class="col-md-12">Copyright © 2018 Ash Martin, All rights reserved. </div>              
        </div>
      </div>
    </footer>
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
  color: white;
  background: url("./assets/images/grey-1.jpg") no-repeat center fixed;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  left: 0;
}

.footer{
  position: fixed;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
  top: 90vh;
  height: 10vh;
  width: 100vw;
  color: #f05837;
  padding-top: 10px;
}
.copy-rights{font-size: medium;}
.social-media-icons{
  margin: 3px 15px 5px;
  font-size: larger;
}
</style>
