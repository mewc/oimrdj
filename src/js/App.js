import React, {Component} from 'react';

import '../css/App.css';
import * as str from '../static/Strings';

import IntroCard from './IntroCard';
import MTP from 'material-ui/styles/MuiThemeProvider';



class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: null
        }

        this.handleAuthEvent = this.handleAuthEvent.bind(this);
    }

    handleAuthEvent(user){
        console.log('auth event triggered');
        this.setState({
                user: user
            }
            , () => {
                console.log(this.state.user);
            });
    }


    render() {

        const isLoggedIn = this.state.user;
        let render;

        if (isLoggedIn) {
            render = <p>Hi, {this.state.user.displayName} - {str.LABEL_LOGOUT}</p>
        } else {
            render = <IntroCard handleAuthEvent={this.handleAuthEvent} isLoggedIn={this.state.user} />
        }

        return (
            <div className="App">
                <MTP>
                    { render }
                </MTP>
            </div>
        );
    }
}

export default App;
