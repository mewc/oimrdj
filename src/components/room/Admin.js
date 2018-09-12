import React from 'react';
import {connect} from 'react-redux';




class Admin extends React.Component {

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