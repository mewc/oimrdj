import {auth, db} from "../Client.js";

import {
    SWITCH_TAB,
    CHANGE_TIMEOUT_FAILURE,
    CHANGE_TIMEOUT_BEGIN,
    CHANGE_TIMEOUT_SUCCESS,
    CHANGE_ROOM_NAME_FAILURE,
    CHANGE_ROOM_NAME_BEGIN,
    CHANGE_ROOM_NAME_SUCCESS,
    FIND_ROOM_SUCCESS,
    CREATE_ROOM_SUCCESS,
    EXIT_ROOM_SUCCESS,
    ENTER_ROOM_SUCCESS,
    FIND_ROOM_BEGIN,
    CREATE_ROOM_BEGIN,
    ENTER_ROOM_BEGIN,
    EXIT_ROOM_BEGIN,
    FIND_ROOM_FAILURE,
    CREATE_ROOM_FAILURE,
    EXIT_ROOM_FAILURE,
    ENTER_ROOM_FAILURE, FETCH_ROOMREQ_BEGIN, FETCH_ROOMREQ_SUCCESS, FETCH_ROOMREQ_FAILURE
} from "./indexActions";
import {hideSnackbar, showSnackbar} from "./actions";

const DEFAULT_ROOM = {
    code: null,
    isProtected: false,
    name: 'default',
    timeout: 2000,
    owner: {},
}

export function exitRoom(code) {
    return dispatch => {
        dispatch(exitRoomBegin());

        let uid = auth().currentUser.uid;
        db.ref('rooms/' + code + '/participants/').update({[uid]: false});

        dispatch(exitRoomSuccess(code));
        dispatch(showSnackbar( 'You just left - ' + code));
        setTimeout(() => {
            dispatch(hideSnackbar());
        },4000);

    }
};

export function findRoom(code) {
    return dispatch => {
        dispatch(findRoomBegin());
        //if room
        db.ref('/rooms/').child(code).once('value', function (snapshot) {
            let room = snapshot.val();

            if (!snapshot.exists()) {
                //Room not found, creating room.

                //Need to get user to confirm this ----
                dispatch(createRoomBegin());
                let newRoom = DEFAULT_ROOM;
                newRoom.code = code;
                newRoom.name = code;
                newRoom.owner[auth().currentUser.uid] = true;
                db.ref('/rooms/' + code).set(newRoom)
                    .then((result) => {
                        dispatch(createRoomSuccess());


                        //Join Room
                        dispatch(enterRoomBegin());
                        //add userId to participant list (doesnt matter if they already exist)
                        db.ref('/rooms/' + newRoom.code + /participants/ + auth().currentUser.uid)
                            .set(true)
                            .then(() => {
                                dispatch(enterRoomSuccess(newRoom));
                            })
                            .catch((error) => {
                                dispatch(enterRoomFailure(error));
                            });

                    })
                    .catch((error) => {
                        dispatch(createRoomFailure(error));
                    });
                ;
            } else {
                //Room exists, joining
                dispatch(findRoomSuccess());

                dispatch(fetchRoomRequestsBegin());
                db.ref('/requests/' + code).once('value', function (snapshot) {
                    let roomRequests = snapshot.val();
                    if(!snapshot.exists()){
                        console.log('no requests for room');
                        dispatch(fetchRoomRequestsFailure(''));
                    }else{
                        dispatch(fetchRoomRequestsSuccess(roomRequests))
                    }
                });

                //Join Room (same as code about - how to extract?!
                dispatch(enterRoomBegin());
                //add userId to participant list (doesnt matter if they already exist)
                db.ref('/rooms/' + room.code + /participants/ + auth().currentUser.uid)
                    .set(true)
                    .then(() => {
                        dispatch(enterRoomSuccess(room));
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch(enterRoomFailure(error));
                    });

            }

        });
    }
}


export const findRoomBegin = () => ({
    type: FIND_ROOM_BEGIN,
    payload: {message: 'Finding Room'}
});

export const findRoomSuccess = () => ({
    type: FIND_ROOM_SUCCESS,
});

export const findRoomFailure = error => ({
    type: FIND_ROOM_FAILURE,
    payload: {error}
});


export const enterRoomBegin = () => ({
    type: ENTER_ROOM_BEGIN,
    payload: {message: 'Entering Room'}
});

export const enterRoomSuccess = room => ({
    type: ENTER_ROOM_SUCCESS,
    payload: {room}
});

export const enterRoomFailure = error => ({
    type: ENTER_ROOM_FAILURE,
    payload: {error}
});


export const exitRoomBegin = () => ({
    type: EXIT_ROOM_BEGIN,
    payload: {message: 'Exiting Room'}
});

export const exitRoomSuccess = code => ({
    type: EXIT_ROOM_SUCCESS,
    payload: {code: code}
});

export const exitRoomFailure = error => ({
    type: EXIT_ROOM_FAILURE,
    payload: {error}
});

export const createRoomBegin = () => ({
    type: CREATE_ROOM_BEGIN,
    payload: {message: 'Creating your Room'}
});

export const createRoomSuccess = () => ({
    type: CREATE_ROOM_SUCCESS,
});

export const createRoomFailure = error => ({
    type: CREATE_ROOM_FAILURE,
    payload: {error}
});

export function switchTab(roomTab) {
    return dispatch => {
        dispatch(switchTabSuccess(roomTab));
    }
};

export const switchTabSuccess = roomTab => ({
    type: SWITCH_TAB,
    payload: {roomTab: roomTab, message: roomTab}
});

export function changeRoomName(name, code) {
    return dispatch => {
        dispatch(changeRoomNameBegin());
        db.ref('/rooms/' + code + /name/)
            .set(name)
            .then(() => {
                dispatch(changeRoomNameSuccess(name));
            })
            .catch((error) => {
                dispatch(changeRoomNameFailure(error));
            });
    }
};

export const changeRoomNameBegin = () => ({
    type: CHANGE_ROOM_NAME_BEGIN,
    payload: {message: 'Changing room name'}
});

export const changeRoomNameSuccess = name => ({
    type: CHANGE_ROOM_NAME_SUCCESS,
    payload: {newName: name}
});

export const changeRoomNameFailure = error => ({
    type: CHANGE_ROOM_NAME_FAILURE,
    payload: {error},
});


export function changeTimoutValue(timeout, code) {
    return dispatch => {
        dispatch(changeTimeoutBegin());
        db.ref('/rooms/' + code + /timeout/)
            .set(timeout)
            .then(() => {
                dispatch(changeTimeoutSuccess(timeout));
            })
            .catch((error) => {
                dispatch(changeTimeoutFailure(error));
            });
    }
};

export const changeTimeoutBegin = () => ({
    type: CHANGE_TIMEOUT_BEGIN,
    payload: {message: 'Changing timeout value'}
});

export const changeTimeoutSuccess = timeout => ({
    type: CHANGE_TIMEOUT_SUCCESS,
    payload: {newTimeout: timeout}
});

export const changeTimeoutFailure = error => ({
    type: CHANGE_TIMEOUT_FAILURE,
    payload: {error},
});


export const fetchRoomRequestsBegin = () => ({
    type: FETCH_ROOMREQ_BEGIN,
    payload: {message: 'Finding song requests'}
});

export const fetchRoomRequestsSuccess = requests => ({
    type: FETCH_ROOMREQ_SUCCESS,
    payload: {requests: requests}
});

export const fetchRoomRequestsFailure = error => ({
    type: FETCH_ROOMREQ_FAILURE,
    payload: {error},
});








