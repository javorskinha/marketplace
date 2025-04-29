<template>
    <BannerHeader />
    <ClientCoupons />
    <EnphasisComponent
    title="Especiais da Semana"
    button="Ver tudo"/>
    <UpdatedComponent />
</template>

<script setup>
import ClientCoupons from '@/components/ClientCoupons.vue';
import BannerHeader from '@/components/elements/BannerHeader.vue';
import EnphasisComponent from '@/components/elements/EnphasisComponent.vue';
import UpdatedComponent from '@/components/elements/UpdatedComponent.vue';
</script>