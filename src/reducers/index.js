import {combineReducers} from 'redux';
import search from './search';
import shows from './shows';

export default combineReducers({
  search,
  shows
});

export const getSearchProps = state => state.search;
export const getShowProps = state => state.shows;
