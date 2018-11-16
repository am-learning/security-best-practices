<template>
    <div id="details" class="page-background">
        <nav-bar/>
        <div id="page-content"> 
            <h2>User Details</h2>
            <div class="container border">                       
                <form id="search-form" class="text-left">
                    <div class="row">
                        <div class="col-5 col-offset-1 form-group">
                            <div class="mp">
                                <label for="firstName">First Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="(First Name)">
                            </div>
                        </div>
                        <div class="col-md-5 form-group">
                            <div class="mp">
                                <label for="lastName">First Name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="(Last Name)">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-5 form-group">
                            <div class="mp">
                                <label for="email">Email</label>
                                <input type="text" class="form-control" id="email" placeholder="(Email)">
                            </div>
                        </div>
                        <div class="col-md-5 form-group">
                            <div class="mp">
                                <label for="phone">Phone Number</label>
                                <input type="text" class="form-control" id="phone" placeholder="(---/---/----)">
                            </div>
                        </div>
                    </div>
                </form>                
            </div> 
        </div>
    </div>
</template>

<style scoped>
#search-form{
    font-size: medium;
}
#search-form .form-group {
    margin-bottom: 10px;
    border-bottom: 1px solid #efefef;
    position: relative;
}
#search-form .form-control{
    border: 0;
    box-shadow: 0 0 0;
    border-radius: 0;
    background: transparent;
    height:auto;
}
.form-group{
    margin: 0 1vw;
}
.mp{
    padding:0 10px;
}

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