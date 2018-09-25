import * as strings from '../static/Strings.js';
import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_BEGIN,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_BEGIN,
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
    CREATE_ROOM_SUCCESS,
    SWITCH_TAB,
    CHANGE_ROOM_NAME_SUCCESS,
    CHANGE_ROOM_NAME_BEGIN,
    CHANGE_ROOM_NAME_FAILURE,
    GET_TRACK_SUCCESS,
    GET_TRACK_BEGIN,
    GET_TRACK_FAILURE,
    SNACKBAR,
    CHANGE_TIMEOUT_BEGIN,
    CHANGE_TIMEOUT_FAILURE,
    CHANGE_TIMEOUT_SUCCESS,
    SEARCH_TRACK_BEGIN,
    SEARCH_TRACK_FAILURE,
    SEARCH_TRACK_SUCCESS,
    REQUEST_TRACK_SUCCESS,
    REQUEST_TRACK_FAILURE,
    REQUEST_TRACK_BEGIN,
    FETCH_ROOMREQ_BEGIN,
    FETCH_ROOMREQ_FAILURE,
    FETCH_ROOMREQ_SUCCESS,
    REMOVE_REQUEST_BEGIN,
    REMOVE_REQUEST_FAILURE, REMOVE_REQUEST_SUCCESS, LOAD_APP_SUCCESS, LOAD_APP_BEGIN
} from "../actions/indexActions";
import {LABEL_LOBBY} from "../static/Strings";

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
    requests: [],
    message: '', //this shows in title or state updates
    roomTab: 'search', //defaults so bottom nav shows search tab first
    spotify: null,
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
        case SEARCH_TRACK_BEGIN:
        case REQUEST_TRACK_BEGIN:
        case FETCH_ROOMREQ_BEGIN:
        case REMOVE_REQUEST_BEGIN:
        case LOAD_APP_BEGIN:
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
        case SEARCH_TRACK_FAILURE:
        case REQUEST_TRACK_FAILURE:
        case FETCH_ROOMREQ_FAILURE:
        case REMOVE_REQUEST_FAILURE:
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
                message: LABEL_LOBBY,
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
                message: action.payload.room.name,
            };
        case EXIT_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                room: null,
                message: LABEL_LOBBY,
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
                loading: false,
                roomTab: action.payload.roomTab,
                message: action.payload.message,
            };
        case CHANGE_ROOM_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                room: {
                    ...state.room,
                    name: action.payload.newName
                },
                message: '',
            };
        case CHANGE_TIMEOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                room: {
                    ...state.room,
                    timeout: action.payload.newTimeout,
                    message: '',
                }
            };
        case SEARCH_TRACK_SUCCESS:
            return {
                ...state,
                loading: false,
                spotify: action.payload.items,
                message: '',
            };
        case FETCH_ROOMREQ_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: action.payload.requests,
                message: '',
            };
        case REQUEST_TRACK_SUCCESS:
        case REMOVE_REQUEST_SUCCESS:
        case GET_TRACK_SUCCESS:
        case LOAD_APP_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
            };
        default:
            return state;
    }
}




