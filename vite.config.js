import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   postcss: {
  //     plugins: [
  //       {
  //         postcssPlugin: "internal:charset-removal",
  //         AtRule: {
  //           charset: (atRule) => {
  //             if (atRule.name === "charset") {
  //               atRule.remove();
  //             }
  //           },
  //         },
  //       },
  //     ],
  //   },
  // },
  plugins: [
    vue(),
    visualizer(() => {
      return { filename: path.join("stats", "stats.html") };
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
