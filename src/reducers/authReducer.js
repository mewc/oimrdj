import {FETCH_AUTH_BEGIN, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE,FETCH_AUTH_NOT_FOUND,
SET_AUTH_BEGIN, SET_AUTH_FAILURE, SET_AUTH_SUCCESS} from '../actions/authActions.js';

let defaultState = {
  user: {
    displayName: null,
    email: null,
    token: null,
    photoUrl: null,
    isAnonymous: null,
    phone: null,
  },
};

export default function authReducer(state = defaultState, action){
  switch(action.type){
    case FETCH_AUTH_BEGIN:
    case SET_AUTH_BEGIN:
    return {
      ...state,
      loading: true,
      error: null
    };
    case: FETCH_AUTH_SUCCESS:
    return {

    };
  }
}
