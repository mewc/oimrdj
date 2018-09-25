import {auth, provider, db} from "../Client.js";

import {exitRoom} from "./roomActions";

import {
    LOGIN_BEGIN,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_BEGIN,
    LOGOUT_FAILURE,
    LOGIN_FAILURE,
    RECOGNISE_LOGIN_BEGIN, RECOGNISE_LOGIN_SUCCESS, RECOGNISE_LOGIN_FAILURE
} from "./indexActions";
import {showSnackbar} from "./actions";

export function logoutUser() {
    return dispatch => {
        dispatch(logoutBegin());

        dispatch(exitRoom());

        auth().signOut()
        .then(() => {
            dispatch(logoutSuccess());
        })
        .catch((error) => {
            dispatch(logoutFailure(error.message));
        });


    }
};

//if fb doesnt see the user as being logged in, we login and save to state
export function loginUser() {
    return dispatch => {
        dispatch(loginBegin());

        auth().setPersistence(auth.Auth.Persistence.LOCAL)
            .then(() => {

                auth().signInWithPopup(provider).then((result) => {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    // const token = result.credential.accessToken;
                    // The signed-in user info.
                    const userData = result.user;

                    let user = {
                        uid: userData.uid,
                        email: userData.email,
                        name: userData.displayName,
                        photoUrl: userData.photoURL,
                        phone: userData.phoneNumber,
                        isAnonymous: userData.isAnonymous,
                        token: userData.refreshToken
                    };
                    let id = result.user.uid;

                    db.ref('/users/').child(id).once('value', function (snapshot) {
                        if (snapshot.exists()) {
                            dispatch(loginSuccess(user))
                            dispatch(showSnackbar('Logged in as ' + user.name));
                        } else {
                            //CREATE new user if not in system
                            db.ref('/users/' + id).set(user)
                                .then((user) => {
                                    dispatch(loginSuccess(user));
                                    dispatch(showSnackbar('Logged in ' + user.name));
                                })
                                .catch((error) => {
                                    console.log(error);
                                    dispatch(loginFailure(error));
                                });
                            ;
                        }
                    });
                    return userData;

                }).catch(function (error) {
                    console.log(error);
                    dispatch(loginFailure(error.message));
                });


            })
    }
};


export const loginBegin = () => ({
    type: LOGIN_BEGIN,
    payload: {message: 'Logging in'}
});

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: {user},
});

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: {error}
});


export const logoutBegin = () => ({
    type: LOGOUT_BEGIN,
    payload: {message: 'Logging out'}
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const logoutFailure = error => ({
    type: LOGOUT_FAILURE,
    payload: {error}
});


//if fb knows the user is logged in, we will save it to state here
export function recogniseLogin() {
    return dispatch => {
        dispatch(recogniseLoginBegin());

        if(!auth()){
            dispatch(recogniseLoginFailure({message: 'Something weird happened and credentials were not found'}));
        }

        let userData = auth().currentUser;
        let user = {
            uid: userData.uid,
            email: userData.email,
            name: userData.displayName,
            photoUrl: userData.photoURL,
            phone: userData.phoneNumber,
            isAnonymous: userData.isAnonymous,
            token: userData.refreshToken
        };
        dispatch(showSnackbar('Logged in as ' + user.name));
        dispatch(recogniseLoginSuccess(user));
    }
};

export const recogniseLoginBegin = () => ({
    type: RECOGNISE_LOGIN_BEGIN,
    payload: {message: 'Logging in'}
});

export const recogniseLoginSuccess = user => ({
    type: RECOGNISE_LOGIN_SUCCESS,
    payload: {user},
});

export const recogniseLoginFailure = error => ({
    type: RECOGNISE_LOGIN_FAILURE,
    payload: {error},
});