import React from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import SavedIcon from '@material-ui/icons/Stars';
import HistoryIcon from '@material-ui/icons/History';
import AdminIcon from '@material-ui/icons/VpnKey';

import {switchTab} from "../../actions/roomActions";


const styles = {
    root: {
        width: 500,
    },
    BottomNav: {
        position: 'fixed',
        bottom: '0',
        width: '100%',
        height: '55px',
    }
};

class RoomBottomNav extends React.Component {


    handleChange = (event, value) => {
        this.setState({ value });
        this.props.dispatch(switchTab(value));
    };

    render() {


        return (
            <BottomNavigation value={this.props.roomTab} onChange={this.handleChange} style={styles.BottomNav}>
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Saved" value="saved" icon={<SavedIcon />} />
                <BottomNavigationAction label="History" value="history" icon={<HistoryIcon />} />
                <BottomNavigationAction label="Admin" value="admin" icon={<AdminIcon />} />
            </BottomNavigation>
        );
    }
}



const mapStateToProps = (state) => {

    return {
        message: state.message,
        loading: state.loading,
        roomTab: state.roomTab,
    }
}



export default connect(mapStateToProps)(withStyles(styles)(RoomBottomNav));