import React, {Component} from 'react';

import {TiSocialFacebook} from 'react-icons/ti'


import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import * as str from '../static/Strings';
import {auth, provider, db} from "./Client";


class AuthButton extends Component {


    constructor(props) {
        super(props);

        this.state = {
            classes: PropTypes.object.isRequired,
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleLoginClick() {
        auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            this.props.handleAuthEvent(user);

            let userData = {
                name: user.displayName,
                photoUrl: user.photoURL,
                phone: user.phoneNumber,
                isAnonymous: user.isAnonymous,
            };
            db.toString();
            console.log(userData);

        }).catch(function (error) {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // const credential = error.credential;
             console.log(error);
            // console.log([error, errorCode, errorMessage, email, credential]);
        });


    }

    handleLogoutClick() {
        auth().signOut().then(() => {
            this.setState({user: null})
        })
    }


    render() {
        return (
            <Button color="primary" variant="extendedFab" aria-label="Delete" className={this.state.classes.button}
                    onClick={this.handleLoginClick}>
                <TiSocialFacebook className={this.state.classes.extendedFab}/>
                {str.LABEL_LOGIN}
            </Button>
        );
    }
}

export default AuthButton;
