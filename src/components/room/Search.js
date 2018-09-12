import React from 'react';
import {connect} from 'react-redux';




class Search extends React.Component {

    render() {


        return <p>search</p>;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
    }
}



export default connect(mapStateToProps)(Search);