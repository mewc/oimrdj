import {auth, provider, db} from "../Client.js";


export const FIND_ROOM_BEGIN = 'FIND_ROOM_BEGIN';
export const FIND_ROOM_SUCCESS = 'FIND_ROOM_SUCCESS';
export const FIND_ROOM_FAILURE = 'FIND_ROOM_FAILURE';

export const ENTER_ROOM_BEGIN = 'ENTER_ROOM_BEGIN';
export const ENTER_ROOM_SUCCESS = 'ENTER_ROOM_SUCCESS';
export const ENTER_ROOM_FAILURE = 'ENTER_ROOM_FAILURE';

export const EXIT_ROOM_BEGIN = 'EXIT_ROOM_BEGIN';
export const EXIT_ROOM_SUCCESS = 'EXIT_ROOM_SUCCESS';
export const EXIT_ROOM_FAILURE = 'EXIT_ROOM_FAILURE';


export function exitRoom() {
    return dispatch => {
        dispatch(exitRoomBegin());
        dispatch(exitRoomSuccess())
    }
};

export function findRoom() {
    return dispatch => {
        dispatch(findRoomBegin());
        //if room found

        dispatch(findRoomSuccess());
        //if room doesnt exist, ask to create new one


        //if room failed
    }
}

export function enterRoom() {
    return dispatch => {
        dispatch(enterRoomBegin());
        dispatch(enterRoomSuccess());




    }
};



export const findRoomBegin = () => ({
    type: FIND_ROOM_BEGIN
});

export const findRoomSuccess = room => ({
    type: FIND_ROOM_SUCCESS,
    payload: {room}
});

export const findRoomFailure = error => ({
    type: FIND_ROOM_FAILURE,
    payload: {error}
});




export const enterRoomBegin = () => ({
    type: ENTER_ROOM_BEGIN
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
    type: EXIT_ROOM_BEGIN
});

export const exitRoomSuccess = room => ({
    type: EXIT_ROOM_SUCCESS,
    payload: {room}
});

export const exitRoomFailure = error => ({
    type: EXIT_ROOM_FAILURE,
    payload: {error}
});



