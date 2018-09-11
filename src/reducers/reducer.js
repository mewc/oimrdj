import {SNACKBAR} from '../actions/actions.js';
import * as strings from '../static/Strings.js';
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_BEGIN, LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_BEGIN} from '../actions/authActions.js';


let defaultUser = {
    user: {
        displayName: null,
        email: null,
        token: null,
        photoUrl: null,
        isAnonymous: null,
        phone: null,
    }
};

let defaultState = {
    appBio: strings.APP_BIO_VARIANTS,
    loading: false,
    error: null,
    notification: false,
    user: defaultUser,
    room: null,
    requests: null,
};



export default function reducer(state = defaultState, action){
    switch(action.type){
    case SNACKBAR:
        return {
          ...state,
          notification: action.payload.message,
        };
    case LOGIN_BEGIN:
    case LOGOUT_BEGIN:
        return {
            ...state,
            loading: true,
            error: null
        };
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error
        };
    case LOGIN_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
            user: action.payload.user
        };
    case LOGOUT_SUCCESS:
        return {
                ...state,
                loading: false,
                error: null,
                user: defaultUser,
            }
    default:
    return state;
    }
}




