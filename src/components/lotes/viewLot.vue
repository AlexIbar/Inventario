<template>
    <div v-if="lote">
        <div class="imagen-view" :style="{backgroundImage:'url('+lote.foto+')'}">
            <div>
                <div><span class="titleInfo">Ref: </span>{{lote.ref}}</div>
                <div><span class="titleInfo"> Cant: </span>{{lote.cantidad}}</div>
                <div><span class="titleInfo">Pend: </span>{{lote.pendiente}}</div>
            </div>
        </div>
        <div class="content-info-lot">
            <div><span class="titleInfo">Cliente: </span><span>{{lote.cliente}}</span></div>
            <div><span class="titleInfo">Insumos: </span><span>{{lote.insumos ? 'Entregados' : 'Pendientes'}}</span></div>
            <div><span class="titleInfo">Valor: </span><span>{{lote.valor}}</span></div>
            <div><span class="titleInfo">Fecha: </span><span>{{lote.fecha | fecha}}</span></div>
            <div><span class="titleInfo">Descripción: </span><span>{{lote.descripcion}}</span></div>
            <div><span class="titleInfo">Información: </span><span>{{lote.info}}</span></div>
            <div class="tabla-facturas">
                <span class="titleInfo">Facturas</span>
                <table>
                    <tr>
                        <th>N°</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                    </tr>
                    <tr v-for="(fact, index) in lote.afectado" :key="index">
                        <td>{{fact.factura}}</td>
                        <td>{{fact.fecha}}</td>
                        <td>{{fact.cantidad}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            lote:null,
            imagen:null
        }
    },
    mounted(){
        this.$db.get('lotes', {ref:this.$route.query.ref}).then(response=>this.lote = response)
    },
    filters:{
        fecha(date){
            return new Date(date).toLocaleDateString()
        }
    }
}
</script>
<style>
    .foto-view-lot{
        max-width: 100%;
        display: block;
        margin: 3px auto;
        max-height: 90vh;
    }
    .imagen-view{
        position: relative;
        width: 100%;
        height: 90vh;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed; 
        background-size: contain;
        background-position-y: 50px;
    }
    .imagen-view>div{
        position: absolute;
        right: 5px;
        bottom: 5px;
        display: flex;
        color: white
    }
    .imagen-view>div>div{
        padding: 5px;
        margin: 3px;
        background-color: black;
        font-size: 16px;
        border-radius: 5px;
        flex-direction: column
    }
    .titleInfo{
        font-weight: bold;
        letter-spacing: 1pt;
        font-size: 16px
    }
    .content-info-lot{
        width: 100%;
        height: 100vh;
        background-attachment: fixed;
        border-top: 1px solid grey;
        padding-top: 20px
    }
    .content-info-lot>div{
        max-width: 500px;
        margin: auto;
        margin-bottom:10px
    }
    .tabla-facturas table{
        width: 200px;
        margin: auto
    }
    .tabla-facturas td{
        border:1px solid grey
    }
    .tabla-facturas td:nth-child(1){
        width: 30px;
        text-align: center
    }
    .tabla-facturas td:nth-child(3){
        text-align: right
    }
</style>
