<template>
    <div class="mt-5 container">
      <h5>Detalle de facturas:</h5>
       <TarjetaDetalleFactura :datos="datos" class="mt-3"/>
    </div>
</template>

<script>
import TarjetaDetalleFactura from '@/components/TablaDetalleFactura'
import config from '@/config/config.js'
export default {
    data(){
        return{
            urlApi : config.URL_API,
            datos:[]
        }
    },
    components:{
      TarjetaDetalleFactura
    },
    created(){
        this.obtenerTodos();
    },
    methods:{
       async obtenerTodos(){
            const respuesta = await fetch(this.urlApi + 'detallefactura')
            const datos = await respuesta.json();
            this.datos = datos;
        }
    }
}
</script>