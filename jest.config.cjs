module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    "^.+\\.vue$": "vue3-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["json", "js", "jsx", "ts", "tsx", "vue"],
  testEnvironment: 'jsdom',
};
