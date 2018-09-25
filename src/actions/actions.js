import {LOAD_APP_BEGIN, LOAD_APP_SUCCESS, SNACKBAR} from "./indexActions";

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


