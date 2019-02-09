<template>
   <div class="menu-sup">
      <div class="men-sup-sub">
         <div @click="lateral.left='0px',tocar=true" class="pequeno imagenes-menu" v-if="$mq === 'sm'">
            <img src="../../assets/iconfinder-icon.svg" alt="">
         </div>
         <div class="grande imagenes-menu" v-if="$mq === 'md' || $mq === 'lg'">
            <img src="../../assets/logo.svg" width="50px" alt="">
         </div>
         <div class="links" v-if="$mq === 'md' || $mq === 'lg'">
               <router-link to="/" exact>
                  <img src="..//../assets/home.png" alt=""><span>Inicio</span>
               </router-link>
               <router-link to="/lotes" exact>
                  <img src="../../assets/lote.png" alt=""><span>Lotes</span>
               </router-link>
               <router-link to="/clientes" exact>
                  <img src="../../assets/client.png" alt=""><span>Clientes</span>
               </router-link>
                  <router-link to="/factura" exact>
                     <img src="../../assets/factura.png" width="20px" height="25px" alt=""><span>Facturar</span>
                  </router-link>
         </div>
      </div>
      <div v-if="$mq === 'sm'" class="content-menu-lateral" :style="lateral">
         <div>
            <div class="menu-lateral" @touchstart="tocarInit($event)" @touchend="tocarSal($event)" @touchmove="tocarOver($event)">
               <div class="logo">
                  <img src="../../assets/logo.svg" alt="">
               </div>
               <div class="link-lateral">
                  <router-link to="/" exact>
                     <img src="..//../assets/home.png" alt=""><span>Inicio</span>
                  </router-link>
                  <router-link to="/lotes" exact>
                     <img src="../../assets/lote.png" alt=""><span>Lotes</span>
                  </router-link>
                  <router-link to="/clientes" exact>
                     <img src="../../assets/client.png" alt=""><span>Clientes</span>
                  </router-link>
                  <router-link to="/factura" exact>
                     <img src="../../assets/factura.png" width="20px" height="25px" alt=""><span>Facturar</span>
                  </router-link>
               </div>
            </div>
            <div v-if="tocar" @touchstart="tocarInit($event)" @touchend="tocarSal($event)" @touchmove="tocarOver($event)">
            </div>
         </div>
      </div>
   </div>
</template>
<script>
export default {
   data(){
      return{
         tocadoInicial:null,
         tocadoUltimo:null,
         tocar:false,
         oculto:true,
         tocado:{
            backgroundColor:'rgba(0,0,0,.0)'
         },
         lateral:{
            left:`-${window.innerWidth}px`,
            transition: "left .1s"
         }
      }
   },
   methods:{
      tocarInit(e){
         this.tocar=false;
         this.tocadoInicial = e.changedTouches[0].clientX;
         this.tocadoUltimo = e.changedTouches[0].clientX;
         this.lateral.transition = ""
      },
      tocarSal(){
         //console.log(porcentajeDism)
         if(parseInt(this.lateral.left.split('px').join('')) < 0 &&125<this.tocadoInicial-this.tocadoUltimo){
            this.lateral.transition = "left .1s"
            this.lateral.left=`-${window.innerWidth}px`
            this.tocar=false
         }else{
            this.lateral.transition = "left .5s"
            this.lateral.left='0px'
            setTimeout(()=>{
               this.tocar=true;
               this.lateral.transition = ""
            },400)
         }
      },
      tocarOver(e){
         let tocadoActual = e.changedTouches[0].clientX;
         if(tocadoActual < this.tocadoUltimo){
            this.lateral.left=`${tocadoActual-this.tocadoInicial}px`
         }else{
            let dato = parseInt(this.lateral.left.split('px').join(''))
            this.lateral.left=`${dato+(tocadoActual-this.tocadoUltimo) >= 0 ? 0 : dato+(tocadoActual-this.tocadoUltimo)}px`
         }
         this.tocadoUltimo=tocadoActual
      }
   }
}
</script>
<style scoped="true">
   .menu-sup{
      width: 100%;
      position: fixed;
      z-index: 200
   }
   .menu-lateral .router-link-active{
      border-radius: 0px !important;
   }
   .link-lateral>*{
      width: 100%;
      text-decoration: none;
      color: var(--content-text);
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--content-text);
      padding: 10px 5px;
   }
   .link-lateral img{
      margin-right: 10px
   }
   .link-lateral{
      display: flex;
      width: 100%;
      flex-wrap: wrap
   }
   .menu-lateral .logo img{
      display: block;
      margin: auto;
      width: 70px
   }
   .content-menu-lateral{
      position: fixed;
      top: 0;
      width: 100%
   }
   .content-menu-lateral>div{
      display: grid;
      grid-template-columns: 250px 1fr;
   }
   .content-menu-lateral>div>div:nth-child(2){
      background-color: rgba(0,0,0, .5)
   }
   .menu-lateral{
      width: 250px;
      height: 100vh;
      background: var(--content-oscuro)
   }
   .men-sup-sub{
      background-color: var(--naranja);
      height: 50px;
      display: grid;
      grid-template-columns: 50px 1fr;
      box-shadow: 0px 2px 10px grey;
   }
   .links{
      display: flex;
      align-items: center;
      justify-content: flex-end;
   }
   .links img{
      margin-right: 3px
   }
   .links *, .link-lateral *{
      font-size: 18px
   }
   .links>*{
      display: flex;
      margin: 0px 15px;
      padding: 5px 10px;
      text-decoration: none;
      color: var(--content-text);
   }
   .imagenes-menu{
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
   }
</style>

