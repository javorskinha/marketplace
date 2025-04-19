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
    .hover :hover{
        color: #00b207;
    }
</style>