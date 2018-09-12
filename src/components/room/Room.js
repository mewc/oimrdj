import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "../../Client.js";

// import * as str from "../../static/Strings";

import {findRoom} from "../../actions/roomActions";
import RoomBottomNav from './RoomBottomNav';


const roomCodeLength = 6; //7 characters

class Room extends Component {

    constructor(props){
        super(props);
        if(this.props.room.owner[auth().currentUser.uid]){
            console.log('user is admin');
            this.state = {
                ...this.state,
                isAdmin: true
            }
        }
    }


    render() {
        return (
            <div>
                <div>
                    <p>Welcome to room: {this.props.room.name}</p>
                    
                    <RoomBottomNav/>
                </div>
            </div>
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


export default connect(mapStateToProps)(Room);

