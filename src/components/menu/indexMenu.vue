<template>
   <div>
      <div class="barra-superior">
         <div>
            <img v-if="$mq == 'lg' || $mq == 'md'" src="../../assets/logo.svg" width="50px">
            <img @click="mostrar($event)" v-if="$mq == 'sm'" src="../../assets/iconfinder-icon.svg" width="50px">
         </div>
         <div class="links-horizontal" v-if="$mq !== 'sm'">
            <router-link v-for="li in links" :key="li.name" :to="li.path" exact>
               <img :src="'./'+li.image" alt="" width="20px">{{li.name}}
            </router-link>
         </div>
      </div>
      <div v-if="$mq == 'sm'" @touchstart="inicio($event)" @touchmove="moviendo($event)" @touchend="final($event)" 
      :class="visible ? 'barra-lateral barra-lateral-activo' : 'barra-lateral oculto-menu'">
         <div class="content-link-lateral">
            <img src="../../assets/logo.svg" width="80px">
            <router-link v-for="li in links" :key="li.name" :to="li.path" exact>
               <img :src="'./'+li.image" alt="" width="20px">{{li.name}}
            </router-link>
         </div>
         <div @click="ocultar($event)" :class="moviendose ? 'lateral-claro' : 'lateral-oscuro'"></div>
      </div>
   </div>
</template>
<script>
export default {
   data(){
      return{
         links:[
            {
               path:'/',
               image:'home.png',
               name:'Inicio'
            },
            {
               path:'/lotes',
               image:'lote.png',
               name:'Lotes'
            },
            {
               path:'/clientes',
               image:'client.png',
               name:'Clientes'
            },
            {
               path:'/factura',
               image:'factura.png',
               name:'Factura'
            },
         ],
         moviendose:true,
         inicioT:null,
         visible:false
      }
   },
   methods:{
      inicio(e){
         this.inicioT = e.touches[0].clientX
         e.target.parentElement.style.transition ='left 0s'
      },
      moviendo(e){
         this.moviendose = true;
         let padre = e.target.parentElement,
         //distancia = padre.getBoundingClientRect().left,
         dif = this.inicioT-e.touches[0].clientX;
         if(dif > 0){
            padre.style.left='-'+dif+'px'
         }
      },
      final(e){
         let padre = e.target.parentElement,
         leftAct = padre.getBoundingClientRect().left,
         porcentaje = ((leftAct*(-1))*100)/280;
         padre.style.transition ='left .5s'
         if(porcentaje>30){
            padre.style.left = '-280px'
            this.visible = false
         }else{
            padre.style.left = '0px'
            this.moviendose = false
         }
      },
      mostrar(e){
         this.visible=true
         this.moviendose = false;
         e.target.parentElement.parentElement.parentElement.childNodes[1].style.left="0px"
      },
      ocultar(e){
         this.visible=false
         this.moviendose = true;
         e.target.parentElement.parentElement.childNodes[1].style.left="-280px"
      }
   }
}
</script>
<style>
   .barra-superior{
      width:100%;
      height:50px;
      box-shadow:0px 3px 5px grey;
      position: fixed;
      z-index: 200;
      background-color: var(--naranja);
      display: flex;
      justify-content: space-between
   }
   .barra-superior>:nth-child(2){
      display: flex;
   }
   .links-horizontal{
      display: flex;
      justify-content: flex-end;
      align-items: center;
   }
   .links-horizontal a{
      text-decoration: none;
      color: var(--content-text);
      padding: 5px;
      margin: 2px;
      font-size: 16px
   }
   .barra-lateral{
      height: 100vh;
      position: fixed;
      z-index: 3000;
      transition: 'left .5s'
   }
   .barra-lateral-activo{
      width: 100%;
      display: grid;
      grid-template-columns: 280px 1fr;
   }
   .lateral-oscuro{
      background-color: rgba(0,0,0,.5)
   }
   .lateral-claro{
      background-color: rgba(0,0,0,.0)
   }
   .content-link-lateral{
      background-color: var(--content-oscuro);
      width: 280px;
      height: 100vh;
      display: flex;
      flex-direction: column
   }
   .content-link-lateral>img{
      display: block;
      margin:5px auto
   }
   .content-link-lateral a{
      text-decoration: none;
      margin: 2px;
      padding: 5px 0px;
      font-size: 18px;
      color: white
   }
   .content-link-lateral a img{
      margin-left:5px;
      margin-right: 5px;
   }
   .oculto-menu{
      left: -280px;
   }
</style>