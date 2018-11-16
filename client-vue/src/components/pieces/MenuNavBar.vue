<template>
    <nav class="navbar navbar-expand-xl navbar-dark bg-dark"> <!-- navbar-dark bg-dark -->
        <a class="navbar-brand" href="/reviews">Security Best Practices</a>
        <button class="navbar-toggler" type="button" 
                data-toggle="collapse" data-target="#navbarCollapse" 
                aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/reviews" class="nav-link" >
                        <font-awesome-icon icon="comments"/><span class="textleft"> Reviews</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/movies" class="nav-link">
                        <font-awesome-icon icon="film"/><span class="textleft"> Movies</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/user-details" class="nav-link">
                        <font-awesome-icon icon="user-edit"/><span class="textleft">User Details</span>
                    </router-link>
                </li>
                <li class="nav-item dropdown">
                    <router-link to="#" class="nav-link dropdown-toggle" id="dropdown" data-toggle="dropdown">
                        <font-awesome-icon icon="cogs"/><span class="textleft">Settings</span>
                    </router-link>
                    <div class="dropdown-menu" aria-labelledby="dropdown">
                        <a id="light" class="dropdown-item" @click="switch_style('light')" href='#'>
                            <font-awesome-icon icon="sun" /><span class="textleft"> Light Theme</span>
                        </a>
                        <a id="dark"  class="dropdown-item" @click="switch_style('dark')" href='#'>
                            <font-awesome-icon icon="moon" /><span class="textleft"> Dark Theme</span>
                        </a>
                        <a class="dropdown-item" @click="logout" href="#">
                            <font-awesome-icon icon="sign-out-alt" /><span class="textleft"> Logout</span>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
	export default {
		data: function(){
			return{
            
			}
		},
		methods: {
			logout: function() {
				console.log('logout')
                // TODO: loging out doesnt clear the data in different pages
				sessionStorage.removeItem('user')
				this.$router.push({name: 'Login'})
            }
		}
	}
</script>

<style scoped>
    .navbar{position: fixed; min-height: 10vh; width: 100vw; left: 0; z-index: 1000;}
    .no-padding{padding: 0;}
    .nav-item{padding-left: 3vw; }
    .textleft{padding-left: 20px;}
    .nav-link{color: #f05837 !important; text-align: left;}
    .dropdown-menu{font-size: smaller; /* background-color: inherit; border: 0 !important; */}
    .dropdown-item{text-align: left; color: #f05837 !important; }
</style>