<template>
   <div class="content-init">
      <div>
         <entrada-text @newGet="buscar"></entrada-text>
      </div>
      <div>
         <h1 class="titulo-list">
            Lista tareas
         </h1>
         <div>
            <listTareas :tareas="datosTareas" @newGet="buscar"></listTareas>
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
         datosTareas:[]
      }
   },
   mounted(){
      this.buscar()
   },
   methods: {
      buscar(){
         this.$db.getAll('tareas').then((response)=>{
            this.datosTareas = response
         })
      }
   },
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