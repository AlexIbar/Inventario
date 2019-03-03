<template>
   <div>
      <h1 class="add-lote">Agregar lote</h1>
      <form action="" @submit.prevent="enviar" class="formulario-client">
         <select required placeholder="Cliente" @change="seleccionado" v-model="datos.cliente">
            <option disabled value="">Seleccionar cliente</option>
            <option v-for="cli in clientes" :key="cli.key" :value="cli.cliente">{{cli.cliente}}</option>
         </select>
         <input type="text" required v-model="datos.lote" placeholder="Lote">
         <input type="text" required v-model="datos.cantidad" placeholder="Cantidad">
         <input type="text" required v-model="datos.valor" placeholder="Valor confección">
         <div class="duo">
            <div>Insumos</div>
            <div class="check-android">
               <input id="insumos" v-model="datos.insumos" type="checkbox">
               <label for="insumos"></label>
            </div>
         </div>
         <div class="duo">
            <div>Mustra fisica</div>
            <div class="check-android">
               <input id="muestra" v-model="datos.muestra" type="checkbox">
               <label for="muestra"></label>
            </div>
         </div>
         <div class="duo">
            <div>Foto</div>
            <div class="icono-add-foto">
               <input id="camara" @change="cambio($event)" type="file" accept="image/*">
               <label for="camara">
                  <img src="../../assets/camara.svg">
               </label>
            </div>
         </div>
         <textarea placeholder="Información adicional" v-model="datos.info"></textarea>
         <textarea placeholder="Descripción" v-model="datos.descripcion"></textarea>
         <div class="verMas">
            Siguiente
            <input type="submit"/>
         </div>
      </form>
   </div>
</template>
<script>
export default {
   data(){
      return{
         act:true,
         clientes:[
         ],
         cantidad:null,
         encontrado:null,
         datos:{
            cliente:'',
            lote:'',
            ref:'',
            cantidad:'',
            valor:'',
            insumos:false,
            muestra:false,
            foto:'',
            info:'',
            descripcion:'',
            pendiente:null,
            fecha:null
         }
      }
   },
   mounted(){
      this.$db.getAll('clientes').then((response)=>{
         for(let r of response){
            this.clientes.push({cliente:r.nombre, key:r.key})
         }
      })
   },
   methods:{
      cambio(e){
         let arch = e.target.files[0]
         var file = new FileReader()
         file.readAsDataURL(arch)
         file.onload =()=>this.datos.foto = file.result;
      },
      seleccionado(){
         let cliente =this.datos.cliente;
         this.buscarCant(cliente)
         let encontrado = this.clientes.find((ele)=>{
            return ele.cliente === cliente
         })
         this.encontrado = encontrado.key.slice(-2)
      },
      buscarCant(cliente){
         this.$db.getAll('lotes', {cliente:cliente}).then(response=>{
            if(response){
               this.cantidad = response.length+1
            }else{
               this.cantidad = 1
            }
         })
      },
      enviar(){
         this.datos.fecha = Date.parse(new Date())
         this.datos.pendiente = parseInt(this.datos.cantidad)
         this.datos.ref = this.datos.cliente.slice(0,2)+this.cantidad+this.encontrado
         this.$db.post('lotes', this.datos).then(()=>{
            this.$router.push('/lotes')
         })
      }
   }
}
</script>
<style>
   option{
      height:40px
   }
   .duo{
      display:flex;
      justify-content: space-between;
      border-bottom: 1px solid #cccccc;
      color: var(--content-text);
      padding: 10px 0px 5px 0px
   }
   .duo>:nth-child(1){
      font-size: 18px
   }
   .check-android{
      width: 40px;
      height: 15px;
      background-color: #cccccc;
      border-radius: 10px;
      position: relative;
   }
   .check-android input{
      position: absolute;
      left: 0px;
      opacity: 0
   }
   .check-android label{
      width: 22px;
      height: 22px;
      background-color: grey;
      left: 1px;
      position: absolute;
      top: -3px;
      border-radius:50%
   }
   .check-android input:checked ~ label{
      left: 18px;
      background-color:var(--content-text)
   }
   .icono-add-foto img{
      width: 40px;
   }
   .icono-add-foto input{
      position:absolute;
      opacity:0
   }
   .icono-add-foto{
      width: 40px;
      overflow: hidden;
      position:relative
   }
   .verMas input{
      position:absolute;
      left:0px;
      top:0px;
      bottom:0px;
      right:0px;
      width:100%;
      opacity:0
   }
   .add-lote{
      text-align: center;
      width: 200px;
      margin: 10px auto;
      font-size: 20px;
      color: white;
      background-color: var(--content-text);
      padding:10px 0px;
   }
</style>
