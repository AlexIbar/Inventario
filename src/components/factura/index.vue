<template>
    <div>
        <div v-if="selec === false">
            <select id="" class="selected-cli centrar-cli" v-model="cliente" @change="seleccionado">
                <option disabled value="">Seleccionar cliente</option>
                <option v-for="cli in clientes" :key="cli.nombre" :value="cli.nombre">{{cli.nombre}}</option>
            </select>
        </div>
        <div class="list-lot" v-if="addCant == false">
            <div v-for="(lot, index) in lotes" :key="lot.key" class="selec" @click="agregar(index)">
                <div class="content-img-lot">
                    <img :src="lot.foto" width="60px" height="60px" alt="">
                </div>
                <div>
                    <div>
                        <span>Cliente:</span><span>{{lot.cliente}}</span>
                    </div>
                    <div>
                        <span>Pendiente:</span><span>{{lot.pendiente}}</span>
                    </div>
                    <div>
                        <span>Cantidad:</span><span>{{lot.cantidad}}</span>
                    </div>
                    <div>
                        <span>Valor:</span><span>{{lot.valor}}</span>
                    </div>
                </div>
            </div>
        </div>
        <form @submit.prevent="add" v-if="addCant" class="centrar-cli">
            <input class="selected-cli" type="number" required v-model="cantidad" placeholder="Unidades a facturar">
            <div class="opciones-agregar">
                <div style="cursor:pointer" @click="addCant=false">
                    Cancelar
                </div>
                <div>
                    <div class="verMas">
                        Agregar
                        <input type="submit"/>
                    </div>
                </div>
            </div>
        </form>
        <hr>
        <table width="100%" v-if="verFact" class="list-pro">
            <tr>
                <th>
                    Eliminar
                </th>
                <th>Ref</th>
                <th>Cantidad</th>
                <th>Descripción</th>
                <th>Valor uni</th>
                <th>Monto</th>
            </tr>
            <tr v-for="(ge, index) in generados" :key="index">
                <td class="eliminar-ref">
                    <div @click="cancelar(index)"></div>
                </td>
                <td>{{ge.ref}}</td>
                <td>{{ge.cantidad}}</td>
                <td>{{ge.descripcion}}</td>
                <td>{{ge.valor}}</td>
                <td>{{ge.valor*ge.cantidad}}</td>
            </tr>
            <tr>
                <th colspan="4"></th>
                <th>
                    Total
                </th>
                <th>{{valor}}</th>
            </tr>
            <tr>
                <td colspan="6" v-if="generados[0]">
                    <div @click="completar" class="verMas" style="margin:5px auto">Generar Factura</div>
                </td>
            </tr>
        </table>
        <div :class="verFact ?'fact ocultar-fact' :'fact ver-fact'" v-if="selec" @click="verFact= !verFact"></div>
        <gene-fact v-if="pasar" :concepto="generados" :val="valor" :dts="pasar" @cambio="cambio"></gene-fact>
    </div>
