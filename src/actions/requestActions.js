import {REQUEST_TRACK_BEGIN, REQUEST_TRACK_FAILURE, REQUEST_TRACK_SUCCESS} from "./indexActions";


import {db, auth} from "../Client";


//TrackId as key for requestTemplate,
//Submitted by is collection of uid keys as true (see number of people who requested)
//eg. 46234623 : true
// const requestTemplate = {
//     isApproved: false,
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
            isApproved: false,
            songArtist: song.artists[0].name,
            songTitle: song.name,
            submittedBy: {[auth().currentUser.uid]: true},
            timestamp: new Date().getMilliseconds(),
        };

        db.ref('/requests/' + roomCode + '/' + song.id).set(songToRequest)
            .then((result) => {
                console.log('song request success');
                console.log(result);
                dispatch(submitRequestSuccess());
            })
            .catch(() => {
                console.log('song request fail');
                dispatch(submitRequestFailure());
            });


    }
}


export const submitRequestBegin = () => ({
    type: REQUEST_TRACK_BEGIN,
    payload: {message: 'Submitting song request...'}
});

export const submitRequestSuccess = request => ({
    type: REQUEST_TRACK_SUCCESS,
    payload: {request: request}
});

export const submitRequestFailure = error => ({
    type: REQUEST_TRACK_FAILURE,
    payload: {error}
});
