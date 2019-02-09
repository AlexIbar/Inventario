<template>
   <div style="width:100%">
      <div class="content-list">
         <div @click="activo = !activo" :class="activo ? 'cambio-check tarea-completada' : 'cambio-check pendiente'">
         </div>
         <div class="contenidoTexto" :style="activo? {textDecoration:'line-through'} : {}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ullam illo ipsa saepe consequuntur dicta nostrum commodi libero quidem hic facilis fugit, voluptas excepturi corporis? Natus corrupti sit obcaecati nesciunt!</div>
         <div class="fecha">6/02/2019</div>
         <div class="eliminar-tarea"> <img src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/18_Close-20.png" alt=""></div>
      </div>
   </div>
</template>
<script>
export default {
   data(){
      return{
         activo:false
      }
   }
}
</script>
<style>
   @media(min-width:800px){
      .content-list{
         display:grid;
         grid-template-columns: 5% 80% 10% 5%;
         background-color: #eeeeee;
         border-radius: 5px
      }
      .eliminar-tarea{
         display: block !important;
         margin-left: 3px
      }
   }
   .content-list{
      background-color: burlywood;
      margin: 2px;
      padding: 10px 3px;
      border-radius: 5px;
   }
   .content-list>div:nth-child(1){
      float:right;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      shape-outside: circle();
      position: relative;
   }
   .pendiente{
      background-color: white;
      border:2px solid grey;
   }
   .tarea-completada{
      background-color:#3880ff;
      background-image: url(../../assets/like.svg);
      background-repeat: no-repeat;
      background-position: center;
   }
   .content-list>div:nth-child(3){
      float: right
   }
   .eliminar-tarea{
      display: flex;
      justify-content: flex-end;
      padding-right: 10px
   }
</style>
