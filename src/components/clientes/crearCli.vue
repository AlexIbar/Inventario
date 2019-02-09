<template>
   <div class="content-add-cli">
      <h1>Crear cliente</h1>
      <form @submit.prevent="enviar" class="formulario-client">
         <input type="text" required placeholder="Nombre..." v-model="datos.nombre">
         <input type="text" required placeholder="Nit..." v-model="datos.nit">
         <input type="text" required placeholder="Telefono..." v-model="datos.tel">
         <input type="text" required placeholder="Dirección..." v-model="datos.dir">
         <textarea placeholder="Servicio ofrecido..." v-model="datos.serv"></textarea>
         <div class="btn-add-cli">
            <input type="submit">
            Aceptar
         </div>
      </form>
   </div>
</template>
<script>
export default {
   data(){
      return{
         datos:{
            nombre:'',
            nit:'',
            tel:'',
            dir:'',
            serv:''
         }
      }
   },
   methods:{
      enviar(){

      }
   }
}
</script>
<style>
   .formulario-client{
      max-width:400px;
      margin:10px auto;
      display:flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 10px;
   }
   .formulario-client>input{
      height: 40px;
   }
   .formulario-client>input, .formulario-client>textarea{
      font-size: 16px;
      padding: 5px;
      border: none;
      border:1px solid grey;
      margin: 10px 3px;
      background:none;
      border-radius: 10px;
      color: var(--naranja)
   }
   .formulario-client>textarea{
      min-height: 100px
   }
   .content-add-cli{
      width: 100%;
      height: 100vh;
      background-image:linear-gradient(rgba(0,0,0,.5), black), url(../../assets/form.jpg);
      background-size: 100% 100%;
      padding-top: 70px;
      position: absolute;
      left: 0px;
      top: -0px
   }
   .content-add-cli h1{
      text-align: center;
      width: 200px;
      margin: auto;
      font-size: 20px;
      color: white;
      background-color: var(--content-text);
      padding:10px 0px;
   }
   .btn-add-cli{
      background-color: var(--naranja);
      font-size: 20px;
      text-align: center;
      box-sizing: border-box;
      padding: 7px;
      border-radius: 10px;
      color: white;
      box-shadow: 0px 5px 10px grey;
      position: relative;
      margin-top: 20px
   }
   .btn-add-cli input{
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0px;
      top:0px;
      border-radius: 10px;
      bottom: 0px;
      right: 0px;
      opacity: 0;
   }
</style>