import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as str from '../static/Strings';
import AuthButton from "./AuthButton";
import {loginUser, logoutUser} from "../actions/authActions";


import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        height: '30%',
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class SignIn extends Component {

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                {/*<CssBaseline />*/}
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">{str.APP_NAME} </Typography>
                        {/*<Typography variant="caption">*/}
                            {/*{this.props.currentBio}*/}
                        {/*</Typography>*/}
                        <AuthButton />
                    </Paper>
                </main>
            </React.Fragment>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        loading: state.loading,
        currentBio: str.APP_BIO_VARIANTS[0],
    }
}


SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loginUser, logoutUser}, dispatch);
}

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
