import {SNACKBAR} from "./indexActions";

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


