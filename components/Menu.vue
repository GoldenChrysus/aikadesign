<style>
.menu {
    width: auto !important;
}

.logo {
    width: 80px;
}

.mobile {
  display: none;
}

@media only screen and (max-width: 700px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }

    .logo {
      width: 50px;
    }
}
</style>


<script lang="ts" setup>
import { NMenu, type MenuOption, NFlex, NGrid, NGi } from 'naive-ui';
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
      {
        label: () => h(
          'a',
          {
            href: '/portfolio/graphic',
          },
          'グラフィック',
        ),
        key: 'portfolio/graphic',
      },
      {
        label: () => h(
          'a',
          {
            href: '/portfolio/home-page',
          },
          'ホームページ',
        ),
        key: 'portfolio/home-page',
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
    <div class="desktop">
      <NGrid :cols="3">
        <NGi></NGi>
        <NGi style="text-align: center;">
          <a href="/">
            <img
              src="/ua-design.png"
              class="logo"
            >
          </a>
        </NGi>
        <NGi>
          <NFlex justify="end">
            <ClientOnly>
              <NMenu
                mode="horizontal"
                :options="menuOptions"
                responsive
                class="menu"
              />
            </ClientOnly>
          </NFlex>
        </NGi>
      </NGrid>
    </div>
    <div class="mobile">
      <NFlex justify="space-between" align="center">
          <div>
            <img
              src="/ua-design.png"
              class="logo"
            >
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
  </div>
</template>
