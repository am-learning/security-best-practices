<template>
    <div id="login">
        <div class="container login-container">
            <div class="row">
                <div class="col-md-6 login-form">
                    <h3>Login</h3>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="(email)" ref="login" v-model="existingUser.username"/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="(password)" v-model="existingUser.password"/>
                        </div>
                        <div class="form-group">
                            <input type="button" class="btnSubmit" value="Login" @click="login"/>
                        </div>
                        <div class="form-group">
                            <a href="#" class="btnForgetPwd">Forget Password?</a>
                        </div>
                    </form>
                </div>
                <div class="col-md-6 register-form">
                    <div class="login-logo">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                    </div>
                    <h3>Register</h3>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Email *" v-model="newUser.username" />
                        </div>
                        <div class="input-group mb-3">
                            <input :type="passwordField" class="form-control" placeholder="Your Password *" v-model="newUser.password" />
                            <div class="input-group-append">
                                <span class="input-group-text" id="show-password">
                                    <i class="fa" :title="passwordTitle"
                                    :class="{'fa-eye': passwordField == 'password', 
                                             'fa-eye-slash': passwordField == 'text'}" 
                                    @click="toggleVisibility" ></i>
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="button" class="btnSubmit" value="Register" @click="register"/>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
				existingUser: {
					username: '',
					password: ''
                },
                newUser: {
					username: '',
                    password: ''
                },
                passwordField: 'password',
                passwordTitle: 'Reveal Password'              
			}
        },
        mounted(){
            this.$refs.login.focus()  // not working perfectly
        },
		methods:{
            
			login: async function(){
                //console.log(this.existingUser)
                const response = await this.$server().post('login', this.existingUser)
                // warning: the shorthand notation axios.post() might not be sending the correct header (auth) or information (username, pwd, token etc)
                // might need to use axios({mehtod: post, ...})
                console.log(response)
                if (response.data.authenticated && response.data.authenticated == true){
                    // save the user in the session storage for global access
                    let user = {
                        token: response.data.token,
                        isAuthenticated: response.data.authenticated
                    }
                    sessionStorage.setItem('user', JSON.stringify(user))

                    // navigate to the home page
                    this.$router.push('reviews')
                }else{
                    console.log("could not log in")
                    //this.$router.push('login-error')
                }				
            },
            register: async function(){
				const response = await this.$server().post('register', this.newUser)
				console.log(response)
                if (response.data.registered){
                    this.registered = true
                    this.server_response = `User '${this.newUser.username}' is Successfully Registered`
                }else{
                    this.registered = false
                    this.server_response = `User '${this.newUser.username}' was not Registered. ${response.data.message}.`
                }
                this.$toastr.i(this.server_response)	
                // navigate to the home page
                this.$router.push('user-details')			
			},
            toggleVisibility: function(){
                this.passwordField = this.passwordField === 'password'? 'text':'password'
                this.passwordTitle = this.passwordField === 'password'? 'Reveal Password':'Hide Password'
            }
		}
	}
</script>

<style scoped>
.login-container{
    margin-top: 5%;
    margin-bottom: 5%;
}
.login-logo{
    position: relative;
    margin-left: -41.5%;
}
.login-logo img{
    position: absolute;
    width: 20%;
    margin-top: 20%;
    background: #282726;
    border-radius: 4.5rem;
    padding: 5%;
    left: 0;
}
.login-form{
    padding: 9%;
    background:#282726;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form h3{
    text-align: center;
    margin-bottom:12%;
    color:#fff;
}
.register-form{
    padding: 9%;
    background: #f05837;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.register-form h3{
    text-align: center;
    margin-bottom:12%;
    color: #fff;
}
.btnSubmit{
    font-weight: 600;
    width: 50%;
    color: #282726;
    background-color: #fff;
    border: none;
    border-radius: 1.5rem;
    padding:2%;
}
.btnForgetPwd{
    color: #fff;
    font-weight: 600;
    text-decoration: none;
}
.btnForgetPwd:hover{
    text-decoration:none;
    color:#fff;
}
</style>