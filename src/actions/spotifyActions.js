import {GET_TRACK_FAILURE, GET_TRACK_START, GET_TRACK_SUCCESS} from "./indexActions";

export function showSnackbar(message){
    return {
        type: SNACKBAR,
        payload: {message}
    };
};

export function hideSnackbar(){
    let message = false;
    return {
        type: SNACKBAR,
        payload: {message}
    };
};


