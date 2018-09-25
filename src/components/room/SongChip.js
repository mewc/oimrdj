import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PersonIcon from '@material-ui/icons/Person';
// import PlayIcon from '@material-ui/icons/PlayArrow';
import {Avatar, Chip} from '@material-ui/core/';
import {removeRequest} from "../../actions/requestActions";
import {showSnackbar} from "../../actions/actions";


const styles = theme => ({
    chip: {
        margin: theme.spacing.unit
    }
});

class SongChip extends React.Component {

    //must pass in a prop called data which is for a song.

    constructor(props){
        super(props);
        let color = 'default';
        let variant = 'default';
        if(this.props.data.isApproved !== undefined ){
            if(this.props.data.isApproved ){
                color = 'primary';
            }else{
                color = 'secondary';
            }
        }else{
            variant = 'outlined';
        }
        this.state = {
            secondary: true,
            dense: false,
            color: color,
            variant: variant,
        };

    }

    // handlePlayPreview(songId){
    //     console.log(songId)
    // }

    handleDeleteRequest(){
        if(this.props.data.isApproved !== undefined && this.props.data.isApproved && !(this.props.isAdmin)){
            this.props.dispatch(showSnackbar('Song is approved, can\'t remove'));
        }else{
            this.props.dispatch(removeRequest(this.props.data, this.props.roomCode));
        }
    }

    render() {
        const {classes} = this.props;
        const label = this.props.data.songTitle + ' - ' + this.props.data.songArtist;
        let avatar = this.props.data.img
            ?<Avatar src={this.props.data.img.url} alt={this.props.data.songArtist + ' ' + this.props.data.songTitle}><PersonIcon/></Avatar>
                :<Avatar><PersonIcon/></Avatar>;


        return <Chip
            className={classes.chip}
            label={label}
            // onDelete={() => this.handlePlayPreview(this.props.data.spotifyId)}
            onDelete={() => this.handleDeleteRequest()}
            // deleteIcon={<PlayIcon />}
            color={this.state.color}
            variant={this.state.variant}
            avatar={avatar}
            />;
    }
}



const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        roomCode: state.room.code,
    };
}



export default connect(mapStateToProps)(withStyles(styles)(SongChip));