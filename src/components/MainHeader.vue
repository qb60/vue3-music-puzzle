<template>
  <header>
    <n-card>
      <div class="flex justify-between">
        <span>M-P</span>
        <div>
          <span class="px-3">Light mode</span>
          <n-switch v-model="value" />
        </div>
      </div>
    </n-card>
  </header>
</template>

<script>
import { NCard, NSwitch } from "naive-ui";
import { computed } from "vue";

const UPDATE_EVENT = "update:modelValue";

export default {
  name: "MainHeader",
  components: { NCard, NSwitch },
  props: ["modelValue"],
  emits: [UPDATE_EVENT],
  setup(props, ctx) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        ctx.emit(UPDATE_EVENT, value);
      },
    });

    return { value };
  },
};
</script>

<style scoped></style>
