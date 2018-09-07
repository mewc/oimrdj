import {auth, provider, db} from "../Client.js";

export const FETCH_AUTH_BEGIN = 'FETCH_AUTH_BEGIN';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';
export const FETCH_AUTH_NOT_FOUND = 'FETCH_AUTH_NOT_FOUND';

export const SET_AUTH_BEGIN = 'SET_AUTH_BEGIN';
export const SET_AUTH_SUCCESS = 'SET_AUTH_SUCCESS';
export const SET_AUTH_FAILURE = 'SET_AUTH_FAILURE';


export function fetchUser(userQuery){

  return dispatch => {
    dispatch(fetchAuthBegin());
    db.ref('/users/').once('value').then(function(snapshot) {
        console.log(snapshot);
    });

  }
};

export function setUser(user){

  return dispatch => {
    dispatch(setAuthBegin());
    db.ref('/test/2' ).set({  //2 is set to test
        test: 'test',
        name: 1,
        hello: 'hi'
    });

  }
};

function handleErrors(response){
  if(!response.ok){
    throw Error(response.statusText);
  }
  return response;
}

export const fetchAuthBegin = () => ({
  type: FETCH_AUTH_BEGIN
});

export const fetchAuthSuccess = user => ({
  type: FETCH_AUTH_SUCCESS,
  payload: {user}
});

export const fetchAuthFailure = error => ({
  type: FETCH_AUTH_FAILURE,
  payload: {error}
});

export const fetchAuthNotFound = error => ({
  type: FETCH_AUTH_NOT_FOUND,
  payload: {error}
});


export const setAuthBegin = () => ({
  type: SET_AUTH_BEGIN
});

export const setAuthSuccess = user => ({
  type: SET_AUTH_SUCCESS,
  payload: {user}
});

export const setAuthFailure = error => ({
  type: SET_AUTH_FAILURE,
  payload: {error}
});
