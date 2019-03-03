<template>
   <div>
      <h1 class="titleUno">Sign In</h1>
      <form @submit.prevent="enviar">
         <div class="entrada-login">
            <input type="email" required v-model="log.email" id="correo">
            <label for="correo" :class="log.email !== '' ? 'log-acept' : ''">Email...</label>
         </div>
         <div class="entrada-login">
            <input type="password" required v-model="log.pass" id="pass">
            <label for="pass" :class="log.pass !== '' ? 'log-acept' : ''">Contraseña...</label>
         </div>
         <div class="info-log">
            ¿Olvidaste la contraseña?
         </div>
         <div class="btn-env-father">
            <div class="btn-env">
               Aceptar
               <input type="submit">
            </div>
         </div>
      </form>
   </div>
</template>
<script>
export default {
   data(){
      return{
         log:{
            email:'',
            pass:''
         }
      }
   },
   methods:{
      enviar(){
         if(this.validateEmail){
            this.$db.get('usuarios', {email:this.log.email, pass:this.log.pass}).then((response)=>{
               if(response[0]){
                  if(response[0].email === this.log.email){
                     let f = {
                        email:response[0].email,
                        name:response[0].name,
                        nit:response[0].nit,
                        tel:response[0].tel
                     }
                     sessionStorage.setItem('contResolv', JSON.stringify(f))
                     this.$router.push('/')
                  }
               }else{
                  console.log('fdd')
               }
            })
         }
         return false
      },
      validateEmail() {
         let re = /\S+@\S+\.\S+/;
         return re.test(this.log.email);
      }
   }
}
</script>