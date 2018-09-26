import React from 'react';
import {connect} from 'react-redux';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {auth} from "../../Client";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ApproveIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";
// import PlayIcon from "@material-ui/icons/PlayArrow";
import {respondToRequest} from "../../actions/requestActions";




class RequestResponseItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            secondary: true,
            dense: false,
        };
    }

    handleRequestResponse(response){
        this.props.dispatch(respondToRequest(
            this.props.data,
            this.props.code,
            response))
    }

    playTrackPreview(){
        console.log(this.props.data.spotifyId);
    }


    render() {
        // /*get submitters profile photo, if midding show default person icon (or spotify cover?)*/

        const req = this.props.data;
        let albumAvatar = req.img
            ?<Avatar src={req.img.url} alt={req.songArtist + ' ' + req.songTitle}><PersonIcon/></Avatar>
            :<Avatar><PersonIcon/></Avatar>;
        let userAvatar = this.props.userImg
            ?<Avatar src={this.props.userImg} alt={this.props.userName}><PersonIcon/></Avatar>
            :<Avatar><PersonIcon/></Avatar>;


        return <ListItem>
            <ListItemAvatar>
                {albumAvatar}
            </ListItemAvatar>
            +
            <ListItemAvatar>
                {userAvatar}
            </ListItemAvatar>
            <ListItemText
                primary={req.songTitle + ' - ' + req.songArtist}
                secondary={this.state.secondary ? 'Requested by: ' + auth().currentUser.displayName : null}
            />
            {/*<IconButton aria-label="Play" onClick={this.playTrackPreview.bind(this)}>*/}
                {/*<PlayIcon />*/}
            {/*</IconButton>*/}
            <IconButton aria-label="Delete" value={false} onClick={() => this.handleRequestResponse(false)}>
                <DeleteIcon />
            </IconButton>
            <ListItemSecondaryAction>
                <IconButton aria-label="Approve" value={true} onClick={() => this.handleRequestResponse(true)}>
                    <ApproveIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>;
    }
}



const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        code: state.room.code,
        userImg: state.user.photoUrl,
        userName: state.user.name,
    }
}



export default connect(mapStateToProps)(RequestResponseItem);