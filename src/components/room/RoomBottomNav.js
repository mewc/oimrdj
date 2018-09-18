import React from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import SavedIcon from '@material-ui/icons/Stars';
import HistoryIcon from '@material-ui/icons/History';
import AdminIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';

import {switchTab} from "../../actions/roomActions";
import * as s from '../../static/Strings';


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
                <BottomNavigationAction label="Search" value={s.TAB_SEARCH} icon={<SearchIcon />} />
                {/*<BottomNavigationAction label="Saved" value={s.TAB_SAVED} icon={<SavedIcon />} />*/}
                <BottomNavigationAction label="History" value={s.TAB_HISTORY} icon={<HistoryIcon />} />
                {(this.props.isAdmin)?
                    <BottomNavigationAction label="Admin" value={s.TAB_ADMIN} icon={<AdminIcon />} />
                    :
                    <BottomNavigationAction label="Profile" value={s.TAB_PROFILE} icon={<PersonIcon />} />
                }

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