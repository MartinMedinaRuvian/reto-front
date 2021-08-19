<template>
    <div class="container text-center mt-5">
        <h4>Facturas:</h4>
        <table class="table table-center table-primary">
            <thead>
              <tr>
                <th scope="col">Numero</th>
                <th scope="col">Cliente</th>
                <th scope="col">Fecha</th>
                <th scope="col">Subtotal</th>
                <th scope="col">IVA</th>
                <th scope="col">Total</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dato of datos" :key="dato.index">
                <td>{{ dato.fac_numerofactura }}</td>
                <td>{{ dato.fac_nombrecliente }}</td>
                <td>$ {{ dato.fac_fecha }}</td>
                <td>$ {{ dato.fac_subtotal }}</td>
                <td>$ {{ dato.fac_iva }}</td>
                <td>$ {{ dato.fac_total }}</td>
                <td>
                  <button class="btn btn-warning">Editar</button>
                  <button class="btn btn-danger" @click="eliminar(dato.fac_numerofactura)">Eliminar</button>
                  </td>
              </tr>
            </tbody>
          </table>
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
            const respuesta = await fetch(this.urlApi + 'facturacion')
            const datos = await respuesta.json();
            this.datos = datos;
        },
      async eliminar(index){
         this.axios.delete(`facturacion/${index}`)
         .then((res)=>{
           console.log(res)
           if(res.status === 200){
            this.obtenerTodos()
           }
         })
         .catch(error=>console.log(error))
        }
    }
}
</script>