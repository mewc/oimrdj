import * as strings from '../static/Strings.js';
import {
    LOGIN_FAILURE,    LOGIN_SUCCESS,    LOGIN_BEGIN,    LOGOUT_SUCCESS,    LOGOUT_FAILURE,    LOGOUT_BEGIN,
    FIND_ROOM_BEGIN,    FIND_ROOM_FAILURE,    CREATE_ROOM_FAILURE,    CREATE_ROOM_BEGIN,    EXIT_ROOM_FAILURE,    EXIT_ROOM_SUCCESS,    ENTER_ROOM_FAILURE,    ENTER_ROOM_SUCCESS,    ENTER_ROOM_BEGIN,    EXIT_ROOM_BEGIN,    FIND_ROOM_SUCCESS,    CREATE_ROOM_SUCCESS, SWITCH_TAB, CHANGE_ROOM_NAME_SUCCESS, CHANGE_ROOM_NAME_BEGIN, CHANGE_ROOM_NAME_FAILURE,
    GET_TRACK_SUCCESS,GET_TRACK_BEGIN,GET_TRACK_FAILURE,
    SNACKBAR, CHANGE_TIMEOUT_BEGIN, CHANGE_TIMEOUT_FAILURE, CHANGE_TIMEOUT_SUCCESS
} from "../actions/indexActions";

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


export default function reducer(state = defaultState, action) {
    switch (action.type) {
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
        case CHANGE_ROOM_NAME_BEGIN:
        case CHANGE_TIMEOUT_BEGIN:
        case GET_TRACK_BEGIN:
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
        case CHANGE_ROOM_NAME_FAILURE:
        case CHANGE_TIMEOUT_FAILURE:
        case GET_TRACK_FAILURE:
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
                message: action.payload.message,
            };
        case CHANGE_ROOM_NAME_SUCCESS:
            return {
                ...state,
                room: {
                    ...state.room,
                    name: action.payload.newName
                }
            };
        case CHANGE_TIMEOUT_SUCCESS:
            return {
                ...state,
                room: {
                    ...state.room,
                    timeout: action.payload.newTimeout
                }
            };
        case GET_TRACK_SUCCESS:
            return {
                ...state,
            }
        default:
            return state;
    }
}




