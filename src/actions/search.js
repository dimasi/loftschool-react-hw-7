import {createActions} from 'redux-actions';

const actionCreators = createActions(
  {
    SEARCH: {
      REQUEST: undefined,
      SUCCESS: undefined,
      ERROR: undefined
    }
  },
  {namespace: '_'}
);

export const request = actionCreators.search.request;
export const success = actionCreators.search.success;
export const error = actionCreators.search.error;
