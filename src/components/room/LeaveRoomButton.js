import React from 'react';
import {connect} from 'react-redux';

import Button from "@material-ui/core/Button/Button";
import LeaveRoomIcon from "@material-ui/icons/RemoveCircleOutline";

import {exitRoom} from "../../actions/roomActions";


class LeaveRoomButton extends React.Component {


    handleLeaveRoomClick(){
        this.props.dispatch(exitRoom(this.props.room.code))
    }


    render() {

        return <React.Fragment>
            <Button variant={'extendedFab'} aria-label={'Leave Room'} onClick={this.handleLeaveRoomClick.bind(this)}>
                Leave Room
                <LeaveRoomIcon />
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



export default connect(mapStateToProps)(LeaveRoomButton);