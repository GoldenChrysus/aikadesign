<style scoped>
.disabled {
    pointer-events: none;
}

.page {
    height: 100svh;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    position: relative;
}

.wrapper {
    cursor: grab;
    display: flex;
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    z-index: 1;
    align-items: center;
}

.wrapper > div > .item {
    z-index: 2;
    transition: opacity 0.0s ease-out, translate 2.0s ease-out, rotate 2.0s ease-out;
}

.wrapper > div > .item.bouncy {
    transition: scale 0.5s ease, opacity 0.0s ease-out, translate 2.0s ease-out, rotate 2.0s ease-out;
}

.page-leave-active > .wrapper > div > .item {
    transition: scale 2.0s ease-out, opacity 0.0s ease-out, translate 2.0s ease-out, rotate 2.0s ease-out;
}

.wrapper > div > .item > a {
    display: flex;
    align-items: center;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
}

.wrapper > div > .item > a > img {
    max-height: 90%;
    max-width: 1200px;
}

.wrapper > div > .item > a > p {
    position: absolute;
    color: black;
    bottom: 0;
}

.wrapper > div > .item.scrolling {
    scale: 0.97;
}

.wrapper > div > .item.exiting > a > p {
    transition: all;
    animation: 0.5s title forwards;
}

@keyframes title {
    from {
        opacity: 1;
        filter: none;
    }

    to {
        opacity: 0;
        filter: blur(1rem);
    }
}

.focus-enter-active,
.focus-leave-active {
    position: static !important;
    padding: 10px;
}

.focus-enter-from,
.focus-leave-to {
    opacity: 0.5;
    padding: 10px;
}

.focus-enter-to,
.focus-leave-from {
    opacity: 1;
    padding: 10px;
}

.hide-enter-to,
.hide-leave-from {
    opacity: 1;
}

.hide-enter-from,
.hide-leave-to {
    opacity: 0;
}
</style>

<script setup lang="ts">
import { reactive } from 'vue';
import { getPortfolio } from '~/store/portfolios';

type PortfolioItem = {
    id: string,
    src: string,
    title: string,
}

const MAX_OFFSET = 200;
const OVERLAP = 10;

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});
const { id, name } = props;

const state = reactive({
    offset: MAX_OFFSET,
    previous_x: 0,
    mouse_down: false,
    scrolling: false,
    exiting: false,
    exited: false,
    next_route: '',
    focus: '',
});
const items = ref<PortfolioItem[]>([]);

getPortfolio(id).then((x) => {
    items.value = x.entry.map((y) => ({
        id: y.id,
        src: `https://cms.uadesign.tokyo/${y.image.url}`,
        title: y.title,
    }));
});

const getRotation = (index: number) => {
    const basis = 0.6;
    const candidate = (index + 1) * basis;
    const rotation = (candidate > 2) ? basis : candidate;
    const inverter = (index % 3 === 0) ? 1 : -1;

    return rotation * inverter;
};

const getOffset = (index: number) => state.offset - (index * OVERLAP);

const onMouseDown = (e: MouseEvent) => {
    state.previous_x = e.screenX;
    state.mouse_down = true;
};
const scroll = (e: PointerEvent) => {
    if (!state.mouse_down) {
        return;
    }

    const x = e.screenX;
    const delta = (state.previous_x - x) * 1.75;

    if (delta !== 0) {
        state.scrolling = true;
    }

    if (!state.scrolling) {
        return;
    }

    state.previous_x = x;
    state.offset = Math.min(state.offset - delta, MAX_OFFSET);
}
const onMouseUp = () => {
    state.scrolling = false;
    state.mouse_down = false;
};
const focus = (item: string) => {
    state.focus = item;

    const gallery = document.getElementById('gallery');

    for (const element of gallery?.getElementsByClassName('item')) {
        onLeave(element as HTMLElement);
    }
}

function getPosition(el) {
    var _x = 0;
    var _y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }

    return { top: _y, left: _x };
}

const solveForRealWidth = (rotated_width: number, rotated_height: number, rotation: number) => {
    // https://stackoverflow.com/questions/18472668/how-do-i-find-the-dimensions-of-a-rotated-rectangle-within-an-unrotated-rectangl

    const radians = Math.abs(rotation) * Math.PI / 180;
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);

    return ((rotated_width * cos) - (rotated_height * sin)) / (Math.pow(cos, 2) - Math.pow(sin, 2));
}

const onLeave = (x: HTMLElement) => {
    if (x.id !== state.focus) {
        x.style.opacity = '0';
    } else {
        const rect = x.getBoundingClientRect();

        setTimeout(() => {
            x.classList.add('exiting');

            const positions = getPosition(x);
            x.style.position = 'fixed';
            x.style.top = `${positions.top}px`;
            x.style.left = `${positions.left}px`;
            x.style.translate = '0px 0px';

            setTimeout(() => {
                const real_Width = solveForRealWidth(rect.width, rect.height, +x.style.rotate.replace('deg', '').trim());
                const max_width = 750;
                const scale = (real_Width > max_width) ? max_width / real_Width : 1;
                const new_left = (positions.left * -1) - ((real_Width - (real_Width * scale)) / 2) + 40;

                x.style.rotate = '0deg';
                x.style.translate = `${new_left}px 0px`;
                x.style.scale = `${scale}`;
            }, 1);
        }, 0);
    }
};
</script>

<template>
    <div class="page">
        <div
            id="gallery"
            class="wrapper"
            @pointerdown.prevent="onMouseDown"
            @pointermove.prevent="scroll"
            @pointerup.prevent="onMouseUp"
        >
            <div v-for="(val, index) in items" v-if="!state.exited" :key="val.id">
                <div
                    :class="{
                        item: true,
                        focus: (val.id === state.focus),
                        bouncy: !state.exiting,
                        scrolling: state.scrolling,
                    }"
                    :id="val.id"
                    :key="`${val}-${(state.exiting) ? '0' : '1'}`"
                    :style="`
                        rotate: ${getRotation(index)}deg;
                        translate: ${getOffset(index)}px 0;
                    `"
                >
                        <NuxtLink
                            :to="`/portfolio/${name}/${val.id}`"
                            :class="{
                                disabled: state.scrolling,
                            }"
                            :aria-disabled="state.scrolling"
                            @click.native="() => focus(val.id)"
                        >
                            <img
                                :key="`${val}-img`"
                                :src="val.src"
                            >
                            <p>{{ val.title }}</p>
                        </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
