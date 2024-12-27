<style>
.menu {
  width: auto !important;
}
</style>


<script lang="ts" setup>
import { NSplit, NMenu, type MenuOption, NFlex, NGrid, NGi } from 'naive-ui';
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
        <NMenu
          mode="horizontal"
          :options="menuOptions"
          responsive
          class="menu"
        />
    </NFlex>
  </div>
</template>
