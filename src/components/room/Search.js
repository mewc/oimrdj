import React from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField/TextField";
import * as str from "../../static/Strings";
import {searchTrack} from "../../actions/spotifyActions";
import SearchResultsGrid from "./SearchResultsGrid";
import {LinearProgress} from '@material-ui/core';




class Search extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            searchQuery: {
                value: '',
                submitDisabled: true,
            },
        }
    }

    handleSearchQueryChangeEvent = () => {
        this.props.dispatch(searchTrack(this.state.searchQuery.value));

    }

    onSearchQueryChange(event) {
        if (event.target.value.length > 1) {
            this.setState({
                ...this.state,
                errorText: '',
                searchQuery: {
                    value: event.target.value,
                    submitDisabled: false,
                },
            });
        } else {
            this.setState({
                ...this.state,
                errorText: 'Search query needs to be longer',
                searchQuery: {
                    value: event.target.value,
                    submitDisabled: true,
                },
            });
        }
    }

    render() {

        return <React.Fragment>
            <p>search</p>
            <TextField
                label={str.LABEL_SPOTIFY_SEARCH + ':'}
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder={str.PLACEHOLDER_SPOTIFY_SEARCH}
                helperText={this.state.errorText}
                fullWidth
                margin="normal"
                onChange={this.onSearchQueryChange.bind(this)}
                onKeyPress={(event) => {
                    if (event.key === 'Enter' && !this.state.searchQuery.submitDisabled) {
                        this.handleSearchQueryChangeEvent();
                    }
                }}
            />
            {(this.props.loading)?<LinearProgress variant={'query'} />:''}
            {(this.props.spotify)?this.props.spotify.length + ' results':''}
            {(this.props.spotify)?<SearchResultsGrid />:''}

        </React.Fragment>
    }
}



const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        spotify: state.spotify,
    }
}



export default connect(mapStateToProps)(Search);