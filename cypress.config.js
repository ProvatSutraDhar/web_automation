const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1376,
    viewportHeight: 720,
    baseUrl: 'https://www.tvhut.com.bd/',
  },
})