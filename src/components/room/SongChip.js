import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PersonIcon from '@material-ui/icons/Person';
import PlayIcon from '@material-ui/icons/PlayArrow';
import {Avatar, Chip} from '@material-ui/core/';


const styles = theme => ({
    chip: {
        margin: theme.spacing.unit
    }
});

class SongChip extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            secondary: true,
            dense: false,
        };
    }

    handlePlayPreview(songId){
        console.log(songId)
    }

    render() {
        const {classes, requests} = this.props;
        const label = this.props.data.songTitle + ' ' + this.props.data.songArtist

        return <Chip
            className={classes.chip}
            label={label}
            onDelete={() => this.handlePlayPreview(this.props.data.spotifyId)}
            deleteIcon={<PlayIcon />}
            variant={'primary'}
            avatar={<Avatar><PersonIcon /></Avatar>}
            />
    }
}



const mapStateToProps = (state) => {
    return {
        loading: state.loading,
    };
}



export default connect(mapStateToProps)(withStyles(styles)(SongChip));