<template>
  <div id="app" class="text-center">
    <Cabecera />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Cabecera from '@/components/parcial/Cabecera.vue'
import Footer from '@/components/parcial/Footer.vue'
export default {
  components:{
    Cabecera,
    Footer
  }
}
</script>