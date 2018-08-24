import React from 'react';

import { TiSocialFacebookCircular } from 'react-icons/ti'


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as str from '../static/Strings';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

function AuthButton(props) {
    const { classes } = props;
    return (
        <div>
            <Button color="primary" variant="extendedFab" aria-label="Delete" className={classes.button}>
                { str.LABEL_LOGIN }
                <TiSocialFacebookCircular className={classes.extendedFab}/>
            </Button>
        </div>
    );
}

AuthButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthButton);

