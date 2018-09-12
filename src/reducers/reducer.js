import {SNACKBAR} from '../actions/actions.js';
import * as strings from '../static/Strings.js';
import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_BEGIN, LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_BEGIN} from '../actions/authActions.js';
import {
    FIND_ROOM_BEGIN,
    FIND_ROOM_FAILURE,
    CREATE_ROOM_FAILURE,
    CREATE_ROOM_BEGIN,
    EXIT_ROOM_FAILURE,
    EXIT_ROOM_SUCCESS,
    ENTER_ROOM_FAILURE,
    ENTER_ROOM_SUCCESS,
    ENTER_ROOM_BEGIN,
    EXIT_ROOM_BEGIN,
    FIND_ROOM_SUCCESS,
    CREATE_ROOM_SUCCESS, SWITCH_TAB
} from "../actions/roomActions";

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
    title: strings.APP_NAME,
    appBio: strings.APP_BIO_VARIANTS,
    loading: false,
    error: null,
    notification: false,    //this is the snackbar message - usually errors
    user: defaultUser,
    room: null,
    requests: null,
    message: '', //this shows in title or state updates
    roomTab: 'search', //defaults so bottom nav shows search tab first
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
    case EXIT_ROOM_BEGIN:
    case ENTER_ROOM_BEGIN:
    case CREATE_ROOM_BEGIN:
    case FIND_ROOM_BEGIN:
    return {
        ...state,
        loading: true,
        error: null,
        message: action.payload.message,
    };
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case ENTER_ROOM_FAILURE:
    case EXIT_ROOM_FAILURE:
    case CREATE_ROOM_FAILURE:
    case FIND_ROOM_FAILURE:
    return {
        ...state,
        loading: false,
        error: action.payload.error,
        message: '',
    };
    case LOGIN_SUCCESS:
    return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
        message: '',
    };
    case LOGOUT_SUCCESS:
    return {
        ...state,
        loading: false,
        error: null,
        user: defaultUser,
        message: '',
        };
    case ENTER_ROOM_SUCCESS:
    return {
        ...state,
        loading: false,
        error: null,
        room: action.payload.room,
        message: '',
    };
    case EXIT_ROOM_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
            room: null,
            message: '',
        };
    case FIND_ROOM_SUCCESS:
    case CREATE_ROOM_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
            room: null,
            message: 'Entering room...'
        };
    case SWITCH_TAB:
        return {
            ...state,
            roomTab: action.payload.roomTab,
        }
    default:
    return state;
    }
}




