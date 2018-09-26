import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as str from "../static/Strings";

import {findRoom} from "../actions/roomActions";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import LogoutButton from "./LogoutButton";
import Grid from "@material-ui/core/Grid/Grid";


const roomCodeLength = 6; //7 characters

class JoinRoom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            searchValue: '',
            submitDisabled: true,
            isAdmin: true,
        };
    }

    onInputChange(event) {
        if (event.target.value.length >= roomCodeLength) {
            this.setState({errorText: '', submitDisabled: false, searchValue: event.target.value});
        } else {
            this.setState({
                errorText: 'Search must be ' + roomCodeLength + ' or more characters',
                submitDisabled: true,
                searchValue: event.target.value
            });
        }
    }

    handleSearchClick = () => {
        this.props.dispatch(findRoom(this.state.searchValue));
    }

    render() {

        let loadingSearchButton = <Button variant="fab" disabled={this.state.submitDisabled}>
            <SendIcon onClick={this.handleSearchClick}/>
        </Button>

        if (this.props.loading) {
            loadingSearchButton = <CircularProgress thickness={3}/>
        }

        return (
            <React.Fragment>
                <Grid container spacing={48} direction={'column'} justify={'space-between'} alignItems={'center'}>
                    <Grid item><TextField
                        label={str.LABEL_ROOM_CODE_INPUT}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder=""
                        helperText={this.state.errorText}
                        // fullWidth
                        margin="normal"
                        onChange={this.onInputChange.bind(this)}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.handleSearchClick()
                            }
                        }}
                    />
                        {loadingSearchButton}
                    </Grid>
                    <Grid>
                        <LogoutButton/>
                    </Grid>
                </Grid>
            </React.Fragment>
        );

    }


}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        room: state.room,
        requests: state.requests,
        loading: state.loading,
    }
}


export default connect(mapStateToProps)(JoinRoom);

