import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as str from "../static/Strings";

import SignIn from "./SignIn";
import Typography from "@material-ui/core/Typography/Typography";


class Start extends Component {
    render() {
        return (
            <React.Fragment>
                    <SignIn />
                    <Typography  variant={'button'} onClick={() => {this.openMessage()}}>&copy;{' ' + str.FOOTER_COPYRIGHT}</Typography>
            </React.Fragment>
        );

    }

    openMessage(){
        console.log('email info@mewc.info');
    }

}

const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
    }
}


export default connect(mapStateToProps)(Start);

