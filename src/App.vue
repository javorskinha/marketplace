<template>
  <div>
    <HeaderComponent />
    <RouterView />
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import { RouterView } from 'vue-router';
</script>

<style scoped>

</style>
