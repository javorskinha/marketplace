<template>
    <BannerHeader />
    <DetailedProduct />
    <EnphasisComponent
    title="Produtos Relacionados"
    button="Ver mais"
    />
    <UpdatedComponent />
</template>

<script setup>
import DetailedProduct from '@/components/DetailedProduct.vue';
import BannerHeader from '@/components/elements/BannerHeader.vue';
import EnphasisComponent from '@/components/elements/EnphasisComponent.vue';
import UpdatedComponent from '@/components/elements/UpdatedComponent.vue';
</script>