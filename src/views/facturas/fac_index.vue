<template>
    <div class="container text-center mt-5">
        <h4>Facturas:</h4>
        <router-link to="/facturaguardar" class="btn btn-primary">Nueva factura</router-link>

        <table class="table table-center table-primary mt-3">
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
                <td><router-link :to="{name: 'FacturasPorNumero', params: {numfactura: dato.fac_numerofactura, subtotal:dato.fac_subtotal} }" class="btn btn-primary">{{ dato.fac_numerofactura }}</router-link></td>
                <td><input type="text" v-model="dato.fac_nombrecliente" @keypress.enter="actualizar(dato.fac_numerofactura, dato.fac_nombrecliente)"></td>
                <td>{{ dato.fac_fecha }}</td>
                <td>$ {{ dato.fac_subtotal }}</td>
                <td>$ {{ dato.fac_iva }}</td>
                <td>$ {{ dato.fac_total }}</td>
                <td>
                  <button class="btn btn-danger" @click="eliminar(dato.fac_numerofactura)">Eliminar</button>
                  </td>
              </tr>
            </tbody>
          </table>
          <h5>Sub total $ {{formatoMoneda(subtotal)}}</h5>
          <h5>IVA $ {{formatoMoneda(iva)}}</h5>
          <h5>Total $ {{formatoMoneda(total)}}</h5>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            datos:[],
            total:0,
            subtotal:0,
            iva:0
        }
    },
    computed:{
      ...mapState(["urlApi"])
    },
    created(){
        this.obtenerTodos();
    },
    methods:{
       async obtenerTodos(){
            const respuesta = await fetch(this.urlApi + 'facturacion')
            const datos = await respuesta.json();
            this.datos = datos;
            this.totalVentas()
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
        },
        actualizar(numerofactura, fac_nombrecliente){
          console.log(fac_nombrecliente)
          this.axios.put(`facturacion/${numerofactura}`, {fac_nombrecliente})
          .then((res)=>{
            if(res.status === 200){
              this.obtenerTodos()
            }
          })
        },
        totalVentas(){
          let subtotal =0;
          let total = 0;
          let iva = 0;
          const datos = this.datos;
          for(let dato of datos){
            subtotal += dato.fac_subtotal;
            iva += dato.fac_iva;
            total += dato.fac_total;
          }
          this.total = total;
          this.subtotal = subtotal;
          this.iva = iva;
        },
        formatoMoneda(numero) {
      return new Intl.NumberFormat().format(numero);
    }
    }
}
</script>