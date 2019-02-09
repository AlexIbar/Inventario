<template>
   <div>
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
            <div class="icono-client"></div>
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
               dir:'Cl. 62 #44-77'
            },
            {
               name:'Logistral S.A',
               nit:'890903930-5',
               fecha:'7/02/2019',
               dir:'Cl. 62 #44-77'
            },
            {
               name:'Coca-cola S.A',
               nit:'890903932-5',
               fecha:'7/02/2019',
               dir:'Cl. 62 #44-77'
            },
            {
               name:'Logistral S.A',
               nit:'890903930-3',
               fecha:'7/02/2019',
               dir:'Cl. 62 #44-77'
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
      padding: 10px 10px 50px 10px;
      border-radius: 5px;
      position: relative;
      margin:5px;
   }
   .ref-client{
      font-size: 16px;
      font-weight: bold
   }
   .icono-client{
      width: 40px;
      height: 40px;
      background-image: url(../../assets/plus.svg);
      border-radius: 100%;
      position: absolute;;
      right: 10px;
      background-repeat: no-repeat;
      background-size: 40px 40px
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
</style>
