import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {request, success} from './../actions/search';

const isFetching = handleActions({
  [request]: (state, action) => true,
  [success]: (state, action) => false
}, false);

const entities = handleActions({
  [success]: (state, action) => action.payload
}, []);

export default combineReducers({
  isFetching,
  entities
});
