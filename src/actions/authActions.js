import {auth, provider, db} from "../Client.js";


export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_NOT_FOUND = 'LOGIN_NOT_FOUND';

export const LOGOUT_BEGIN = 'LOGOUT_BEGIN';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


export function logoutUser() {
    return dispatch => {
        dispatch(logoutBegin());
        auth().signOut().then(() => {
            dispatch(logoutSuccess())
        })

    }
};

export function loginUser() {
    return dispatch => {
        dispatch(loginBegin());

        auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // const token = result.credential.accessToken;
            // The signed-in user info.
            const userData = result.user;
            console.log(result);

            let user = {
                email: userData.email,
                name: userData.displayName,
                photoUrl: userData.photoURL,
                phone: userData.phoneNumber,
                isAnonymous: userData.isAnonymous,
            };
            let id = result.user.uid;
            let profileId = result.additionalUserInfo.profile.id;


            let path = '/fb'
            db.ref('/fb/' + id).set(user)
                .catch((error) => {
                    console.log(error);
                    dispatch(loginFailure(error));
                });

            //Check if user already exists
            db.ref('/users/' + id).once('value')
                .then((snapshot) => {

                    //see if it there is a new user
                    if (snapshot) {

                        //save new user in db
                        db.ref('/users/' + id).set(user)
                            .then((user) => {
                                dispatch(loginSuccess(user))
                            })
                            .catch((error) => {
                                console.log(error);
                                dispatch(loginFailure(error));
                            });
                        ;
                    }else{
                        dispatch(loginSuccess(user))
                    }
                });
            return userData;

        }).catch(function (error) {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // const credential = error.credential;
            console.log(error);
            // console.log([error, errorCode, errorMessage, email, credential]);
            dispatch(loginFailure());
        });


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
