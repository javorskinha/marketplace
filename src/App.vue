<template>
  <HeaderComponent />
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<style scoped>

</style>
