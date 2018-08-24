import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as str from '../static/Strings';
import AuthButton from "./AuthButton";

const styles = {
    card: {
        maxWidth: 345,
        margin: '0 auto',

    },
    media: {
        height: 140,
    },
};

function MediaCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image="../static/images/dj_static.jpg"
                title="DJ in action"
            />
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    { str.APP_NAME }
                </Typography>
                <Typography component="p">
                    { str.APP_BIO }
                </Typography>
            </CardContent>
            <CardActions>
                <AuthButton />
            </CardActions>
        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
