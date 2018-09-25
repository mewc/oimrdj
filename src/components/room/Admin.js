import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";
import * as str from "../../static/Strings";
import TextField from "@material-ui/core/TextField/TextField";
import {changeRoomName, changeTimoutValue} from "../../actions/roomActions";
import RequestResponseList from "./RequestResponseList";
import {refreshRequestList} from "../../actions/requestActions";
import ApprovedSongWidget from './SongRequestsWidget'

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            nameChange: {
                value: '',
                submitDisabled: true,
            },
            timeoutChange: {
                value: '',
                submitDisabled: true,
            },
            isAdmin: true,
        };

    }


    onNameInputChange(event) {
        if (event.target.value.length > 0) {
            this.setState({
                ...this.state,
                errorText: '',
                nameChange: {
                    value: event.target.value,
                    submitDisabled: false,
                },
            });
        } else {
            this.setState({
                ...this.state,
                errorText: 'Name cannot be empty',
                nameChange: {
                    value: event.target.value,
                    submitDisabled: true,
                },
            });
        }
    }

    onTimeoutInputChange(event) {
        let inMs = event.target.value * 1000;
        if (event.target.value >= 0) {
            //set timeout to ms

            this.setState({
                ...this.state,
                errorText: '',
                timeoutChange: {
                    value: inMs,
                    submitDisabled: false,
                },
            });
        } else {
            this.setState({
                ...this.state,
                errorText: 'Timeout value invalid',
                timeoutChange: {
                    submitDisabled: true,
                },
            });
        }
    }

    handleNameChangeEvent = () => {
        this.props.dispatch(changeRoomName(this.state.nameChange.value, this.props.room.code));
    }


    handleTimeoutChangeEvent = () => {
        this.props.dispatch(changeTimoutValue(this.state.timeoutChange.value, this.props.room.code));
    }


    //admin has admin controls + all profile stuff too
    render() {
        return <React.Fragment>
            <Profile/>
            <h3>Admin</h3>
            <p>{this.props.room.timeout}</p>
            <ul>
                <li>
                    <TextField
                        label={str.LABEL_ROOM_NAME + ':'}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder={this.props.room.name}
                        helperText={this.state.errorText}
                        // fullWidth
                        margin="normal"
                        onChange={this.onNameInputChange.bind(this)}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter' && !this.state.nameChange.submitDisabled) {
                                this.handleNameChangeEvent();
                            }
                        }}
                    />
                </li>
                <li>
                    <TextField
                        label={str.LABEL_ROOM_TIMEOUT + ':'}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder={this.props.room.timeout / 1000 + ' seconds'}
                        helperText={this.state.errorText}
                        // fullWidth
                        margin="normal"
                        onChange={this.onTimeoutInputChange.bind(this)}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter' && !this.state.timeoutChange.submitDisabled) {
                                this.handleTimeoutChangeEvent();
                            }
                        }}
                    />
                </li>
                {(this.props.hasRequests)?
                <React.Fragment>
                    <li>
                        <RequestResponseList />
                    </li>
                    <li>
                        <ApprovedSongWidget />
                    </li>
                </React.Fragment>
                :''}
            </ul>

        </React.Fragment>;
    }
}


const mapStateToProps = (state) => {
    let hasRequests = !!(state.requests.length === undefined);
    return {
        message: state.message,
        loading: state.loading,
        room: state.room,
        hasRequests: hasRequests,
    }
}


export default connect(mapStateToProps)(Admin);