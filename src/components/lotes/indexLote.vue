<template>
   <div>
      <div class="informacion-lotes">
         <div class="targeta-lotes" v-for="lot in lotes" :key="lot.ref">
            <div class="content-targeta" :style="{backgroundColor:color()}">
               <div><span>Ref: </span>{{lot.ref}}</div>
               <div><span>Lote cliente: </span>{{lot.lote}}</div>
               <div><span>Cantidad: </span>{{lot.cantidad}}</div>
               <div><span>Cliente:</span> {{lot.cliente}}</div>
               <div class="verAddPage" @click="activo === lot.ref ? activo = null : activo = lot.ref">
                  <svg :style="activo === lot.ref ? {transform:'rotate(180deg)'} :{}" width="40px" height="40px">
                  <path d="M0 0 L20 30 L40 0" fill="none" stroke="white" stroke-width="3"/>
                  <path d="M0 8 L20 38 L40 8" fill="none" stroke="white" stroke-width="3"/>
                  </svg>
               </div>
            </div>
            <div v-if="activo == lot.ref" class="parent-info-add-targeta">
               <div class="info-add-targeta">
                  <div class="cerrar-cli" @click="activo = null"></div>
                  <img :src="lot.foto">
                  <div><span>Fecha almacenamiento: </span>{{lot.fecha | fecha}}</div>
                  <div><span>Pendiente: </span>{{lot.pendiente}}</div>
                  <router-link tag="div" :to="'/viewLot?ref='+lot.ref" class="verMas">Visitar</router-link>
               </div>
            </div>
         </div>
      </div>
      <div class="agregar-cli" @click="$router.push('/agregarLote')"></div>
   </div>
</template>
<script>
export default {
   data(){
      return{
         activo:null,
         lotes:[]
      }
   },
   mounted(){
      this.$db.getAll('lotes').then((response)=>{
         this.lotes = response
      })
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
   },
   filters:{
      fecha(dat){
         return new Date(parseInt(dat)).toLocaleDateString()
      }
   }
}
</script>
<style>
.informacion-lotes{
   display: flex;
   flex-wrap: wrap;
   justify-content: center
}
   .targeta-lotes{
      width: 270px;
      margin: 2px
   }
   .content-targeta{
      box-sizing: border-box;
      padding: 10px;
      border-radius: 10px;
      display: flex;
      flex-direction: column
   }
   .targeta-lotes span{
      font-weight: bold;
      font-size: 16px;
   }
   .info-add-targeta{
      background-color: #cccccc;
      box-sizing: border-box;
      padding-bottom: 10px;
      display: flex;
      flex-direction: column;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius:10px;
      position: relative;
   }
   .info-add-targeta>div{
      padding:3px 10px
   }
   .info-add-targeta img{
      width: 98%;
      display:block;
      margin: auto;
      height: 100px;
      object-fit: cover;
      object-position: top
   }
   .verMas{
      width: 150px;
      height: 38px;
      border: 3px solid var(--naranja);
      text-align: center;
      font-size: 16px;
      border-radius: 10px;
      color: var(--naranja);
      box-shadow: -2px 5px 10px var(--content-text);
      align-self: flex-end;
      margin: 5px;
      background-color: aliceblue;
      cursor: pointer;
      user-select:none;
      display: flex;
      justify-content: center;
      align-items: center;
      position:relative
   }
   .verAddPage{
      width: 40px;
      height: 40px;
      align-self: center
   }
   
   @media(max-width:547px){
      .targeta-lotes{
         width: 93%
      }
   }
   @media(min-width:548px){
      .info-add-targeta{
         padding-top: 10px;
         border-radius: 10px;
         width: 400px
      }
      .parent-info-add-targeta{
         width: 100%;
         height: 100vh;
         background-color: rgba(0,0,0,.5);
         z-index: 300;
         position: fixed;
         top: 50%;
         left:50%;
         transform: translate(-50%,-50%);
         display: flex;
         justify-content: center;
         align-items: center
      }
      .cerrar-cli{
         width: 35px;
         height: 35px;
         border-radius: 50%;
         position: absolute;
         right: -20px;
         top: -20px;
         background-color: red;
         background-size: 20px;
         background-position: center;
         background-repeat: no-repeat;
         cursor: pointer
      }
   }
</style>
