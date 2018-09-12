import {auth, db} from "../Client.js";

export const FIND_ROOM_BEGIN = 'FIND_ROOM_BEGIN';
export const FIND_ROOM_SUCCESS = 'FIND_ROOM_SUCCESS';
export const FIND_ROOM_FAILURE = 'FIND_ROOM_FAILURE';

export const ENTER_ROOM_BEGIN = 'ENTER_ROOM_BEGIN';
export const ENTER_ROOM_SUCCESS = 'ENTER_ROOM_SUCCESS';
export const ENTER_ROOM_FAILURE = 'ENTER_ROOM_FAILURE';

export const EXIT_ROOM_BEGIN = 'EXIT_ROOM_BEGIN';
export const EXIT_ROOM_SUCCESS = 'EXIT_ROOM_SUCCESS';
export const EXIT_ROOM_FAILURE = 'EXIT_ROOM_FAILURE';

export const CREATE_ROOM_BEGIN = 'CREATE_ROOM_BEGIN';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';

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

        dispatch(exitRoomSuccess());
    }
};

export function findRoom(code) {
    return dispatch => {
        dispatch(findRoomBegin());
        //if room
        db.ref('/rooms/').child(code).once('value', function (snapshot) {
            let room = snapshot.val();

            if (!snapshot.exists()) {
                //Room not found, crfeating room.

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

export const exitRoomSuccess = room => ({
    type: EXIT_ROOM_SUCCESS,
    payload: {room}
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


export const SWITCH_TAB = 'SWITCH_TAB';


export function switchTab(roomTab) {
    return dispatch => {
        dispatch(switchTabSuccess(roomTab));
    }
};

export const switchTabSuccess = roomTab => ({
    type: SWITCH_TAB,
    payload: {roomTab: roomTab, message: roomTab}
});



export const CHANGE_ROOM_NAME_SUCCESS = 'CHANGE_ROOM_NAME_SUCCESS';
export const CHANGE_ROOM_NAME_BEGIN = 'CHANGE_ROOM_NAME_BEGIN';
export const CHANGE_ROOM_NAME_FAILURE = 'CHANGE_ROOM_NAME_FAILURE';


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







