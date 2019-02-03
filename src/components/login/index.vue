<template>
   <article>
      <div class="father-link-login">
         <router-link to="signIn" exact>Sign In</router-link>
         <router-link to="create" exact>Sign Up</router-link>
      </div>
      <div class="content-subNav">
         <router-view></router-view>
      </div>
   </article>
</template>
<style>
.content-subNav{
   width: 100%;
   min-height: 80vh;
   display: flex;
   justify-content: center;
   align-items:center;
   box-sizing: border-box
}
.content-subNav>div{
   width: 100%;
   max-width:500px;
   min-height:350px;
   background-color:#EFF1F3;
   border-radius: 10px;
   border:1px solid #e0dddd;
   padding: 50px;
   box-sizing: border-box;
   position: relative;
}

   .router-link-active{
      text-decoration: none;
      padding: 5px 10px !important;
      color: white !important;
      background-color: #068ffb;
      border-radius: 5px;
   }
   .father-link-login{
      display: flex;
      justify-content: flex-end;
      max-width: 1100px;
      margin: auto
   }
   .father-link-login *{
      text-decoration: none;
      padding:5px 3px;
      color: black;
   }

.entrada-login{
   height: 56px;
   width:100%;
   display: flex;
   align-items: flex-end;
   position: relative;
}
.entrada-login input{
   width: 100%;
   outline: none;
    background:none;
    border:none;
    border-bottom: 1px solid grey;
    height: 30px;
    font-size: 18px ;
}
.entrada-login label{
   position: absolute;
   color: grey;
   bottom: 7px;
   font-size: 18px
}
.entrada-login input:focus ~ label{
   top: 10px;
   bottom: 33px;
   transition: font-size .05s;
   font-size: 14px;
   color: #068ffb
}
.log-acept{
   top:10px;
   font-size: 14px !important;
}
.btn-env-father{
   position:absolute;
   bottom: 50px;
   right: 50px;
   width: 150px;
   background-color: #068ffb;
   color: white;
   text-align: center;
   padding: 7px;
   font-size: 20px;
   border-radius: 5px
}
.btn-env{
   position: relative;
}
.btn-env input{
   position: absolute;
   top: 0px;
   left: 0px;
   bottom: 0px;
   right: 0px;
   width: 100%;
   opacity: 0;
}
@media only screen and (max-width: 500px) {
  .content-subNav>div{
     padding: 15px
  }
  .btn-env{
     right: 15px;
     bottom: 15px;
  }
}
.info-log{
   color: #068ffb;
   background-color: #e0dddd;
   margin: 5px 0px;
   padding: 5px;
   width: 170px;
   border-radius: 3px;
   user-select: none
}
.titleUno{
   text-align: center
}
</style>
