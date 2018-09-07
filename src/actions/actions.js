export const SNACKBAR = 'SNACKBAR';

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
