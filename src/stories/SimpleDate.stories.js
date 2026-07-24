import { fn } from 'storybook/test';

import { SimpleDate } from './SimpleDate';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Simple Date',
  component: SimpleDate,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    chromatic: {
      // Freeze the global Date to a fixed instant so this story doesn't flake day to day.
      autoMockDate: true,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/arg-types
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  // args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SingleString = {
  args: {
    dateString: new Date().toDateString()
  },
};