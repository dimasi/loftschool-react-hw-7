import {show} from './../api';
import {request, success} from './../actions/shows';

const infoFetchingMiddleware = store => next => action => {
  if (action.type === request.toString()) {
    show(action.payload).then(response => {
      store.dispatch(success(response));
    });
  }

  return next(action);
}

export default infoFetchingMiddleware;
