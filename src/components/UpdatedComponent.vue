<template>
    <div class="updated">
        <div>
            <h2>Não perca nenhuma novidade! </h2>
            <p>Receba em primeira mão ofertas especiais, novos produtos e descontos especiais para inscritos!</p>
        </div>
        <div class="subscribe">
            <InputComponent type="text" placeholder="Cadastre seu email"/>
            <ButtonComponent text="Inscrever" class="blue button"/>
        </div>
        <p class="terms">Ao assinar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
    </div>
</template>

<script setup>
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
</script>

<style scoped>
    .updated{
        background-color: var(--color-light-gray);
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