<template>
  <!-- 100 -->
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show!==false"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'
export default {
  components: { Header, Footer },
  mounted(){
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
</style>