import IconButton from "@material-ui/core/IconButton/IconButton";
import SendIcon from "@material-ui/icons/Send";
import TickIcon from "@material-ui/icons/Done";



import React from 'react';
import {connect} from 'react-redux';
import {submitRequest} from "../../actions/requestActions";


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
        this.setState(() => {
           return { requested: true }
        })
    };

    render() {

        return <IconButton disabled={this.state.requested}
                           onClick={this.handleRequestEvent.bind(this)} style={(this.state.requested)? {color: 'lightGreen'} : {color: 'white'}}
                        onHover >
            {(!this.state.requested)?<SendIcon  />:<TickIcon/>}
        </IconButton>;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
        requests: state.requests,
        roomCode: state.room.code,
    }
};



export default connect(mapStateToProps)(RequestSubmitButton);
