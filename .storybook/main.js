

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "storybook-addon-mock-date"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(viteConfig, {
      optimizeDeps: {
        // storybook-addon-mock-date's preview decorator is wired in through a dynamically
        // generated Storybook entry, which Vite's static esbuild dependency scanner can't crawl
        // into - so its dependency, @sinonjs/fake-timers, is never discovered up front and has
        // to be listed explicitly here. It also needs `needsInterop`: it's CommonJS with only
        // named `exports.x = ...` assignments and no `module.exports =`/`__esModule` marker, so
        // Vite can't tell on its own that it needs a synthesized default export - without both
        // of these, the addon's `import FakeTimers from '@sinonjs/fake-timers'` fails with "does
        // not provide an export named 'default'".
        include: ['@sinonjs/fake-timers'],
        needsInterop: ['@sinonjs/fake-timers'],
      },
    });
  },
};
export default config;