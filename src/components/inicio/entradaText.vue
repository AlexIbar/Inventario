<template>
   <div class="contenedor-ingreso-text">
      <div class="oculto" @click="oculto = !oculto">
         <span>Agregar tarea</span>
         <svg :class="oculto == false ? 'rotar' : ''" width="20" height="15">
            <path d="M0 20 L10 0 L20 20 Z"/>
         </svg>
      </div>
      <div :class="oculto ? 'content-inputs-text ocultaEntrada': 'content-inputs-text muestraEntrada'">
         <div class="titulo"></div>
         <div class="contenedor-editable" contenteditable="true"></div>
         <div class="btn-addTarea">
            Agregar
         </div>
      </div>
   </div>
</template>
<script>
export default {
   data(){
      return{
         oculto:true
      }
   }
}
</script>
<style>
.contenedor-ingreso-text{
   position: relative;
   overflow: hidden
}
   .oculto{
      width: 100%;
      color: white;
      fill: white;
      letter-spacing: .1em;
      font-size: 20px;
      background-color:black;
      display: flex;
      justify-content: space-between;
      padding: 7px;
      box-shadow: 0px 3px 3px grey;
      position: absolute;
      user-select: none;
   }
   .oculto svg{
      transform: rotateZ(180deg)
   }
   .content-inputs-text{
      width: 100%;
      background-color: #EEEEEE;
      padding-top: 40px;
      transition: 1s linear;
      padding-left: 5px;
      padding-right: 5px;
   }
   .ocultaEntrada{
      max-height: 0px;
      padding-bottom: 0px;
      padding-top: 30px
   }
   .muestraEntrada{
      padding-bottom: 15px;
      max-height: 1000px
   }
   .rotar{
      transition: .5s;
      transform:rotateZ(0deg) !important
   }
   .contenedor-editable{
      min-width: 300px;
      min-height:100px;
      background-color: var(--content-text);
      border-radius: 10px;
      padding: 10px;
      font-size:16px;
      overflow-wrap: break-word;
      color: white
   }
   .btn-addTarea{
      width: 250px;
      height: 40px;
      background-color: var(--naranja);
      text-align: center;
      margin:5px auto;
      padding: 7px;
      font-size: 18px;
      color: white;
      border-radius: 10px;
      box-shadow: 0px 5px 5px grey;
   }
   .btn-addTarea:hover{
      box-shadow: 0px 0px 0px grey;
   }
</style>
