// https://docs.cypress.io/guides/guides/plugins-guide.html

module.exports = (on, config) =>
  Object.assign({}, config, {
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
  });
