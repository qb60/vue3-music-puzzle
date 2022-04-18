<template>
  <n-card class="puzzle">
    <PuzzleElement
      v-for="(track, index) of tracks"
      :key="track.id"
      :languages="availableLanguages"
      :track="track"
      :number="index"
      @language-changed="onLanguageChanged"
      @play-started="onPlayStarted"
    />
    <div class="flex justify-end">
      <n-button
        :disabled="!isPuzzleCompleted"
        type="success"
        class="submit_button"
        >Submit result</n-button
      >
    </div>
  </n-card>
</template>

<script>
import PuzzleElement from "./PuzzleElement.vue";
import { NButton, NCard } from "naive-ui";
import { computed, onMounted, reactive, ref } from "vue";
import { fetchPuzzleData } from "../../api/api.js";

export default {
  name: "PuzzlePage",
  components: { PuzzleElement, NCard, NButton },
  props: {},
  setup() {
    const tracks = ref([]);
    const availableLanguages = ref([]);

    onMounted(async () => {
      const puzzle = await fetchPuzzleData();
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

    const isPuzzleCompleted = computed(
      () => availableLanguages.value.length === 0
    );

    let currentPlayerStopper = null;
    const onPlayStarted = (stopPlayer) => {
      if (currentPlayerStopper === stopPlayer) {
        return;
      }

      if (currentPlayerStopper) {
        currentPlayerStopper();
      }

      currentPlayerStopper = stopPlayer;
    };

    return {
      tracks,
      availableLanguages,
      isPuzzleCompleted,
      onLanguageChanged,
      onPlayStarted,
    };
  },
};
</script>

<style scoped></style>
