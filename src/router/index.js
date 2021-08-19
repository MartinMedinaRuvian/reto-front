import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/facturas',
    name: 'Facturas',
    component: () => import('@/views/facturas/fac_index.vue')
  },
  {
    path: '/facturas/:numfactura',
    name: 'FacturasPorNumero',
    component: () => import('@/views/facturas/fac_detalles.vue')
  },
  {
    path: '/facturaguardar',
    name: 'FacturasGuardar',
    component: () => import('@/views/facturas/fac_guardar.vue')
  },
  {
    path: '/detallesfacturas',
    name: 'DetallesFacturas',
    component: () => import('@/views/detallesfacturas/defa_index.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
