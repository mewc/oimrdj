import React from 'react';
import {connect} from 'react-redux';

import {exitRoom} from "../../actions/roomActions";
import {logoutUser} from "../../actions/authActions";
import LogoutButton from "../LogoutButton";
import LeaveRoomButton from "./LeaveRoomButton";


class Profile extends React.Component {


    render() {

        return <React.Fragment>
            <h3>Profile</h3>
            <LeaveRoomButton/>
            <LogoutButton/>
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