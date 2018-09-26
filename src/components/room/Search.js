import React from 'react';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField/TextField";
import * as str from "../../static/Strings";
import {searchTrack} from "../../actions/spotifyActions";
import SearchResultsGrid from "./SearchResultsGrid";
import {LinearProgress} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import theme from "../../oimrdjMuiTheme";




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
        //bc lazy
        let classes = {searchIcon: { width: theme.spacing.unit * 9, height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', },
            inputInput: {
                paddingTop: theme.spacing.unit,
                paddingRight: theme.spacing.unit,
                paddingBottom: theme.spacing.unit,
                paddingLeft: theme.spacing.unit * 10,
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    width: 120,
                    '&:focus': {
                        width: 200,
                    },
                },
            },
        };

        return <React.Fragment>
            <AppBar position={'static'}>
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
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
                            classes={{
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                </Toolbar>
            </AppBar>

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