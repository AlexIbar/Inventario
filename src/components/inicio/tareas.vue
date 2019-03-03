<template>
   <div style="width:100%">
      <div v-for="tar in tareas" :key="tar.key" class="content-list"  :style="tar.completado? {textDecoration:'line-through'} : {}" >
         <div class="card-user">
            <div @click="completar(tar)" :class="tar.completado ? 'cambio-check tarea-completada' : 'cambio-check pendiente'"></div>
            <div>
               <div>
                  {{tar.usuario}}
               </div>
               <div>
                  {{tar.fecha | fecha}}
               </div>
            </div>
         </div>
         <div class="contenido-texto" v-html="tar.tarea"></div>
         <div class="eliminar-tarea" @click="eliminar(tar)"> <img src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Close-24.png" alt=""></div>
      </div>
   </div>
</template>
<script>
export default {
   props:['tareas'],
   filters:{
      fecha(ant){
         return new Date(parseInt(ant)).toLocaleDateString()
      }
   },
   methods:{
      completar(tar){
         tar.completado = !tar.completado
         let key = tar.key,
         newCam = tar.completado
         this.$db.put('tareas', {key:key}, {$unds:{completado:newCam}})
      },
      eliminar(tar){
         let key = tar.key;
         this.$db.delete('tareas', {key:key}).then(()=>{
            this.$emit('newGet')
         })
      }
   }
}
</script>
<style>
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
   .cambio-check{
      width: 35px;
      height: 35px;
      border-radius: 100%
   }
   .card-user{
      display:flex
   }
   .card-user>div:nth-child(2){
      margin-left: 5px
   }
   .card-user>div:nth-child(2)>div:nth-child(1){
      font-weight: bold;
      font-size: 16px
   }
   .card-user>div:nth-child(2)>div:nth-child(2){
      font-size: 12px
   }
   .content-list{
      background-color: var(--content-card);
      box-sizing: border-box;
      padding: 10px;
      border-radius: 5px;
      position: relative;
      width: 90%;
      margin: auto;
      margin-top: 17px
   }
   .eliminar-tarea{
      position: absolute;
      top: -12px;
      right: -12px
   }
   .contenido-texto{
      width: 90%;
      margin: auto;
      margin-top: 10px;
      background-color: rgba(237, 234,234,1.4)
   }
</style>
