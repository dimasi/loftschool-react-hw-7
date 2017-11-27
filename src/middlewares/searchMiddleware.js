import {search} from './../api';
import {request, success} from './../actions/search';

const entitiesFetchingMiddleware = store => next => action => {
  if (action.type === request.toString()) {
    search(action.payload).then(response => {
      store.dispatch(success(response));
    });
  }

  return next(action);
}

export default entitiesFetchingMiddleware;
