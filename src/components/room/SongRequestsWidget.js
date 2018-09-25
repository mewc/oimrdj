import React from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {LABEL_APPROVED_TRACKS, LABEL_MY_REQUESTS} from "../../static/Strings";
import RefreshIcon from "@material-ui/icons/Refresh";
import { refreshRequestList } from "../../actions/requestActions";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SongChip from './SongChip';

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

class SongRequestsWidget extends React.Component {

    //props.userOnly = show tracks i've requested (and their status)
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

    componentDidCatch(e, info){
        console.log(info);
    }

    render() {
        const {classes, requests} = this.props;

        return <React.Fragment>
            <Typography>{this.props.requests.length}</Typography>
        <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
                {(this.props.userOnly)?LABEL_MY_REQUESTS:LABEL_APPROVED_TRACKS}
                <IconButton aria-label="Approve" value={true} onClick={this.refreshPendingRequestList.bind(this)}>
                <RefreshIcon />
                </IconButton>
            </Typography>
            <div className={classes.demo}>
                <List dense={this.state.dense}>
                    {
                        Object.keys(requests).map((key, req) => {
                            let data = requests[key];
                            let output = '';
                            //only allow track that haven't been decided on yet to show
                            if(this.props.userOnly && data.submittedBy !== undefined){
                                Object.keys(data.submittedBy).map((k, v) => {
                                    output = ((k === this.props.user.uid) ?
                                        output = <SongChip data={data} key={key} isAdmin={this.props.isAdmin}/> :
                                        '');
                                    return '';
                                });
                            }else{
                                output = ((data.isApproved !== undefined && data.isApproved)?
                                    <SongChip data={data} key={key} isAdmin={this.props.isAdmin}/> :
                                    '');
                            }
                            return output;

                      })

                    }
                </List>
            </div>
        </Grid>
        </React.Fragment>
    }
}



const mapStateToProps = (state) => {
    //TODO support multiple admins?
    let isAdmin = !!(state.room.owner[state.user.uid]);
    return {
        loading: state.loading,
        requests: state.requests,
        user: state.user,
        isAdmin: isAdmin,
    };
}



export default connect(mapStateToProps)(withStyles(styles)(SongRequestsWidget));