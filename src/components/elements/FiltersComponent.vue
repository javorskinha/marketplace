<template>
    <div class="card p-3">
        <div class="d-flex w-100 justify-content-between border-bottom mb-2">
            <h5>Filtros</h5>
            <i class="pi pi-filter fs-5"></i>
        </div>
        <div class="mb-3">
            <h6>Categorias</h6>
            <div v-for="category in categories" :key="category.id">
                <input type="checkbox" :value="category.id" v-model="selectedCategories">
                {{ category.name }}
            </div>
        </div>
        <div class="mb-3">
            <h6>Marcadores</h6>
            <div v-for="tag in tags" :key="tag.id">
                <input type="checkbox" :value="tag.id" v-model="selectedTags">
                {{ tag.name }}
            </div>
        </div>
        <div class="mb-3">
            <h6>Produtos em Oferta</h6>
            <div>
                <input type="checkbox" v-model="onlyOffers">
                Somente Ofertas
            </div>
        </div>
        <button class="btn btn-outline-primary w-100" @click="applyFilters">Aplicar</button>
    </div>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore';
import { ref, computed, defineProps, defineEmits, watchEffect } from 'vue';

const props = defineProps({
    selectedFilters: {
        type: Object,
        required: true
    }
})

const productsStore = useProductsStore();
const categories = computed (()=> productsStore.categories);
//const tags = computed(() => productsStore.tags);
//const offers = computed(() => productsStore.offers);

const emit = defineEmits(['updateFilters']);

const selectedCategories = ref([...props.selectedFilters.categories || []]);
//const selectedTags = ref([]);
//const onlyOffers = ref(false);

function applyFilters(){
    emit('updateFilters', {
        categories: selectedCategories.value,
        //tags: selectedTags.value,
        //offers: onlyOffers.value
    });
};

watchEffect(() => {
    selectedCategories.value = [...props.selectedFilters.categories || []];
});
</script>