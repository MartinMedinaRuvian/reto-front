<template>
  <div id="app" class="text-center">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/parcial/_header.vue'
import Footer from '@/components/parcial/_footer.vue'
export default {
  components:{
    Navbar,
    Footer
  }
}
</script>