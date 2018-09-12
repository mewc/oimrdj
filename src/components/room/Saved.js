import React from 'react';
import {connect} from 'react-redux';




class Saved extends React.Component {

    render() {


        return <p>Saved</p>
        ;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
    }
}



export default connect(mapStateToProps)(Saved);