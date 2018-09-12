import React from 'react';
import {connect} from 'react-redux';

import Button from "@material-ui/core/Button/Button";
import LogoutIcon from "@material-ui/icons/HighlightOff";
import LeaveRoomIcon from "@material-ui/icons/RemoveCircleOutline";

import {exitRoom} from "../../actions/roomActions";
import {logoutUser} from "../../actions/authActions";


class Profile extends React.Component {

    handleLogoutClick(){
        this.props.dispatch(logoutUser());
    }

    handleLeaveRoomClick(){
        this.props.dispatch(exitRoom())
    }


    render() {

        return <React.Fragment>
            <p>Profile</p>
            <Button variant={'extendedFab'} aria-label={'Leave Room'}>
                Leave Room
                <LeaveRoomIcon onClick={this.handleLeaveRoomClick.bind(this)}/>
            </Button>
            <Button variant={'extendedFab'} aria-label={'Logout'}>
                Logout
                <LogoutIcon onClick={this.handleLogoutClick.bind(this)}/>
            </Button>
        </React.Fragment>
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.user,
        room: state.room,
        message:state.message,
        loading: state.loading,
    }
}



export default connect(mapStateToProps)(Profile);