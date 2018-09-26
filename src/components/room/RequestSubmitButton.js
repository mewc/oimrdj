import IconButton from "@material-ui/core/IconButton/IconButton";
import SendIcon from "@material-ui/icons/Send";
import TickIcon from "@material-ui/icons/Done";
import BlockIcon from "@material-ui/icons/Block";
import LoadingSpinner from "@material-ui/core/CircularProgress/CircularProgress";



import React from 'react';
import {connect} from 'react-redux';
import {submitRequest} from "../../actions/requestActions";
import {requestTimeoutOff, requestTimeoutOn} from "../../actions/actions";


class RequestSubmitButton extends React.Component {

    //passes in trackId from traditional react props way.
    constructor(props){
        super(props);
        this.state = {
            requested: false,
        }
    }

    handleRequestEvent = () => {
        this.props.dispatch(submitRequest(this.props.track, this.props.roomCode));
        this.props.dispatch(requestTimeoutOn());
        setTimeout(() => {
            console.log('timeout done');
            this.props.dispatch(requestTimeoutOff());
        },this.props.requestTimeoutLength);
        this.setState(() => {
           return { requested: true }
        })
    };

    render() {
        return (this.props.requestTimeoutOn)
            ?<BlockIcon style={{color: 'white'}}/>
            :<IconButton disabled={this.state.requested}
                           onClick={this.handleRequestEvent.bind(this)} style={(this.state.requested)? {color: 'lightGreen'} : {color: 'white'}} >
            {(!this.state.requested)?((this.props.loading)?<LoadingSpinner/>:<SendIcon  />):<TickIcon/>}
        </IconButton>;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
        requests: state.requests,
        roomCode: state.room.code,
        requestTimeoutLength: state.room.timeout,
        requestTimeoutOn: state.requestTimeoutOn,
    }
};



export default connect(mapStateToProps)(RequestSubmitButton);
