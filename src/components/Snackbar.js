import React from 'react';
import Sb from '@material-ui/core/Snackbar';

import { connect } from 'react-redux';
import { hideSnackbar} from '../actions/actions.js';
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class Snackbar extends React.Component{

  constructor(props){
    super(props);
    this.state = {

    };
  }

    handleRequestClose = () => {
        this.props.dispatch(hideSnackbar());
    }


    render(){
        return <Sb
            open={(this.props.notification)?true:false}
            message={this.props.notification}
            autoHideDuration={4000}
            onClose={this.handleRequestClose}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleRequestClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps) (Snackbar);
