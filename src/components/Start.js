import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as str from "../static/Strings";

import IntroCard from "./IntroCard";


class Start extends Component {
    render() {
        return (
            <React.Fragment>
                    <IntroCard />
                    <p onClick={() => {this.openMessage()}}>&copy;{str.FOOTER_COPYRIGHT}</p>
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

