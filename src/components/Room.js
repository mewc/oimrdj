import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';

import Snackbar from './Snackbar';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});


class Room extends Component {




    render() {
        return (
            <div>
                <div>
                    <TextField
                        label="I want to join room..."
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder=""
                        helperText=""
                        // fullWidth
                        margin="normal"
                    />
                    <Snackbar />
                </div>
            </div>
        );

    }


}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Room);
