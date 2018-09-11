import React, {Component} from 'react';
import { connect } from 'react-redux';

import {auth, provider, db} from "../Client.js";

import '../App.css';

import IntroCard from './IntroCard';
import Room from './Room';

import {Text} from '@blueprintjs/core';
import {logoutUser, loginUser} from '../actions/authActions';


class App extends Component {

        constructor(props){
            super(props);
            auth().onAuthStateChanged((user) => {
                this.props.dispatch(loginUser(user));
                //TODO remove this for poroduction
            });
        }

    render() {
        return (
            <div className="App">
                    <div>
                        {(this.props.user.email) ?
                            <Room />
                            :
                            <div>
                                <IntroCard />
                                <Text className={'p'} >&copy; oimrdj pty ltd</Text>
                            </div>
                        }

                    </div>
            </div>
        );
    }

    openMessage(){
        console.log('email info@mewc.info');
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps) (App);
