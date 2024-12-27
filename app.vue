<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';

</script>

<template>
  <NConfigProvider inline-theme-disabled>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
  </NConfigProvider>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 2s;
}
.page-enter-from {
  opacity: 0;
  filter: blur(1rem);
}

* {
    box-sizing: border-box;
}
</style>
