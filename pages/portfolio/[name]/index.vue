<style scoped>
.page-enter-active,
.elsewhere-leave-active {
    transition: all 0.5s;
}

.page-enter-from,
.elsewhere-leave-to {
    opacity: 0;
    filter: blur(1rem);
}

.gallery + div {
    position: absolute;
    top: 102px;
    z-index: 5555;
    width: 100%;
    height: 100%;
    animation: 0.5 from-gallery;
    background: white;
}

@media only screen and (max-width: 700px) {
    .gallery + div {
        top: 78px;
    }
}
</style>

<script setup lang="ts">
import Gallery from '~/components/Gallery.vue';
import { PORTFOLIO_MAP } from '~/lib/consts';

definePageMeta({
    pageTransition: {
        name: 'page',
    },
});

const route = useRoute();
const { name } = route.params;

if (Array.isArray(name) || !(name in PORTFOLIO_MAP)) {
    throw createError({
        statusCode: 404,
    });
}

const id = PORTFOLIO_MAP[name];
</script>
<template>
    <div class="gallery">
        <Gallery :name="name" :id="id" />
    </div>
</template>
