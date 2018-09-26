import {LOAD_APP_BEGIN, LOAD_APP_SUCCESS, REQUEST_TIMEOUT_OFF, REQUEST_TIMEOUT_ON, SNACKBAR} from "./indexActions";

export function showSnackbar(message){
  return {
    type: SNACKBAR,
    payload: {message}
  };
};

export function hideSnackbar(){
  return {
    type: SNACKBAR,
    payload: {message: false}
  };
};

export function loadApp(){
  return {
    type: LOAD_APP_BEGIN,
    payload: {message: 'Loading...'}
  }
}

export function loadAppSuccess(){
    return {
        type: LOAD_APP_SUCCESS,
    }
}

export function requestTimeoutOn(){
    return {
        type: REQUEST_TIMEOUT_ON,
    }
}

export function requestTimeoutOff(){
    return {
        type: REQUEST_TIMEOUT_OFF,
    }
}


