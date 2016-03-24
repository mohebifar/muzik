import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import player from './modules/player';
import playlist from './modules/playlist';

export default combineReducers({
  player,
  playlist,
  routing: routerReducer
});
