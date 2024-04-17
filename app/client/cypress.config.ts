import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'hsewzb',
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      // implement node event listeners here
      return config;
    },
  },
});
