import React from 'react';
import {connect} from 'react-redux';




class Admin extends React.Component {
    //admin has admin controls + all profile stuff too
    render() {


        return <p>Admin</p>;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
    }
}



export default connect(mapStateToProps)(Admin);