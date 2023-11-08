const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,  // Default viewport width
  viewportHeight: 1080,  // Default viewport height
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
