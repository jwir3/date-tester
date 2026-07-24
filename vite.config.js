/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // storybook-addon-mock-date's preview decorator is wired in through a dynamically generated
    // Storybook entry, which Vite's static esbuild dependency scanner can't crawl into - so its
    // dependency, @sinonjs/fake-timers, is never discovered up front and has to be listed
    // explicitly here. It also needs `needsInterop`: it's CommonJS with only named
    // `exports.x = ...` assignments and no `module.exports =`/`__esModule` marker, so Vite can't
    // tell on its own that it needs a synthesized default export - without both of these, the
    // addon's `import FakeTimers from '@sinonjs/fake-timers'` fails with "does not provide an
    // export named 'default'".
    include: ['@sinonjs/fake-timers'],
    needsInterop: ['@sinonjs/fake-timers'],
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});