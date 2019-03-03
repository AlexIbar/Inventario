<template>
   <div>
      <h1 class="titleUno">Sign Up</h1>
      <form @submit.prevent="enviar">
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
         ]
      }
   },
   methods:{
      enviar(){
         let intro = {
            name:this.ingre[0].intro,
            nit:this.ingre[1].intro,
            tel:this.ingre[2].intro,
            email:this.ingre[3].intro,
            pass:this.ingre[4].intro
         }
         this.$db.post('usuarios', intro).then(()=>{
            this.$router.push('/login/signIn')
         })
         return false
      }
   }
}
</script>