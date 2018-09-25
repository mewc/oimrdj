import React, {Component} from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import '../App.css';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";



const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});


class LoadApp extends Component {


    render() {
        return (
            <React.Fragment>
                <LinearProgress className={this.props.classes.progress} size={200} />
                <p>{this.props.message}</p>
            </React.Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(LoadApp));