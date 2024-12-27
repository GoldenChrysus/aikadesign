<script setup lang="ts">
const map = {
    banner: 1,
};
const route = useRoute();
const { name, item } = route.params;

if (Array.isArray(name) || !(name in map)) {
    throw createError({
        statusCode: 404,
    });
}
</script>
<template>
    <div class="container">
        <div class="inner">
            <img key="gym.png-img" :src="`/gallery/${item}`">
        </div>
    </div>
    Hello
</template>
