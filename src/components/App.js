import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {loginUser, logoutUser} from '../actions/authActions.js';

import '../App.css';

import IntroCard from './IntroCard';
import Room from './Room';
import MTP from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';


class App extends Component {



    render() {
        return (
            <div className="App">
                <MTP>
                    <div>
                        {(this.props.user.email) ?
                            <Room />
                            :
                            <div>
                                <IntroCard />
                                <Button disabled={true}>&copy; oimrdj pty ltd</Button>
                                <Button onClick={this.openMessage}>mail</Button>
                            </div>
                        }

                    </div>
                </MTP>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({loginUser, logoutUser}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps) (App);
