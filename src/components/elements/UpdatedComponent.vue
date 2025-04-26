<template>
    <div class="bg-white text-center p-5">
        <div>
            <h2>Não perca nenhuma novidade! </h2>
            <p>Receba em primeira mão ofertas especiais, novos produtos e descontos especiais para inscritos!</p>
            <div class="m-3 hover text-black">
                <i class="pi pi-whatsapp me-3"></i>
                <i class="pi pi-facebook me-3"></i>
                <i class="pi pi-instagram me-3"></i>
            </div>
        </div>
        <div class="col-md-7 m-auto">
            <InputComponent type="text" placeholder="Cadastre seu email"/>
            <ButtonComponent text="Inscrever" class="btn btn-primary rounded-1"/>
        </div>
        <p><small>Ao assinar, você concorda com nossos Termos de Serviço e Política de Privacidade.</small></p>
    </div>
</template>

<script setup>
import InputComponent from './elements/InputComponent.vue';
import ButtonComponent from './elements/ButtonComponent.vue';
</script>
