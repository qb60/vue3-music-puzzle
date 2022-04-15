<template>
  <div class="text-center text-lg">Track {{ number + 1 }}</div>
  <AudioPlayer :src="trackPath" />
  <div class="flex items-center">
    <n-select
      clearable
      placeholder="Select language"
      v-model:value="selectedLanguage"
      :options="
        languages.map((item) => ({
          label: item,
          value: item,
        }))
      "
    />
    <n-button class="ml-3" @click="onResetButtonClicked">Reset</n-button>
  </div>
  <n-divider />
</template>

<script>
import { NButton, NDivider, NSelect } from "naive-ui";
import AudioPlayer from "./AudioPlayer.vue";
import { ref, watch } from "vue";

const Events = {
  LANGUAGE_CHANGED: "language-changed",
};

export default {
  name: "PuzzleElement",
  components: { NSelect, NDivider, NButton, AudioPlayer },
  props: {
    number: {
      type: Number,
      required: true,
    },
    trackPath: {
      type: String,
      required: true,
    },
    languages: {
      type: Array,
      required: true,
    },
  },
  events: Events,
  emits: Object.values(Events),
  setup(_, ctx) {
    const selectedLanguage = ref(null);

    watch(selectedLanguage, (newLanguage, oldLanguage) => {
      ctx.emit(Events.LANGUAGE_CHANGED, newLanguage, oldLanguage);
    });

    const onResetButtonClicked = () => {
      selectedLanguage.value = null;
    };

    return { selectedLanguage, onResetButtonClicked };
  },
};
</script>

<style scoped></style>
