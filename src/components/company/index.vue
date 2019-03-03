<template>
    <div>
        <h1 class="add-lote">Agregar empresa</h1>
        <form @submit.prevent="enviar" class="formulario-client">
            <input type="text" required placeholder="Nombre..." v-model="dato.nombre">
            <input type="text" required placeholder="Nit..." v-model="dato.nit">
            <input type="text" required placeholder="Número Tel..." v-model="dato.numero">
            <input type="text" required placeholder="Derección..." v-model="dato.direccion">
            <input type="text" required placeholder="Ciudad..." v-model="dato.ciudad">
            <div class="verMas">
                Continuar
                <input type="submit"/>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dato:{
                nombre:'',
                nit:'',
                numero:'',
                direccion:'',
                ciudad:''
            }
        }
    },
    methods:{
        enviar(){
            localStorage.setItem('companyRegister', JSON.stringify(this.dato))
            window.location.href='/'
        }
    }
}
</script>
