<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <div class="app flex justify-center mx-0 sm:mx-6">
      <div class="flex-1 max-w-5xl">
        <main-header v-model="isDarkTheme" />
        <n-card class="puzzle">
          <div
            class="puzzle__element"
            v-for="(track, index) of tracks"
            :key="track.id"
          >
            <PuzzleElement
              :languages="availableLanguages"
              :track-path="track.path"
              :number="index"
              @language-changed="onLanguageChanged"
            />
          </div>
          <div class="flex justify-end">
            <n-button type="success">Submit result</n-button>
          </div>
        </n-card>
      </div>
    </div>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { computed, onBeforeMount, ref } from "vue";
import {
  darkTheme,
  NConfigProvider,
  NGlobalStyle,
  NCard,
  NButton,
} from "naive-ui";

import MainHeader from "./components/MainHeader.vue";
import PuzzleElement from "./components/puzzle/PuzzleElement.vue";

const tracks = [
  { id: 0, path: "tracks/1.mp3" },
  { id: 1, path: "tracks/2.mp3" },
  { id: 2, path: "tracks/3.mp3" },
  { id: 3, path: "tracks/4.mp3" },
  { id: 4, path: "tracks/5.mp3" },
  { id: 5, path: "tracks/6.mp3" },
  { id: 6, path: "tracks/7.mp3" },
  { id: 7, path: "tracks/8.mp3" },
];

const languages = [
  "Belorussian",
  "Bulgarian",
  "Czech",
  "Polish",
  "Russian",
  "Slovak",
  "Slovenian",
  "Ukrainian",
];

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
    NCard,
    NButton,
    MainHeader,
    PuzzleElement,
  },
  setup() {
    const isDarkTheme = ref(false);
    const theme = computed(() => (isDarkTheme.value ? null : darkTheme));
    const themeOverrides = computed(() =>
      isDarkTheme.value ? lightThemeOverrides : null
    );

    const availableLanguages = ref([]);

    onBeforeMount(() => {
      availableLanguages.value.push(...languages);
    });

    const onLanguageChanged = (newLanguage, oldLanguage) => {
      if (newLanguage) {
        availableLanguages.value = availableLanguages.value.filter(
          (lang) => lang !== newLanguage
        );
      }
      if (oldLanguage) {
        availableLanguages.value = [
          ...availableLanguages.value,
          oldLanguage,
        ].sort();
      }
    };

    const stopOtherPlayers = (trackId) => {};

    return {
      themeOverrides,
      isDarkTheme,
      theme,
      tracks,
      availableLanguages,
      onLanguageChanged,
      stopOtherPlayers,
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
