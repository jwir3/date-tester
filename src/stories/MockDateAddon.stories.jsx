import { SimpleDate } from './SimpleDate';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Mock Date Addon',
  component: SimpleDate,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    chromatic: {
      // Enable Chromatic's Date freezing so there's something for the addon to take
      // precedence over - this story is only interesting when both are in play.
      autoMockDate: true,
    },
  },
};

// A fixed instant distinct from both today's real date and Chromatic's frozen reference date,
// so it's unambiguous in a screenshot which clock actually won.
const ADDON_MOCK_DATE = new Date(2010, 5, 15); // June 15, 2010

// storybook-addon-mock-date installs its own fake `Date` (via @sinonjs/fake-timers) from a
// preview decorator that wraps the story's render function, which runs after Chromatic's
// init-script-based Date freezing - so the addon's fake Date should end up as the active one,
// taking precedence over Chromatic's frozen Date. Read `Date` inside `render`, not in a static
// `args` literal - `args` objects are evaluated once at module-import time, before the addon's
// decorator has installed its clock, so a static arg would still see Chromatic's frozen Date.
export const AddonMockDate = {
  parameters: {
    mockingDate: ADDON_MOCK_DATE,
  },
  render: () => <SimpleDate dateString={new Date().toDateString()} />,
};
