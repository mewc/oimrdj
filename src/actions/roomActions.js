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

export function exitRoom() {
    return dispatch => {
        dispatch(exitRoomBegin());
        dispatch(exitRoomSuccess())
    }
};

export function findRoom(code) {
    return dispatch => {
        dispatch(findRoomBegin());
        console.log(code);
        //if room
        db.ref('/rooms/').child(code).once('value', function(snapshot) {
            console.log(snapshot.key);
            console.log(snapshot.exists());
            let room = snapshot.val();

            if(!snapshot.exists()){
                console.log("Room code not found, creating");

                //Need to get user to confirm this ----
                dispatch(createRoomBegin());
                console.log(auth());
                let newRoom = DEFAULT_ROOM;
                newRoom.code = code;
                newRoom.name = code;
                newRoom.owner[auth().currentUser.uid] = true;
                console.log(newRoom);

                db.ref('/rooms/' + code).set(newRoom)
                    .then((result) => {
                        room = newRoom;
                        dispatch(createRoomSuccess());
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch(createRoomFailure(error));
                    });
                ;


            }else {
                console.log("Room exists, joining...");
                dispatch(findRoomSuccess());

            }


            //Join Room
            dispatch(enterRoomBegin());
            console.log(room);
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
            ;

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
    payload: {roomTab: roomTab}
});







