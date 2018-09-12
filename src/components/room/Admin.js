import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";




class Admin extends React.Component {
    //admin has admin controls + all profile stuff too
    render() {


        return <React.Fragment> <p>Admin</p> <Profile/> </React.Fragment>;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
    }
}



export default connect(mapStateToProps)(Admin);