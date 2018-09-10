import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {FaCompactDisc} from 'react-icons/fa/';

import * as str from '../static/Strings';
import AuthButton from "./AuthButton";
import {loginUser, logoutUser} from "../actions/authActions";

const styles = {
    card: {
        maxWidth: 345,
        margin: '0 auto',

    },
    media: {
        height: 140,
    },
};

class IntroCard extends Component {

    constructor(props){
      super(props);
      this.state = {
        CurrentBio: str.APP_BIO_VARIANTS[0]
      };
    }


    render() {
        return (
            <Card style={styles.card}>
                <CardMedia
                    style={styles.media}
                    image="../static/images/dj_static.jpg"
                    title="DJ in action"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {str.APP_NAME} <FaCompactDisc/>
                    </Typography>
                    <Typography component="p">
                        {this.state.CurrentBio}
                    </Typography>
                </CardContent>
                <CardActions>
                            <AuthButton />
                </CardActions>
            </Card>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loginUser, logoutUser}, dispatch);
}

export default  connect(mapStateToProps, mapDispatchToProps)  (IntroCard);
