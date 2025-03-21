<template>
    <div>
        <div class="text">
            <h2>Featured Products</h2>
            <p>Discover our handpicked selection of premium products.</p>
        </div>
        <CardComponent />
    </div>
</template>

<script setup>
import CardComponent from '../components/CardComponent.vue'
</script>

<style scoped>
    .text{
        text-align: center;
        padding: 1em;
    }
</style>