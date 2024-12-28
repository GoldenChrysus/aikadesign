<style>
body {
    margin: 0;
}

.page-enter-from {
    opacity: 0;
    filter: blur(1rem);
}
</style>

<script setup lang="ts">
import Gallery from '~/components/Gallery.vue';
import { PORTFOLIO_MAP } from '~/lib/consts';

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
    <Gallery :name="name" :id="id" />
</template>
