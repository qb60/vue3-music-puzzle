<template>
  <n-card class="puzzle">
    <div v-for="(track, index) of tracks" :key="track.id">
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
import { onMounted, ref } from "vue";
import { fetchPuzzleData } from "../../api/api.js";

export default {
  name: "PuzzlePage",
  components: { PuzzleElement, NCard, NButton },
  props: {},
  setup() {
    const tracks = ref([]);
    const availableLanguages = ref([]);

    onMounted(() => {
      const puzzle = fetchPuzzleData();
      tracks.value = puzzle.tracks;
      availableLanguages.value.push(...puzzle.languages);
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
