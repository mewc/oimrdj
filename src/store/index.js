import {createStore, applyMiddleware} from 'redux';
// import devToolsEnhancer from 'remote-redux-devtools';
import movieReducer from '../reducers/reducer.js';
import thunk from 'redux-thunk';


export const store = createStore(
  movieReducer,
   // devToolsEnhancer(),
    applyMiddleware(thunk)
 );
