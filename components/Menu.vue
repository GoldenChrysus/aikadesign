<style>
.menu {
  width: auto !important;
}
</style>


<script lang="ts" setup>
import { NMenu, type MenuOption, NFlex } from 'naive-ui';
import { h } from 'vue';

const menuOptions: MenuOption[] = [
  {
    label: () => h(
      'a',
      {
        href: '/',
      },
      'ホーム',
    ),
    key: '',
  },
  {
    label: 'ポートフォリオ',
    children: [
      {
        label: () => h(
          'a',
          {
            href: '/portfolio/banner',
          },
          'バナー',
        ),
        key: 'portfolio/banner',
      },
    ],
    key: 'portfolio',
  },
  {
    label: () => h(
      'a',
      {
        href: 'mailto:aika@uadesign.tokyo',
      },
      'ご連絡',
    ),
    key: 'contact',
  }
];
</script>

<template>
  <div style="padding: 1rem;">
    <NFlex :cols="2" justify="space-between" align="center">
      <div>
        Logo.
      </div>
      <ClientOnly>
        <NMenu
          mode="horizontal"
          :options="menuOptions"
          responsive
          class="menu"
        />
      </ClientOnly>
    </NFlex>
  </div>
</template>
