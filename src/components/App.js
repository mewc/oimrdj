import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {fetchUser, setUser} from '../actions/authActions.js';
import {showSnackbar, hideSnackbar} from '../actions/actions.js';

import '../App.css';

import IntroCard from './IntroCard';
import Room from './Room';
import MTP from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';


class App extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <MTP>
                    <div>
                        {(this.props.user) ?
                            <Room user={this.props.user}
                            handleRoomJoin={this.handleRoomJoin}/>
                            :
                            <IntroCard handleAuthEvent={this.handleAuthEvent}
                                       isLoggedIn={this.props.user}/>
                        }
                        <Button onClick={this.testSend}>send test</Button>
                        <Button onClick={this.testGet}>get test</Button>
                    </div>
                </MTP>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchUser, setUser}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps) (App);
