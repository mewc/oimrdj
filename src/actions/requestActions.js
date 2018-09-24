import {
    REQUEST_TRACK_BEGIN,
    REQUEST_TRACK_FAILURE,
    REQUEST_TRACK_SUCCESS, RESPOND_REQUEST_BEGIN, RESPOND_REQUEST_FAILURE,
    RESPOND_REQUEST_SUCCESS
} from "./indexActions";


import {db, auth} from "../Client";
import {showSnackbar} from "./actions";
import {
    fetchRoomRequestsBegin,
    fetchRoomRequestsFailure,
    fetchRoomRequestsSuccess
} from "./roomActions";


//TrackId as key for requestTemplate,
//Submitted by is collection of uid keys as true (see number of people who requested)
//eg. 46234623 : true
// const requestTemplate = {
//     isApproved: null,  ////presence of this attr. will mean its approved or ignored
//     songArtist: null,
//     songTitle: null,
//     submittedBy: null,
//     timestamp: null,
// }

export function submitRequest(song, roomCode) {
    return dispatch => {
        dispatch(submitRequestBegin());

        console.log(song);
        console.log(roomCode);

        let songToRequest = {
            // isApproved: null,  //presence of this attr. will mean its approved or ignored
            songArtist: song.artists[0].name,
            songTitle: song.name,
            submittedBy: {[auth().currentUser.uid]: true},
            timestamp: new Date().getMilliseconds(),
            spotifyId: song.id
        };

        db.ref('/requests/' + roomCode + '/' + song.id).set(songToRequest)
            .then((result) => {
                console.log('song request success');
                console.log(result);
                dispatch(submitRequestSuccess(songToRequest));
                dispatch(showSnackbar(  songToRequest.songTitle + ' by ' + songToRequest.songArtist + ' requested'));

            })
            .catch((err) => {
                console.log('song request fail');
                dispatch(submitRequestFailure(err));
            });


    }
}


export const submitRequestBegin = () => ({
    type: REQUEST_TRACK_BEGIN,
    payload: {message: 'Sending Song request...'}
});

export const submitRequestSuccess = request => ({
    type: REQUEST_TRACK_SUCCESS,
    payload: {request: request}
});

export const submitRequestFailure = error => ({
    type: REQUEST_TRACK_FAILURE,
    payload: {error}
});





export function respondToRequest(song, roomCode, response) {
    return dispatch => {
        dispatch(respondtoRequestBegin());

        console.log(song);
        console.log(roomCode);

        let songToApprove = {
            ...song,
            isApproved: response, //boolean
            approvedTimestamp: new Date().getTime(),
        };

        db.ref('/requests/' + roomCode + '/' + song.spotifyId).set(songToApprove)
            .then(() => {
                console.log('song request response success');
                dispatch(respondToRequestSuccess(songToApprove));
                dispatch(showSnackbar( songToApprove.songTitle + ' by ' + songToApprove.songArtist + (response)?' accepted':' ignored'));

                dispatch(refreshRequestList(roomCode));
            })
            .catch((err) => {
                console.log('song request response failure');
                dispatch(respondToRequestFailure(err));
            });

    }
}


export const respondtoRequestBegin = () => ({
    type: RESPOND_REQUEST_BEGIN,
    payload: {message: ''}
});

export const respondToRequestSuccess = requests => ({
    type: RESPOND_REQUEST_SUCCESS,
    payload: {requests: requests}
});

export const respondToRequestFailure = error => ({
    type: RESPOND_REQUEST_FAILURE,
    payload: {error}
});


export function refreshRequestList(code) {
    return dispatch => {
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
    }
}


export const refreshRequestListBegin = () => ({
    type: REQUEST_TRACK_BEGIN,
    payload: {message: ''}
});

export const refreshRequestListSuccess = requests => ({
    type: REQUEST_TRACK_SUCCESS,
    payload: {requests: requests}
});

export const refreshRequestListFailure = error => ({
    type: REQUEST_TRACK_FAILURE,
    payload: {error}
});
