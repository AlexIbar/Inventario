<template>
   <div>
      <h1 class="titleUno">Sign Up</h1>
      <form @onsubmit.prevent="enviar()">
         <div class="entrada-login" v-for="(i, key) in ingre" :key="key">
            <input :type="i.tipo" required :id="i.id" v-model="i.intro">
            <label :for="i.id" :class="i.intro !== ''? 'log-acept' : ''">{{i.id}}...</label>
         </div>
         <div style="position:relative; height:100px">
            <div class="btn-env-father" style="right:0px;bottom:10px">
            <div class="btn-env">
               Aceptar
               <input type="submit">
            </div>
         </div>
         </div>
      </form>
   </div>
</template>
<script>
export default {
   data(){
      return{
         ingre:[
            {
               id:'Name',
               modelo:'datos.name',
               tipo:'text',
               intro:''
            },
            {
               id:'Nit',
               modelo:'datos.nit',
               tipo:'text',
               intro:''
            },
            {
               id:'Tel',
               modelo:'datos.tel',
               tipo:'number',
               intro:''
            },
            {
               id:'Email',
               modelo:'datos.email',
               tipo:'email',
               intro:''
            },
            {
               id:'Contraseña',
               modelo:'datos.pass',
               tipo:'password',
               intro:''
            }
         ],
         intro:{
            name:'',
            nit:'',
            tel:null,
            email:'',
            pass:''
         }
      }
   }
}
</script>