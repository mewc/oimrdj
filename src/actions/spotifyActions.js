import {
    SEARCH_TRACK_BEGIN,
    SEARCH_TRACK_FAILURE,
    SEARCH_TRACK_SUCCESS
} from "./indexActions";

import axios from "axios";
import {db, auth} from "../Client";

export function searchTrack(input) {
    return dispatch => {
        dispatch(searchTrackBegin());

        console.log(input);

        axios.get("https://oimrdj-backend.herokuapp.com/search", {
            params: {
                query: input
            }
        })
            .then((response) => {
                console.log(response.data.body.tracks);
                dispatch(searchTrackSuccess(response.data.body.tracks));


                let searchLog = {
                    [auth().currentUser.uid]: new Date().getMilliseconds(),
                }
                db.ref('/searches/' + input).set(searchLog)
                    .then(() => {
                        console.log('search log success');

                    })
                    .catch(() => {
                        console.log('search log fail');

                    });

            })
            .catch((err) => {
                console.log(err);
                dispatch(searchTrackFailure(err.message));
            });


    }
}


export const searchTrackBegin = () => ({
    type: SEARCH_TRACK_BEGIN,
    payload: {message: 'Finding tracks'}
});

export const searchTrackSuccess = searchResult => ({
    type: SEARCH_TRACK_SUCCESS,
    payload: searchResult
});

export const searchTrackFailure = error => ({
    type: SEARCH_TRACK_FAILURE,
    payload: {error}
});


