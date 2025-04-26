<template>
  <div>
    <HeaderComponent />
    <RouterView class="max-width-desktop"/>
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import { RouterView } from 'vue-router';
import FooterComponent from './components/FooterComponent.vue';
</script>

<style>
  @media (min-width: 768px) {
    .max-width-desktop {
      max-width: 1500px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .hover :hover{
    color: #00b207;
    transition: color 0.3s ease;
  }
</style>