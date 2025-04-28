<template>
    <div>
        <div class="modal fade" tabindex="-1" :class="{ show: isVisible }" :style="{ display: isVisible ? 'block' : 'none' }" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content shadow">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="btn-close" @click="close"></button>
                    </div>
                    <div class="modal-body">
                        <slot>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isVisible" class="modal-backdrop fade show" @click="close"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    isVisible: { type: Boolean, required: true },
    title: { type: String, default: "Modal" },
});

const emit = defineEmits(["close"]);

function close() {
    emit("close");
}
</script>