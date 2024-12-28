<style>
.container {
    display: grid;
    height: calc(100% - 78px);
    /* min-height: 100vh; */
    width: 100%;
    padding: 1rem;
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

.breadcrumb {
    height: 30px;
    width: 100%;
    max-width: 100%;
    overflow-wrap: anywhere;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    grid-column: 1 / span 2;
}

.breadcrumb li {
    overflow-wrap: anywhere;
    word-wrap: break-word;
    word-break: break-all;
}

@media only screen and (max-width: 700px) {
    .container {
        align-items: start;
        grid-template-rows: auto 1fr;
        margin-top: 0;
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

    .breadcrumb {
        height: auto;
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

.slide-transition {
    transition: all;
    animation: 1s slide;
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

@keyframes slide {
    from {
        transform: translateX(-100vw);
    }

    to {
        transform: translateX(0);
    }
}
</style>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import { PORTFOLIO_MAP } from '~/lib/consts';
import { getPortfolio } from '~/store/portfolios';

definePageMeta({
    pageTransition: {
        name: 'info-fade',
        mode: 'out-in',
        onBeforeEnter: (el) => {
            const { isMobile } = useDevice();

            if (isMobile) {
                for (const item of el.getElementsByClassName('inner')) {
                    item.classList.add('slide-transition');
                }
            }
        },
        onAfterEnter: (el) => {
            for (const item of el.getElementsByClassName('info')) {
                item.classList.add('enter-transition');
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
    portfolio: '',
});

if (Array.isArray(name) || !(name in PORTFOLIO_MAP)) {
    throw createError({
        statusCode: 404,
    });
}

const id = PORTFOLIO_MAP[name];

getPortfolio(id).then((x) => {
    state.portfolio = x.name;

    let entry = x.entry.find((y) => y.id === item);

    if (!entry) {
        throw createError({
            statusCode: 404,
        });
    }

    state.src = `https://cms.uadesign.tokyo${entry.image.url}`;
    state.info = entry.info_html;
    state.title = entry.title;
});
</script>
<template>
    <div class="container">
        <NBreadcrumb class="breadcrumb">
            <NBreadcrumbItem>
                <NuxtLink :to="`/portfolio/${name}`">{{ state.portfolio }}</NuxtLink>
            </NBreadcrumbItem>
            <NBreadcrumbItem>{{ state.title }}</NBreadcrumbItem>
        </NBreadcrumb>
        <div class="inner">
            <img :key="state.src" :src="state.src" />
        </div>
        <div class="info" v-html="state.info"></div>
    </div>
</template>
