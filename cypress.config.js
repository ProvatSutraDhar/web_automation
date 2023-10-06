const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1376,
    viewportHeight: 720,
    baseUrl: 'https://www.tvhut.com.bd/',
  },
  plugins: (on) => {
    allureWriter(on);
  },
});
