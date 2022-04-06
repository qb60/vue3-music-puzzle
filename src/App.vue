<template>
  <n-config-provider :theme="theme">
    <div class="app flex justify-center mx-0 sm:mx-6">
      <div class="flex-1 max-w-5xl">
        <main-header v-model="isDarkTheme" />
        <n-card class="puzzle">
          <div
            class="puzzle__element"
            v-for="(track, index) of tracks"
            :key="track.id"
          >
            <div class="text-center text-lg">Track {{ index + 1 }}</div>
            <AudioPlayer :src="track.path" />
            <div class="flex items-center">
              <n-select
                clearable
                :options="
                  availableLanguages.map((item) => ({
                    label: item,
                    value: item,
                  }))
                "
                placeholder="Select language"
              />
              <n-button class="ml-3">Reset</n-button>
            </div>
            <n-divider />
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
  NSelect,
  NCard,
  NDivider,
  NButton,
} from "naive-ui";
import AudioPlayer from "./components/AudioPlayer.vue";
import MainHeader from "./components/MainHeader.vue";

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

export default {
  components: {
    NConfigProvider,
    NGlobalStyle,
    NSelect,
    NCard,
    NDivider,
    NButton,
    AudioPlayer,
    MainHeader,
  },
  setup() {
    const isDarkTheme = ref(false);
    const theme = computed(() => (isDarkTheme.value ? null : darkTheme));

    const availableLanguages = ref([]);

    onBeforeMount(() => {
      availableLanguages.value.push(...languages);
    });

    const onLanguageSelected = (language) => {
      availableLanguages.value = availableLanguages.value.filter(
        (lang) => lang !== language
      );
    };

    const onLanguageUnselected = (language) => {
      availableLanguages.value = [...availableLanguages.value, language];
    };

    const stopOtherPlayers = (trackId) => {};

    return {
      isDarkTheme,
      theme,
      tracks,
      availableLanguages,
      onLanguageSelected,
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
