<template>
    <div class="updated">
        <div>
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for exclusive offers, new arrivals, and insider-only discounts.</p>
        </div>
        <div class="subscribe">
            <InputComponent type="text" placeholder="Enter your email"/>
            <ButtonComponent text="Subscribe" class="yellow button"/>
        </div>
        <p class="terms">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
    </div>
</template>

<script setup>
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
</script>

<style scoped>
    .updated{
        background-color: var(--color-super-light-purple);
        text-align: center;
        padding: 3em 0;
        margin: 2em 0;
    }

    .terms{
        font-size: 0.6em;
    }

    @media screen and (min-width: 600px) {
        .subscribe{
            margin: 0 20%;
        }
    }

    @media screen and (min-width: 1200px) {
        .subscribe{
            margin: 0 35%;
        }
    }
</style>