import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";
import * as str from "../../static/Strings";
import TextField from "@material-ui/core/TextField/TextField";
import {changeRoomName} from "../../actions/roomActions";




class Admin extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            errorText: '',
            nameChange: {
                value: '',
                submitDisabled: true,
            },
            isAdmin: true,
        };
    }


    onInputChange(event) {
        if (event.target.value.length > 0) {
            this.setState({
                errorText: '',
                nameChange: {
                    value: event.target.value,
                    submitDisabled: false,
                },
            });
        } else {
            this.setState({
                errorText: 'Name cannot be empty',
                nameChange: {
                    value: event.target.value,
                    submitDisabled: true,
                },
            });
        }
    }

    handleNameChangeEvent = () => {
        this.props.dispatch(changeRoomName(this.state.nameChange.value, this.props.room.code));
    }

    //admin has admin controls + all profile stuff too
    render() {
        return <React.Fragment>
            <h2>Admin</h2>

            <TextField
                label={str.LABEL_CHANGEROOMNAME + ':'}
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder={this.props.room.name}
                helperText={this.state.errorText}
                // fullWidth
                margin="normal"
                onChange={this.onInputChange.bind(this)}
                onKeyPress={(event) => {
                    if(event.key === 'Enter' && !this.state.nameChange.submitDisabled){
                        this.handleNameChangeEvent();
                    }
                }}
            />

            <Profile/>
        </React.Fragment>;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
        room: state.room,
    }
}



export default connect(mapStateToProps)(Admin);