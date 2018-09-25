import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "../../Client.js";

import * as s from "../../static/Strings";

import RoomBottomNav from './RoomBottomNav';
import Search from './Search';
import Admin from './Admin';
import History from './History';
import Saved from './Saved';
import Profile from "./Profile";


class Room extends Component {

    constructor(props){
        super(props);

        //check if admin
        let isAdmin = false;
        if(this.props.room.owner[auth().currentUser.uid]){
            isAdmin= true;
        }
        this.state = {
            isAdmin: isAdmin
        };
    }


    tabRender(name){
        switch(this.props.roomTab){
            case s.TAB_ADMIN:
                return <Admin/>;
            case s.TAB_HISTORY:
                return <History/>;
            case s.TAB_SAVED:
                return <Saved/>;
            case s.TAB_PROFILE:
                return <Profile/>
            default:
                return  <Search/>;
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Welcome to: {this.props.room.name} </h1>
                    <h2>{this.props.room.code} </h2>
                    {this.tabRender(this.props.roomTab)}
                    <RoomBottomNav isAdmin={this.state.isAdmin}/>
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
        roomTab: state.roomTab,
    }
}


export default connect(mapStateToProps)(Room);

