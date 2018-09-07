import {SNACKBAR} from '../actions/actions.js';
import * as strings from '../static/Strings.js';

let defaultState = {
  appBio: strings.APP_BIO_VARIANTS,
  loading: false,
  error: null,
  notification: false
};

export default function reducer(state = defaultState, action){
  switch(action.type){
    case SNACKBAR:
    return {
      ...state,
      notification: action.payload.message,
    }
    default:
    return state;
  }
}
