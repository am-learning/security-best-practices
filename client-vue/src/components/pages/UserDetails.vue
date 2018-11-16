<template>
    <div id="details" class="page-background">
        <nav-bar/>
        <div id="page-content"> 
            <h2>User Details</h2>            
            <div class="container">  
                <hr>
                <div class="row">
                    <div class="col-md-10 offset-1">
                        <form class="text-left search-form">
                            <div class="row form-group">
                                <div class="col-md">
                                 
                                    <label for="firstName">First Name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="(First Name)">
                                    
                                </div>

                                <div class="col-md">
                                    
                                    <label for="lastName">First Name</label>
                                    <input type="text" class="form-control" id="lastName" placeholder="(Last Name)">
                                    
                                </div>                            
                            </div>

                            <div class="row form-group">
                                <div class="col-md">
                                    <label for="email">Email</label>
                                    <input type="text" class="form-control" id="email" placeholder="(Email)">
                                </div>

                                <div class="col-md">
                                    <label for="phone">Phone Number</label>
                                    <input type="text" class="form-control" id="phone" placeholder="(---/---/----)">
                                </div>                            
                            </div>

                            <div class="row form-group">                                
                                <input type="button" value="Update" class="form-control uniform-width" @click.prevent="updateUser">                                
                            </div>
                        </form>
                    </div>
                </div>                     
                <hr>        
            </div> 
        </div>
    </div>
</template>

<script>
export default  {
    data() {
        return{

        }
    },
    methods:{
        updateUser: function(){
            console.log(`This will update the Registered User's personal Data`)
        }
    }
}

</script>


<style scoped>
.search-form{font-size: medium;}
.search-form .form-control{
    border-bottom: 1px solid #efefef;  
    box-shadow: 0 0 0;
    border-radius: 0;
    background: transparent;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    height:auto;
} 
.search-form input[type=button]{
    margin: 10px auto;
    background: #f05837;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
    border: 0;
}
hr{background-color: #f05837;}


::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #f05837;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color: #f05837;
   opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color: #f05837;
   opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color: #f05837;
}
::-ms-input-placeholder { /* Microsoft Edge */
   color: #f05837;
}

::placeholder { /* Most modern browsers support this now. */
   color: #f05837;
}

</style>