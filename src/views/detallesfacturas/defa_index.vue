<template>
    <div class="mt-5 container">
      <h5>Detalle de facturas:</h5>
       <TablaDetallesFacturas :datos="datos" class="mt-3"/>
       <h5>Total $ {{formatoMoneda(total)}}</h5>
    </div>
</template>

<script>
import TablaDetallesFacturas from '@/components/TablaDetallesFacturas'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            datos:[],
            total:0
        }
    },
    computed:{
      ...mapState(['urlApi'])
    },
    components:{
      TablaDetallesFacturas
    },
    created(){
        this.obtenerTodos();
    },
    methods:{
       async obtenerTodos(){
            const respuesta = await fetch(this.urlApi + 'detallefactura')
            const datos = await respuesta.json();
            this.datos = datos;
            this.totalVentas();
        },
        totalVentas(){
          let total = 0;
          const datos = this.datos;
          for(let dato of datos){
            total += dato.defa_valor;
          }
          this.total = total;
        },
        formatoMoneda(numero) {
      return new Intl.NumberFormat().format(numero);
    }
    }
}
</script>