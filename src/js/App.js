import React, {Component} from 'react';

import '../css/App.css';

import IntroCard from './IntroCard';
import Room from './Room';
import MTP from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';

import {db} from './Client';

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: null,
            room: null
        }

        this.handleAuthEvent = this.handleAuthEvent.bind(this);
        this.handleRoomJoin = this.handleRoomJoin.bind(this);
    }

    handleAuthEvent(user) {
        console.log('auth event triggered');
        console.log(this.state.user);

        let userData = {
            email: user.email,
            name: user.displayName,
            photoUrl: user.photoURL,
            phone: user.phoneNumber,
            isAnonymous: user.isAnonymous,
        };
        this.setState({
                user: userData,
            }
            , () => {
                console.log(this.state.user);
            });
    }

    handleRoomJoin(room) {

    }

    testSend() {
        db.ref('/test/2' ).set({
            test: 'test',
            name: 1,
            hello: 'hi'
        });
    }

    testGet() {
        db.ref('/users/').once('value').then(function(snapshot) {
            console.log(snapshot);
        });
    }


    render() {

        return (
            <div className="App">
                <MTP>
                    <div>
                        {(this.state.user) ?
                            <Room user={this.state.user} handleRoomJoin={this.handleRoomJoin}/>
                            :
                            <IntroCard handleAuthEvent={this.handleAuthEvent}
                                       isLoggedIn={this.state.user}/>
                        }
                        <Button onClick={this.testSend}>send test</Button>
                        <Button onClick={this.testGet}>get test</Button>
                    </div>
                </MTP>
            </div>
        );
    }
}

export default App;
