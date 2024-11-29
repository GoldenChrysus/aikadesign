<style scoped>
.disabled {
    pointer-events: none;
}

.wrapper > .item > a {
    display: flex;
    align-items: center;
    height: 80vh;
}

.wrapper > .item > a > img {
    max-height: 100%;
    max-width: 1200px;
}

.glide-enter-active,
.glide-leave-active {
    transition: all 4s ease-out;
}

.glide-leave-to,
.glide-enter-from {
    opacity: 0;
}

.glide-leave-from,
.glide-enter-to {
    opacity: 1;
}
</style>

<script setup lang="ts">
const emit = defineEmits(['navigate']);
const props = defineProps({
    exiting: {
        type: Boolean,
        required: true,
    },
    scrolling: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});
const { exiting, scrolling, image } = props;

const onClick = (e: MouseEvent) => {
    console.log('click');
    e.preventDefault();
}
</script>

<template>
    <NuxtLink
        v-if="!exiting"
        to="/item/x"
        :class="{
            disabled: scrolling,
        }"
        :aria-disabled="scrolling"
    >
        <img :src="`/gallery/${image}`">
    </NuxtLink>
</template>
