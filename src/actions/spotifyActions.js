import {
    SEARCH_TRACK_BEGIN,
    SEARCH_TRACK_FAILURE,
    SEARCH_TRACK_SUCCESS
} from "./indexActions";

import axios from 'axios';

export function searchTrack(input){
    return dispatch => {
        dispatch(searchTrackBegin());
            const BASE_URL = "https://api.spotify.com/v1/";
            axios.get(BASE_URL, {
                params: {
                    search: input,
                }
            })
            .then((response) => {
                console.log(response);
                dispatch(searchTrackSuccess(response));
            })
            .catch((err) => {
                console.log(err);
                dispatch(searchTrackFailure(err.message));
            })

    }
};


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


