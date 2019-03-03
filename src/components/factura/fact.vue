<template>
    <div v-if="empresa" class="general-fact">
        <div id="imprimir">
            <div id="estilos"></div>
        <table>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th class="titulo-empre">{{empresa.nombre}}</th>
            </tr>
            <tr>
                <td colspan="2" class="oscuro">N° de factura</td>
                <td>{{dts.numFact}}</td>
            </tr>
            <tr>
                <td colspan="2" class="oscuro">Fecha de emisión</td>
                <td>{{dts.fechaEmit}}</td>
            </tr>
            <tr class="salto"></tr>
            <tr>
                <td class="oscuro">Emisor</td>
                </tr>
                <tr>
                <td></td>
                <td>Nombre:</td>
                <td>{{empresa.nombre}}</td>
                </tr>
                <tr>
                <td></td>
                <td>Dirección:</td>
                <td>{{empresa.direccion}}</td>
                </tr>
                <tr>
                <td></td>
                <td>Nit:</td>
                <td>{{empresa.nit}}</td>
                </tr>
                <tr>
                <td class="oscuro">Cliente</td>
                </tr>
                <tr>
                <td></td>
                <td>Nombre:</td>
                <td>{{dts.cliente.nombre}}</td>
                </tr>
            <tr>
                <td></td>
                <td>Dirección:</td>
                <td>{{dts.cliente.direccion}}</td>
            </tr>
            <tr>
                <td></td>
                <td>Nit:</td>
                <td>{{dts.cliente.nit}}</td>
            </tr>
            <tr class="salto"></tr>
            <tbody>
                <tr>
                    <th>Ref</th>
                    <th>Cant</th>
                    <th>Descripción</th>
                    <th>Valor Uni</th>
                    <th>Valor total</th>
                </tr>
                <tr v-for="(c, index) in concepto" :key="index" class="dtsFact">
                    <td class="numero">{{c.ref}}</td>
                    <td class="numero">{{c.cantidad}}</td>
                    <td>{{c.descripcion}}</td>
                    <td class="numero">{{c.valor}}</td>
                    <td class="numero">{{c.valor*c.cantidad}}</td>
                </tr>
            </tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <th>TOTAL</th>
                <td class="numero">{{val}}</td>
            </tr>
        </table>
        <div class="dtsGenerator">
            <div>
                <div>Elaborada por</div>
            </div>
            <div>
                <div>Recibida por</div>
            </div>
        </div>
        </div>
        <div class="iconos-fact">
            <div class="print" @click="imprimir"></div>
            <div class="volver" @click="cambio"></div>
        </div>
    </div>
</template>
<script>
export default {
    props:['concepto', 'val','dts'],
    data(){
        return{
            empresa:null
        }
    },
    mounted(){
        this.empresa = JSON.parse(localStorage.getItem('companyRegister'))
    },
    methods:{
        cambio(){
            this.$emit('cambio')
        },
        imprimir(){
            let a = window.open()
            a.document.write(document.getElementById("imprimir").innerHTML)
            a.document.getElementById('estilos').innerHTML+="<style>.numero,.titulo-empre{text-align:right}table{width:8in}.salto{height:20px}th:nth-child(1){width:60px}th:nth-child(2){width:90px}.dtsFact:nth-child(2n){background-color:#aeaeae}.dtsGenerator{display:flex;justify-content:center;width:8in}.dtsGenerator>div{width:150px;margin:70px;border-top:1px solid;padding-top:7px}.oscuro{font-weight:700}.borde{border:1px solid grey}.titulo-empre{font-size:20px}</style>"
            a.document.close()
            a.print()
            a.close()
            this.cambio()
        }
    }
}
</script>
<style>
    table{
    width:8.0in
    }
    .salto{
        height: 20px
    }
    th:nth-child(1){
    width:60px
    }
    th:nth-child(2){
    width:90px
    }
    .dtsFact:nth-child(2n){
    background-color:#aeaeae
    }
    .dtsGenerator{
    display:flex;
    justify-content:center;
    width:8.0in
    }
    .dtsGenerator>div{
    width:150px;
    margin:70px;
    border-top:1px solid;
    padding-top:7px
    }
    .oscuro{
    font-weight:bold
    }
    .numero{
    text-align:right
    }
    .borde{
    border:1px solid grey
    }
    .titulo-empre{
    text-align:right;
    font-size:20px
    }
    .general-fact{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        z-index: 1000000;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center
    }
    .print{
      background-image:url(../../assets/impr.svg);
    }
    .volver{
        background-image:url(../../assets/volver.svg);
    }
    .iconos-fact>div{
        width:50px !important;
        height:50px;
        border-radius:50%;
        background-color:var(--naranja);
        background-position:center;
        background-repeat:no-repeat;
        background-size:25px;
        box-shadow:-2px 5px 10px grey;
        margin: 3px
    }
    .iconos-fact{
        position:fixed;
        right:20px;
        bottom:20px;
    }
</style>
