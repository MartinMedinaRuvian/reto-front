<template>
    <div class="container mt-5">
        <h5>Información de la factura # {{ $route.params.numfactura }}</h5>
         <TablaDetallesFacturas :datos="datos"></TablaDetallesFacturas>
         <h5 class="text-primary">Total: $ {{ $route.params.subtotal }}</h5>
    </div>
</template>
<script>
import TablaDetallesFacturas from '@/components/TablaDetallesFacturas';
import config from '@/config/config.js'
export default {
    name:'facdetalles',
    components:{
        TablaDetallesFacturas
    },
    data(){
        return{
            urlAPI: config.URL_API,
            datos:{},
            numeroFactura: this.$route.params.numfactura
        }
    },
    created(){
        this.verDetalles(this.numeroFactura)
    },
    methods:{
       async verDetalles(numfactura){
        const respuesta = await fetch(this.urlAPI + `detallefactura/${numfactura}`);
        const datos = await respuesta.json();
        this.datos = datos;
        }
    }
}
</script>