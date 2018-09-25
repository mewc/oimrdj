import React from 'react';
import {connect} from 'react-redux';
import SongRequestsWidget from "./SongRequestsWidget";




class History extends React.Component {

    render() {


        return <React.Fragment>
            <p>history</p>
            <SongRequestsWidget userOnly={true}/>
        </React.Fragment>;
    }
}



const mapStateToProps = (state) => {
    return {
        message:state.message,
        loading: state.loading,
    }
}



export default connect(mapStateToProps)(History);