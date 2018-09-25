import React from 'react';
import {connect} from 'react-redux';

import LogoutButton from "../LogoutButton";
import LeaveRoomButton from "./LeaveRoomButton";
import Typography from "@material-ui/core/Typography/Typography";
import {Avatar} from "@material-ui/core";
import PersonIcon from "@material-ui/core/SvgIcon/SvgIcon";


class Profile extends React.Component {


    render() {
        let avatar = this.props.user.photoUrl
            ?<Avatar  src={this.props.user.photoUrl} alt={this.props.user.name}><PersonIcon/></Avatar>
            :<Avatar><PersonIcon/></Avatar>;


        return <React.Fragment>
            <h3>Profile</h3>
            <Typography variant={"display2"} gutterBottom>
                Hello,  {this.props.user.name}
            </Typography>
            {avatar}
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