import {auth, provider, db} from "../Client.js";


export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_BEGIN = 'LOGOUT_BEGIN';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


export function logoutUser() {
    return dispatch => {
        dispatch(logoutBegin());

        auth().signOut().then(() => {
            dispatch(logoutSuccess())
        });

    }
};

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
                        email: userData.email,
                        name: userData.displayName,
                        photoUrl: userData.photoURL,
                        phone: userData.phoneNumber,
                        isAnonymous: userData.isAnonymous,
                        token: userData.refreshToken
                    };
                    let id = result.user.uid;

                    db.ref('/users/').child(id).once('value', function(snapshot) {
                        if(snapshot.exists()){
                            dispatch(loginSuccess(user))
                        }else {
                            db.ref('/users/' + id).set(user)
                                .then((user) => {
                                    dispatch(loginSuccess(user));
                                })
                                .catch((error) => {
                                    console.log(error);
                                    dispatch(loginFailure(error));
                                });
                            ;                }
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
    type: LOGIN_BEGIN
});

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: {user}
});

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: {error}
});


export const logoutBegin = () => ({
    type: LOGOUT_BEGIN
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const logoutFailure = error => ({
    type: LOGOUT_FAILURE,
    payload: {error}
});
