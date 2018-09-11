import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TiSocialFacebook} from 'react-icons/ti'


import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import * as str from '../static/Strings';
import {logoutUser, loginUser} from '../actions/authActions';


class AuthButton extends Component {


    constructor(props) {
        super(props);

        this.state = {
            classes: PropTypes.object.isRequired,
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleLoginClick() {
        this.props.dispatch(loginUser())
    }

    handleLogoutClick() {
        this.props.dispatch(logoutUser())
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

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
    }
}

export default  connect(mapStateToProps)  (AuthButton);
