<template>
    <div class="bg-light text-center p-5">
        <div>
            <h2>Não perca nenhuma novidade! </h2>
            <p>Receba em primeira mão ofertas especiais, novos produtos e descontos especiais para inscritos!</p>
        </div>
        <div class="col-md-7 m-auto">
            <InputComponent type="text" placeholder="Cadastre seu email"/>
            <ButtonComponent text="Inscrever" class="btn btn-outline-primary"/>
        </div>
        <p><small>Ao assinar, você concorda com nossos Termos de Serviço e Política de Privacidade.</small></p>
    </div>
</template>

<script setup>
import InputComponent from './InputComponent.vue';
import ButtonComponent from './ButtonComponent.vue';
</script>
