<style scoped>
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
    background: black;
    width: 100%;
    height: 100%;
    z-index: 1;
    align-items: center;
}

.wrapper > .item {
    height: 80vh;
    width: 700px;
    min-width: 700px;
    z-index: 2;
    transition: scale 0.5s ease;
}

.wrapper > .item.scrolling {
    scale: 0.97;
}
</style>

<script setup>
import { reactive } from 'vue';

const MAX_OFFSET = 200;

const state = reactive({
    offset: MAX_OFFSET,
    previous_x: 0,
    scrolling: false,
});
const items = ref([
    'red',
    'blue',
    'orange',
    'green',
]);

const getRotation = (index) => {
    const basis = 0.6;
    const candidate = (index + 1) * basis;
    const rotation = (candidate > 2) ? basis : candidate;
    const inverter = (index % 3 === 0) ? 1 : -1;

    return rotation * inverter;
};

const getOffset = (index) => state.offset - (index * 20);

const onMouseDown = (e) => {
    state.previous_x = e.screenX;
    state.scrolling = true;
};
const scroll = (e) => {
    if (!state.scrolling) {
        return;
    }

    const x = e.screenX;
    const delta = (state.previous_x - x) * 1.75;

    state.previous_x = x;
    state.offset = Math.min(state.offset - delta, MAX_OFFSET);
}
const onMouseUp = () => state.scrolling = false;
</script>

<template>
    <div class="page">
        <div class="wrapper" @pointerdown.prevent="onMouseDown" @pointermove.prevent="scroll" @pointerup.prevent="onMouseUp">
            <div
                v-for="(val, index) in items"
                :class="{
                    item: true,
                    scrolling: state.scrolling,
                }"
                :key="`${val}`"
                :style="`
                    background: ${val};
                    rotate: ${getRotation(index)}deg;
                    translate: ${getOffset(index)}px 0;
                `"
            ></div>
        </div>
    </div>
</template>
