import React, {Component} from 'react';
import { connect } from 'react-redux';

import {auth } from "../Client.js";

import '../App.css';

import Room from './room/Room';
import JoinRoom from './JoinRoom';
import Start from './Start';

import {loginUser} from '../actions/authActions';
import {isBrowser} from "react-device-detect";
import Snackbar from "./Snackbar";

import LoadApp from './LoadApp';
import {loadApp, loadAppSuccess} from "../actions/actions";



class App extends Component {

    constructor(props){
        super(props);
        this.props.dispatch(loadApp());
        this.state = {
            render: <LoadApp />
        };
        auth().onAuthStateChanged((user) => {
            if(user){
                console.log(user.displayName + ' is logged in');
                this.setState((state, props) => {
                    return {
                        ...state,
                        startRender: (user) ?
                            //TODO persistence of room joining/leaving (props saving)
                            <JoinRoom/>
                            :
                            <Start/>
                    }
                });
                this.props.dispatch(loadAppSuccess());

            }else{
                this.props.dispatch(loginUser(user));
            }
            //TODO remove this for poroduction
        });

        (isBrowser)?console.log('is browser'):console.log('is mobile!');
    }


    render() {
        let roomName = '';
       try{
           roomName = this.props.room.name + ' :: ';
        }catch(e){
           console.log('Not signed into room yet');
       }
        document.title = this.props.title + ' ' + roomName  + '  ' +  this.props.message;
        return (
            <div className="App">
                    <div>
                        {(this.props.room) ?
                            <Room/>
                            :
                            this.state.startRender
                        }
                    </div>
                <Snackbar />
            </div>
        );
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
