<template>
    <div class="container-fluid mt-4" style="width: 80%;">
        <div class="row">
            <div class="col-12 col-md-3 mb-4">
                <div class="position-sticky" style="top: 40px;">
                    <FiltersComponent
                    :selectedFilters="filters"
                    @updateFilters="handleUpdateFilters"/>
                </div>
            </div>
            <div class="col-12 col-md-9">
                <div class="row g-4">
                    <div v-for="product in filteredProducts" :key="product.id" class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center" >
                        <CardComponent
                        :id="product.id"
                        :src="getImageUrl(product.image_path)"
                        :name="product.name"
                        :description="product.description"
                        :price="product.price"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CardComponent from './elements/CardComponent.vue';
import FiltersComponent from './elements/FiltersComponent.vue';
import { useProductsStore } from '@/stores/ProductsStore';
import { computed, ref, onMounted, watch } from 'vue';
import { baseURL } from "@/services/HttpService";
import { useRoute } from 'vue-router';

const productsStore = useProductsStore();
const route = useRoute();
const allProducts = computed (()=> productsStore.products);

const filters = ref({
    categories: [],
    //tags: [],
    offers: false
})

async function getAllProducts() {
    await productsStore.fetchProducts(17);
};

const getImageUrl = (path) => {
    return `${baseURL}${path.replace(/^\/+/, '')}`
};

function handleUpdateFilters(newFilters){
    filters.value = {...filters.value, ...newFilters};
}

const filteredProducts = computed(() => {
    let result = allProducts.value;

    if(filters.value.categories.length > 0){
        result = result.filter(product => filters.value.categories.includes(product.category_id));
    };

    //if (filters.value.tags.length > 0) {
    //    result = result.filter(product => {
    //        if (!product.tags) return false;
    //        return product.tags.some(tag => filters.value.tags.includes(tag.id));
    //    });
    //}

    if (filters.value.offers) {
        const discountedProductIds = productsStore.discounts.map(d => d.product_id);
        result = result.filter(product => discountedProductIds.includes(product.id));
    }

    return result;
})

onMounted( async ()=>{
    await getAllProducts();
});

watch(
    () => route.query,
  (query) => {
    filters.value = {
      categories: query.categoryId ? [Number(query.categoryId)] : [],
      offers: query.offers === 'true'
    };
  },
  { immediate: true }
);
</script>