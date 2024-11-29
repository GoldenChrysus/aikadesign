<style>
body {
    margin: 0;
}
</style>

<script setup lang="ts">
import Gallery from '~/components/Gallery.vue';

definePageMeta({
    pageTransition: {
        name: 'custom-glide',
        mode: 'out-in',
        onBeforeEnter: (el) => {
            console.log(el);
        },
        onEnter: (el, done) => {
            console.log('onEnter', el);
            done();
        },
        onAfterEnter: (el) => {
            console.log('onAfterEnter', el);
        },
        onBeforeLeave(el) {
            console.log('onBeforeLeave', el);
        },
        onLeave(el, done) {
            console.log('onLeave', el);
        },
    },
});
</script>

<template>
    <Gallery />
</template>
