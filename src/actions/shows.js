import {createActions} from 'redux-actions';

const actionCreators = createActions(
  {
    SHOWS: {
      REQUEST: undefined,
      SUCCESS: undefined,
      ERROR: undefined
    }
  },
  {namespace: '_'}
);

export const request = actionCreators.shows.request;
export const success = actionCreators.shows.success;
export const error = actionCreators.shows.error;