</template>
<script>
import geneFact from './fact'
export default {
    components:{
        geneFact
    },
    data(){
        return{
            verFact:false,
            clientes:[],
            cliente:'',
            selec:false,
            lotes:null,
            addCant:false,
            ultimo:null,
            facturar:[],
            cantidad:'',
            generados:[],
            valor:0,
            pasar:null
        }
    },
    mounted(){
        this.$db.getAll('clientes').then((response)=>{
           for(let a of response){
                this.clientes.push({nombre:a.nombre, direccion:a.direccion, nit:a.nit})
            }
        })
    },
    methods:{
        cambio(){
            this.pasar=null;
            this.$router.push('/')
        },
        seleccionado(){
            this.$db.getAll('lotes', {cliente:this.cliente}).then((response)=>{
                this.selec=true
                this.lotes = response
            })
        },
        agregar(dat){
            this.ultimo = dat
            this.addCant = true
        },
        add(){
            let cant=parseInt(this.cantidad),
            valor=parseInt(this.lotes[this.ultimo].valor)
            let a = {
                ref:this.lotes[this.ultimo].ref,
                cantidad:cant,
                descripcion:this.lotes[this.ultimo].descripcion,
                valor:valor
            }
            this.lotes[this.ultimo].pendiente = this.lotes[this.ultimo].pendiente-cant
            this.valor = this.valor+(valor*cant)
            this.generados.push(a)
            this.addCant=false;
            this.cantidad=null
        },
        cancelar(id){
            let a= this.generados[id];
            let indiceLote = this.lotes.findIndex((dat)=>dat.ref === a.ref)
            this.lotes[indiceLote].pendiente +=a.cantidad
            this.valor=this.valor-(a.cantidad*a.valor)
            this.generados.splice(id,1)
        },
        completar(){
            var numeroFact;
            this.$db.getAll('facturas').then((response)=>{
                if(response.length == 0){
                    numeroFact = 1
                }else{
                    numeroFact = response.length+1
                }
                this.guardarCambios(numeroFact)
                let pass = {
                    numFact:numeroFact,
                    fechaEmit:new Date().toLocaleDateString(),
                    cliente:this.clientes.find((d)=>d.nombre === this.cliente)
                }
                this.pasar = pass
            })
        },
        guardarCambios(numeroFact){
            this.$db.post('facturas',{
                    numeroFact:numeroFact,
                    namePro:JSON.parse(localStorage.getItem('companyRegister')).nombre,
                    nameCli:this.cliente,
                    fechaEmit:new Date().toLocaleDateString(),
                    concepto:this.generados
            }).then(()=>{
                for(let ge of this.generados){
                        let ref = ge.ref;
                        let afectado = this.lotes.find((dat)=> dat.ref === ref)
                        if(afectado.afectado){
                            afectado.afectado.push({factura:numeroFact,cantidad:ge.cantidad, fecha:new Date().toLocaleDateString()})
                        }else{
                            afectado.afectado=[]
                            afectado.afectado.push({factura:numeroFact,cantidad:ge.cantidad, fecha:new Date().toLocaleDateString()})
                        }
                        this.$db.put('lotes', {key:afectado.key},afectado).then(()=>{})
                    }
            }).catch((err)=>console.log(err))
        }
    }
}
</script>
<style>
    .selected-cli{
        width: 250px;
    height: 40px;
    color: var(--content-text);
    border-radius: 5px;
    border: 2px solid;
    }
    .opciones-agregar{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 10px;
        align-items: center
    }
    .opciones-agregar>div:nth-child(1){
        margin-right: 10px
    }
    .centrar-cli{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
    }
    .selec{
        display: flex;
        background-color: var(--content-card);
        margin: 5px;
        padding: 10px;
        border-radius: 5px
    }
    .selec>div:nth-child(2)>div>span:nth-child(1){
        font-weight: bold
    }
    .selec>div:nth-child(2){
        margin-left: 5px
    }
    .selec img{
        object-fit: cover;
        border-radius: 100%
    }
    .list-lot{
        display: flex;
        flex-wrap: wrap;
        justify-content: center
    }
    .list-lot>div:hover{
        background: var(--content-text);
        user-select: none;
        cursor: pointer
    }
    .content-img-lot{
        display: flex;
        align-items: center
    }
    .fact{
      width:50px !important;
      height:50px;
      border-radius:50%;
      background-color:var(--naranja);
      position:fixed;
      right:20px;
      bottom:20px;
      background-position:center;
      background-repeat:no-repeat;
      background-size:25px;
      box-shadow:-2px 5px 10px grey
    }
    .ocultar-fact{
        background-image:url(../../assets/eyesClose.svg);
    }
    .ver-fact{
      background-image:url(../../assets/eyes.svg);
    }
    .eliminar-ref>div{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid grey;
        margin: 2px auto
    }
    .eliminar-ref>div:hover{
        background-color: red
    }
    .list-pro{
        text-align: center
    }
    .list-pro>tr:nth-child(2n){
        background-color: var(--content-card)
    }
</style>
