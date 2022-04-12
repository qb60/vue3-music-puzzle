<template>
  <div class="player">
    <audio :src="src" ref="audio"></audio>
  </div>
</template>

<script>
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { onBeforeUnmount, onMounted, ref } from "vue";

const controls = [
  "play",
  "restart",
  "progress",
  "current-time",
  "mute",
  "volume",
];

const Events = {
  PLAY_STARTED_EVENT: "play-started",
};

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  emits: [Events.PLAY_STARTED_EVENT],
  setup(props, ctx) {
    const audio = ref(null);
    let player;

    onMounted(() => {
      player = new Plyr(audio.value, {
        controls,
        invertTime: false,
        seekTime: 5,
      });

      player.on("play", () => {
        ctx.emit(Events.PLAY_STARTED_EVENT, player);
      });
    });

    onBeforeUnmount(() => {
      try {
        player.destroy();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    const stop = () => {
      player.stop();
    };

    return {
      audio,
      stop,
    };
  },
};
</script>

<style scoped>
.player {
  --plyr-audio-controls-background: background-color;
  --plyr-audio-control-color: #aaaaaa;
}
</style>
