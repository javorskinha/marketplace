<template>
  <div>
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import { RouterView } from 'vue-router';
import FooterComponent from './components/FooterComponent.vue';
</script>

<style scoped>
  
</style>
