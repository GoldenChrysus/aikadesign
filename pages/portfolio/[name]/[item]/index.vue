<style>
.container {
    position: fixed;
    display: grid;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
}

.inner {
    height: 80vh;
    display: flex;
    align-items: center;
    grid-column: 1 / 2;
}

.info {
    grid-column: 2 / 2;
}

.container > .inner > img {
    max-width: 750px;
    max-height: 100%;
}

.info-fade-enter-active,
.info-fade-leave-active {
    transition: all 0s;
}

.info-fade-enter-from .info {
    opacity: 0;
}

.info-transition {
    transition: all;
    animation: 0.5s info;
}

@keyframes info {
    from {
        opacity: 0;
        filter: blur(1rem);
    }

    to {
        opacity: 1;
        filter: none;
    }
}
</style>

<script setup lang="ts">
import { PORTFOLIO_MAP } from '~/lib/consts';
import { getPortfolio } from '~/store/portfolios';

definePageMeta({
    pageTransition: {
        name: 'info-fade',
        mode: 'out-in',
        onAfterEnter: (el) => {
            for (const item of el.getElementsByClassName('info')) {
                item.classList.add('info-transition');
            }
        }
    },
});

const route = useRoute();
const { name, item } = route.params;
const state = reactive({
    src: '',
    info: '',
    title: '',
});

if (Array.isArray(name) || !(name in PORTFOLIO_MAP)) {
    throw createError({
        statusCode: 404,
    });
}

const id = PORTFOLIO_MAP[name];

getPortfolio(id).then((x) => {
    let entry = x.entry.find((y) => y.id === item);

    if (!entry) {
        throw createError({
            statusCode: 404,
        });
    }

    state.src = `https://cms.uadesign.tokyo/${entry.image.url}`;
    state.info = entry.info_html;
});
</script>
<template>
    <div class="container">
        <div class="inner">
            <img :key="state.src" :src="state.src">
            <p></p>
        </div>
        <div class="info" v-html="state.info"></div>
    </div>
</template>
