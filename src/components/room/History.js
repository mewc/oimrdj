import React from 'react';
import {connect} from 'react-redux';




class History extends React.Component {

    render() {


        return <p>history</p>;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
    }
}



export default connect(mapStateToProps)(History);