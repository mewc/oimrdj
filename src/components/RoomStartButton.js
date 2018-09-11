import React, {Component} from 'react';

import * as str from '../static/Strings';
import {TiPlus, TiUserAdd} from 'react-icons/ti';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';



class RoomStartButton extends Component {


    constructor(props) {
        super(props);

        this.state = {
            classes: PropTypes.object.isRequired,
        };

    }

    startCreateRoomDialog(){
        console.log("perform room creation dialog, then create room then join");

    }

    createRoom(){

        this.props.handleRoomJoin()
    }

    render() {
        return (
            <Button color="primary" variant="extendedFab" aria-label="Delete" className={this.state.classes.button}
                    onClick={this.startCreateRoomDialog}>
                <TiPlus className={this.state.classes.extendedFab}/>
                {str.LABEL_CREATEROOM} or {str.LABEL_JOINROOM}
                <TiUserAdd className={this.state.classes.extendedFab}/>
            </Button>
        );
    }
}

export default RoomStartButton;
