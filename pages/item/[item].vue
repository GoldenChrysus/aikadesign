<style>
.container {
    position: fixed;
    display: flex;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    align-items: center;
}

.inner {
    height: 80vh;
    display: flex;
    align-items: center;
}
.container > .inner > img {
    max-width: 750px;
    max-height: 100%;
}
</style>

<script setup lang="ts">
const route = useRoute();
const { item } = route.params;
</script>
<template>
    <div class="container">
        <div class="inner">
            <img key="gym.png-img" :src="`/gallery/${item}`">
        </div>
    </div>
</template>
