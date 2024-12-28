<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.5s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}

.gallery + div {
    position: absolute;
    top: 102px;
    z-index: 5555;
    width: 100%;
    height: 100%;
    animation: 2s from-gallery;
    background: white;
}

@media only screen and (max-width: 700px) {
    .gallery + div {
        top: 78px;
    }
}
</style>

<script lang="ts" setup>
definePageMeta({
    pageTransition: {
        name: 'page',
    },
});
</script>

<template>
    <div style="padding: 1rem;">
        <GridGallery />
    </div>
</template>
