<template>
    <div>
        <table class="table table-center table-primary">
            <thead>
              <tr>
                <th scope="col">Numero factura</th>
                <th scope="col">Articulo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dato of datos" :key="dato.index">
                <td>{{ dato.defa_numerofactura }}</td>
                <td>{{ dato.defa_articulo }}</td>
                <td>{{ dato.defa_cantidad }}</td>
                <td>$ {{ dato.defa_valor }}</td>  
              </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name:'TablaDetallesFacturas',
    props:{
        datos:{}
    }
}
</script>