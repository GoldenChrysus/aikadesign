<style>
.container {
    position: fixed;
    top: 0;
    z-index: 222;
    display: flex;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    align-items: center;
}

.container > .image {
    max-width: 750px;
}

.container > .image > img {
    max-width: 750px;
}
</style>

<script setup lang="ts">

</script>
<template>
    <div class="container">
        <div class="image">
            <img key="gym.png-img" src="/gallery/gym.png">
        </div>
    </div>
</template>
