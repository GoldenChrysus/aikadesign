<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.5s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>

<template>
    <div style="padding: 1rem;">
        <GridGallery />
    </div>
</template>
