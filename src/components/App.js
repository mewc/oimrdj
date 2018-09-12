import React, {Component} from 'react';
import { connect } from 'react-redux';

import {auth } from "../Client.js";

import '../App.css';

import Room from './room/Room';
import JoinRoom from './JoinRoom';
import Start from './Start';

import {loginUser} from '../actions/authActions';
import Snackbar from "./Snackbar";




class App extends Component {

    constructor(props){
        super(props);
        auth().onAuthStateChanged((user) => {
            this.props.dispatch(loginUser(user));
            //TODO remove this for poroduction
        });
    }

    render() {
        document.title = this.props.title + ' ' + this.props.message;
        return (
            <div className="App">
                    <div>
                        {(this.props.user.email) ?
                            (this.props.room) ?
                                <Room/>
                                :
                                <JoinRoom/>
                            :
                            <Start/>
                        }
                    </div>
                <Snackbar />
            </div>
        );
    }

    openMessage(){
        console.log('email info@mewc.info');
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        title: state.title,
        message: state.message,
        room: state.room,
    }
}


export default connect(mapStateToProps) (App);
