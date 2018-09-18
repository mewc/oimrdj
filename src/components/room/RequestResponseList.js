import React from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RequestResponseItem from "./RequestResponseItem";
import {LABEL_PENDING_REQUESTS} from "../../static/Strings";


const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
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

    render() {
        const {classes, requests} = this.props;
        console.log(this.props.requests);

        let key = null;
        return <React.Fragment>
            <Typography>{this.props.requests.length}</Typography>
        <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
                {LABEL_PENDING_REQUESTS}
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
        requests: state.requests
    };
}



export default connect(mapStateToProps)(withStyles(styles)(RequestResponseList));