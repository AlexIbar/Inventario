<template>
   <div class="parent-general-client">
      <div class="general-client">
         <div class="datos-cli" :style="{backgroundColor:color()}" v-for="cli in clientes" :key="cli.nit">
            <div>
               <span class="ref-client">Nombre: </span><span>{{cli.name}}</span>
            </div>
            <div>
               <span class="ref-client">Nit: </span><span>{{cli.nit}}</span>
            </div>
            <div>
               <span class="ref-client">Fecha ing: </span><span>{{cli.fecha}}</span>
            </div>
            <div>
               <span class="ref-client">Dir: </span><span>{{cli.dir}}</span>
            </div>
            <div>
               <span class="ref-client">Tel: </span><span>{{cli.tel}}</span>
            </div>
            <div>
               <span class="ref-client">Serv: </span><span>{{cli.servicio}}</span>
            </div>
         </div>
      </div>
      <div @click="cambioPath" class="agregar-cli"></div>
   </div>
</template>
<script>
export default {
   data(){
      return{
         clientes:[
            {
               name:'Postobon S.A',
               nit:'890903939-5',
               fecha:'7/02/2019',
               dir:'Cl. 62 #44-77',
               tel:'213242424',
               servicio:'Jean'
            },
            {
               name:'Logistral S.A',
               nit:'890903930-5',
               fecha:'7/02/2019',
               dir:'Cl. 62 #44-77',
               tel:'2424242433',
               servicio:'Camisa'
            },
            {
               name:'Coca-cola S.A',
               nit:'890903932-5',
               fecha:'7/02/2019',
               dir:'Cl. 62 #44-77',
               tel:'22343534',
               servicio:'Sudaderas'
            },
            {
               name:'Logistral S.A',
               nit:'890903930-3',
               fecha:'7/02/2019',
               dir:'Cl. 62 #44-77',
               tel:'242424233',
               servicio:'Busos'
            }
         ]
      }
   },
   methods:{
      color(){
         let hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F") 
         let color_aleatorio = "#"; 
         for (let i=0;i<6;i++){ 
            color_aleatorio += hexadecimal[Math.floor(Math.random()*16)] 
         } 
         return(color_aleatorio)
      },
      cambioPath(){
         this.$router.push('/crearCliente')
      }
   }
}
</script>
<style>
   .general-client{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      max-width: 900px;
      margin: 10px auto;
      grid-gap: 1px
   }
   .general-client>div{
      width:280px;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 5px;
      position: relative;
      margin:5px;
   }
   .ref-client{
      font-size: 16px;
      font-weight: bold
   }
   .agregar-cli{
      width:50px !important;
      height:50px;
      border-radius:50%;
      background-color:var(--naranja);
      background-image:url(../../assets/plus.svg);
      position:fixed;
      right:20px;
      bottom:20px;
      background-position:center;
      background-repeat:no-repeat;
      background-size:25px;
      box-shadow:-2px 5px 10px grey
   }
   .parent-general-client{
      padding-bottom: 55px
   }
</style>
