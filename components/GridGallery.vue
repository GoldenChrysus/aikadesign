<style>
.column {
    aspect-ratio: 1;
    position: relative;
}

.column::after {
    content: '';
    display: block;
    padding-bottom: 100%;
}

.column > a > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

<script lang="ts" setup>
import { NGi, NGrid } from 'naive-ui';
import { JA_PORTFOLIO_MAP } from '~/lib/consts';
import type { Portfolio } from '~/store/portfolios';

type Item = {
    id: string,
    src: string,
    portfolio: string,
};

type PortfolioData = {
    docs: Portfolio[],
}

const items = ref<Item[]>([]);

fetch('https://cms.uadesign.tokyo/api/portfolios').then(async (data) => {
    const docs: PortfolioData = await data.json();

    docs.docs.forEach((x) => {
        x.entry.forEach((y) => {
            items.value.push({
                id: y.id,
                src: `https://cms.uadesign.tokyo${y.image.url}`,
                portfolio: JA_PORTFOLIO_MAP[x.name],
            });
        });
    });
})
</script>

<template>
    <NGrid cols="2 700:4" :x-gap="20" :y-gap="20">
        <NGi v-for="item in items" :key="item.id" class="column">
            <NuxtLink :to="`/portfolio/${item.portfolio}/${item.id}`">
                <img :src="item.src" />
            </NuxtLink>
        </NGi>
    </NGrid>
</template>
