/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/*.{spec,test}.{j,t}s?(x)",
        "**/tests/unit/**/*.test.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
