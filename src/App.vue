<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <div class="app flex justify-center mx-0 sm:mx-6">
      <div class="flex-1 max-w-5xl">
        <main-header v-model="isDarkTheme" />
        <PuzzlePage />
      </div>
    </div>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { computed, ref } from "vue";
import { darkTheme, NConfigProvider, NGlobalStyle } from "naive-ui";

import MainHeader from "./components/MainHeader.vue";
import PuzzlePage from "./components/puzzle/PuzzlePage.vue";

/**
 * Use this for type hints under js file
 * @type import('naive-ui').GlobalThemeOverrides
 */
const lightThemeOverrides = {
  common: {
    dividerColor: "#bbbbbb",
    borderColor: "#cccccc",
  },
};

export default {
  components: {
    NConfigProvider,
    NGlobalStyle,
    MainHeader,
    PuzzlePage,
  },
  setup() {
    const isDarkTheme = ref(false);
    const theme = computed(() => (isDarkTheme.value ? null : darkTheme));
    const themeOverrides = computed(() =>
      isDarkTheme.value ? lightThemeOverrides : null
    );

    return {
      themeOverrides,
      isDarkTheme,
      theme,
    };
  },
};
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*min-height: 100vh;*/
}
</style>
