const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://vue3-abridge.netlify.app/',
    supportFile: false
  },
})