<template>
  <div class="mt-5 container">
    <div class="mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <h6>Agregar producto</h6>
            </div>

            <div class="card-body">
              <form
                @submit.prevent="agregarArticulo(articulo), calcularTotal()"
              >
                <div class="mb-3">
                  <input
                    type="text"
                    placeholder="Descripción articulo"
                    class="form-control"
                    v-model="articulo.defa_articulo"
                    required
                    id="txtdescipcion"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="number"
                    placeholder="Cantidad"
                    class="form-control"
                    v-model="articulo.defa_cantidad"
                    required
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="number"
                    placeholder="Valor"
                    class="form-control"
                    v-model="articulo.defa_valor"
                    required
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="submit"
                    value="Agregar producto"
                    class="form-control btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <table class="table table-center table-primary">
            <thead>
              <tr>
                <th scope="col">Articulo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dato of articulos" :key="dato.index">
                <td>{{ dato.defa_articulo }}</td>
                <td>{{ dato.defa_cantidad }}</td>
                <td>$ {{ formatoMoneda(dato.defa_valor) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h6>Información basica</h6>
            </div>

            <div class="card-body">
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Nombre cliente"
                  class="form-control"
                  v-model="infoBasica.fac_nombrecliente"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="btn btn-outline-primary p-3 disabled">
            <h4>Sub total: $ {{ formatoMoneda(subtotal) }}</h4>
            <h4>IVA: $ {{ formatoMoneda(iva_total) }}</h4>
            <h3>Total: $ {{ formatoMoneda(total) }}</h3>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <button class="btn btn-success" @click="guardarFactura()">
          Guardar factura
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config/config.js";
export default {
  data() {
    return {
      infoBasica: {},
      articulo: {},
      articulos: [],
      articulosGuardar: [],
      iva: config.VALOR_IVA,
      iva_total: 0,
      subtotal: 0,
      total: 0,
      urlAPI : config.URL_API,
      numeroFactura: 1,
    };
  },
  created(){
    this.numeroFacturaGuardar();
  },
  methods: {
    agregarArticulo(articulo) {
      const {defa_articulo, defa_cantidad, defa_valor} = articulo;
      const defa_numerofactura = this.numeroFactura;
      const articuloAgregar ={
        defa_numerofactura,
        defa_articulo,
        defa_cantidad,
        defa_valor
      }
      this.articulos.push(articuloAgregar);
      this.articulosGuardar.push(Object.values(articuloAgregar));
      this.articulo = {};
      document.querySelector("#txtdescipcion").focus();
    },
    calcularTotal() {
      let suma = 0;
      for (let dato of this.articulos) {
        suma += parseInt(dato.defa_valor);
      }
      this.subtotal = suma;
      this.iva_total = this.subtotal * this.iva;
      this.total = this.subtotal + this.iva_total;
    },
    formatoMoneda(numero) {
      return new Intl.NumberFormat().format(numero);
    },
    guardarFactura() {
      const { fac_nombrecliente } = this.infoBasica;
      const date = new Date();
      const fac_fecha = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      console.log(fac_fecha)
      const facturaGuardar = {
        fac_nombrecliente,
        fac_fecha,
        fac_subtotal: this.subtotal,
        fac_iva: this.iva_total,
        fac_total: this.total,
      };

      this.axios.post("facturacion", facturaGuardar)
      .then((res) => {
          console.log(res)
          this.guardarDetallesFacturas()
        }).catch((e) => {
          console.log(e);
        });
    },
    guardarDetallesFacturas(){
     this.axios.post("detallefactura", this.articulosGuardar)
     .then(()=>{
       
       this.$router.push({name:'Facturas'})
     })
    },
    async numeroFacturaGuardar(){
      const response = await fetch(this.urlAPI + 'facturacion/numero');
      const numero = await response.json();
      this.numeroFactura = numero;
    }
  },
};
</script>