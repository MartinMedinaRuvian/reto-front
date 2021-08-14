<template>
    <div class="container text-center mt-5">
        <h2>Facturas:</h2>
        <li v-for="dato of datos" :key="dato.fac_numerofactura">{{dato.fac_numerofactura}} - Cliente: {{dato.fac_nombrecliente}}</li>
    </div>
</template>

<script>
import config from '@/config/config.js'
export default {
    data(){
        return{
            urlApi : config.URL_API,
            datos:[]
        }
    },
    created(){
        this.obtenerTodos();
    },
    methods:{
       async obtenerTodos(){
            const respuesta = await fetch(this.urlApi + 'facturas')
            const datos = await respuesta.json();
            this.datos = datos;
        }
    }
}
</script>