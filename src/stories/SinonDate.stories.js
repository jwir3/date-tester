import sinon from 'sinon';

import { SimpleDate } from './SimpleDate';

// Simulates a customer who installs Sinon's fake timers themselves, e.g. in test/story setup
// code. This runs as part of evaluating this story module, which happens after Chromatic's own
// init-script-based Date freezing has already run - so Sinon's fake Date should end up as the
// active one, taking precedence over the frozen Date the render pipeline installs.
//
// Note: computed via Date.UTC() (a real passthrough on Chromatic's frozen Date), NOT
// `new Date(...)` - the frozen Date's constructor only freezes zero-argument construction (the
// only case that's actually "now"-dependent and thus flaky), and passes explicit arguments
// through to the real Date. But `new Date(...)` with an explicit arg still constructs a REAL
// Date - it just no longer forces the frozen instant - so using it here to compute our own
// reference timestamp would be needlessly roundabout. Date.UTC() gets us there directly.
const SINON_FAKE_TIMESTAMP = Date.UTC(2000, 0, 1);
// Only fake `Date` - faking all timers (Sinon's default) also fakes setTimeout/setInterval/
// requestAnimationFrame, which breaks Storybook and Chromatic's own rendering machinery.
// Keep a handle on the clock so a later story can advance it with `clock.tick()`.
const clock = sinon.useFakeTimers({ now: SINON_FAKE_TIMESTAMP, toFake: ['Date'] });

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Sinon Date',
  component: SimpleDate,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    chromatic: {
      // Enable Chromatic's Date freezing so there's something for Sinon to take precedence
      // over - this story is only interesting when both are in play.
      autoMockDate: true,
    },
  },
};

// Both `Date.now()` and `new Date()` should reflect Sinon's fake clock (Jan 01, 2000), not
// Chromatic's frozen reference date - Chromatic's frozen Date only forces its own instant for
// zero-argument construction, and Sinon's fake Date class (which extends whatever Date it finds,
// including Chromatic's) passes its own fake "now" through as an explicit argument via
// `super(...)` rather than relying on the zero-argument case - so the frozen Date's constructor
// never gets a chance to override it.
export const SinonFakeTimers = {
  args: {
    dateString: new Date().toDateString(),
  },
};

// Advance Sinon's fake clock forward with `clock.tick()`, then read `Date` again - this confirms
// the tick/advance API actually moves whichever Date is currently active (Sinon's fake, layered
// over Chromatic's frozen Date per the precedence established above), rather than the fake clock
// silently staying pinned to its initial instant or drifting back to the frozen/real one.
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
clock.tick(ONE_DAY_MS);

export const SinonClockTick = {
  args: {
    dateString: new Date().toDateString(),
  },
};
