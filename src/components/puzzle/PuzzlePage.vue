<template>
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
</template>

<script>
import PuzzleElement from "./PuzzleElement.vue";
import { NButton, NCard } from "naive-ui";
import { onBeforeMount, ref } from "vue";

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
  name: "PuzzlePage",
  components: { PuzzleElement, NCard, NButton },
  props: {},
  setup() {
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

    return {
      tracks,
      availableLanguages,
      onLanguageChanged,
    };
  },
};
</script>

<style scoped></style>
