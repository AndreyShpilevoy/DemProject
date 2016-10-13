/* eslint no-console: "off" */
/* eslint no-undef: "off" */
import Raven from 'raven-js';

Raven.config('https://229f9b3a767047bfbf64485673f58723@sentry.io/105956').install();

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    Raven.captureException(error, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw error;
  }
};

export default crashReporter;
