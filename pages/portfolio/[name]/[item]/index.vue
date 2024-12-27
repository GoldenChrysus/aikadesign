<style>
.container {
    position: fixed;
    display: grid;
    height: calc(100% - 78px);
    /* min-height: 100vh; */
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
    grid-column: 1 / span 1;
}

.info {
    grid-column: 2 / span 1;
}

.container > .inner > img {
    max-width: 750px;
    max-height: 90%;
}

@media only screen and (max-width: 700px) {
    .container {
        align-items: start;
        grid-template-rows: auto 1fr;
    }

    .inner {
        height: auto;
        grid-column: 1 / span 2;
    }

    .container > .inner > img {
        max-width: 100%;
    }

    .info {
        grid-column: 1 / span 2;
    }
}

.info-fade-enter-active,
.info-fade-leave-active {
    transition: all 0s;
}

.info-fade-enter-from .info {
    opacity: 0;
}

.enter-transition {
    transition: all;
    animation: 0.5s enter;
}

@keyframes enter {
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

const { isMobile } = useDevice();

definePageMeta({
    pageTransition: {
        name: 'info-fade',
        mode: 'out-in',
        onAfterEnter: (el) => {
            for (const item of el.getElementsByClassName('info')) {
                item.classList.add('enter-transition');
            }

            if (isMobile) {
                for (const item of el.getElementsByClassName('inner')) {
                    item.classList.add('enter-transition');
                }
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
        </div>
        <div class="info" v-html="state.info"></div>
    </div>
</template>
