import React from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RequestResponseItem from "./RequestResponseItem";
import {LABEL_PENDING_REQUESTS} from "../../static/Strings";
import RefreshIcon from "@material-ui/icons/Refresh";
import {refreshRequestList} from "../../actions/requestActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});

class RequestResponseList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            secondary: true,
            dense: false,
        };
    }

    refreshPendingRequestList(){
        this.props.dispatch(refreshRequestList(this.props.roomCode));
    }

    render() {
        const {classes, requests} = this.props;
        console.log(this.props.requests);

        return <React.Fragment>
            <Typography>{this.props.requests.length}</Typography>
        <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
                {LABEL_PENDING_REQUESTS}
                <IconButton aria-label="Approve" value={true} onClick={this.refreshPendingRequestList.bind(this)}>
                <RefreshIcon />
                </IconButton>
            </Typography>
            <div className={classes.demo}>
                <List dense={this.state.dense}>
                    {
                        Object.keys(requests).map((key, req) => {
                        return (<RequestResponseItem data={requests[key]} key={key}/>)
                      })

                    }
                </List>
            </div>
        </Grid>
        </React.Fragment>
    }
}



const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        requests: state.requests,
        roomCode: state.room.code
    };
}



export default connect(mapStateToProps)(withStyles(styles)(RequestResponseList));