import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { connect } from 'react-redux';
import {showSnackbar, hideSnackbar} from '../actions/actions.js';

class ErrorSnackbar extends React.Component{

  constructor(props){
    super(props);
    this.state = {

    };
  }

  handleSnackbarTrigger = (error) => {
      let message = 'Search error - ' + error.message;
      this.props.dispatch(showSnackbar(message));
  }

  handleRequestClose = () => {
      this.props.dispatch(hideSnackbar());
  }


  render(){
    return <Snackbar
        open={(this.props.notification)?true:false}
        message={this.props.notification}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps) (ErrorSnackbar);
