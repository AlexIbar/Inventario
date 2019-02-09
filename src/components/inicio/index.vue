<template>
   <div class="content-init">
      <div>
         <entrada-text></entrada-text>
      </div>
      <div>
         <h1 class="titulo-list">
            Lista tareas
         </h1>
         <div>
            <listTareas></listTareas>
         </div>
      </div>
   </div>
</template>
<script>
import entradaText from './entradaText.vue'
import listTareas from './tareas.vue'
export default {
   components:{
      listTareas,
      entradaText
   },
   data(){
      return{

      }
   }
}
</script>
<style>
.content-init{
   margin-top: 15px
}
@media(min-width:700px){
   .content-init{
      display:grid;
      grid-template-columns: .5fr 1fr;
      grid-gap: 3px
   }
}
.titulo-list{
   font-size: 20px;
   text-align: center;
   padding-bottom: 10px;
   margin-top: 20px
}
</style>