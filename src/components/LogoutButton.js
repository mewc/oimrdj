import React from 'react';
import {connect} from 'react-redux';

import Button from "@material-ui/core/Button/Button";
import LogoutIcon from "@material-ui/icons/HighlightOff";

import {logoutUser} from "../actions/authActions";
import {LABEL_LOGOUT} from "../static/Strings";


class LogoutButton extends React.Component {

    handleLogoutClick(){
        this.props.dispatch(logoutUser());
    }

    render() {

        return <React.Fragment>
            <Button variant={'extendedFab'} onClick={this.handleLogoutClick.bind(this)}>
                {LABEL_LOGOUT}
                <LogoutIcon />
            </Button>
        </React.Fragment>
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.user,
        room: state.room,
        message:state.message,
        loading: state.loading,
    }
}



export default connect(mapStateToProps)(LogoutButton);