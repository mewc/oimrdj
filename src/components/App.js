import React, {Component} from 'react';
import { connect } from 'react-redux';

import {auth } from "../Client.js";

import '../App.css';

import IntroCard from './IntroCard';
import Room from './Room';

import {Text} from '@blueprintjs/core';
import {loginUser} from '../actions/authActions';


class App extends Component {

    constructor(props){
        super(props);
        auth().onAuthStateChanged((user) => {
            this.props.dispatch(loginUser(user));
            //TODO remove this for poroduction
        });
    }

    componentDidMount(){
        document.title = this.props.title + ' ' + this.props.message;
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
        user: state.user,
        title: state.title,
        message: state.message,
    }
}


export default connect(mapStateToProps) (App);
