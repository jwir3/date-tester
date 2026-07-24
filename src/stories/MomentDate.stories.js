import moment from 'moment';

import { SimpleDate } from './SimpleDate';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Moment Date',
  component: SimpleDate,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    chromatic: {
      // Freeze the global Date to a fixed instant so this story doesn't flake day to day.
      autoMockDate: true,
    },
  },
};

// `moment()` with no input reads the current instant via `Date.now()` and passes that
// timestamp into `new Date(timestamp)` - both the zero-arg `Date.now()` read and the frozen
// instant it returns are covered by Chromatic's Date mock, so moment should render the same
// frozen date on every run rather than today's real date.
export const MomentNow = {
  args: {
    dateString: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  },
};
