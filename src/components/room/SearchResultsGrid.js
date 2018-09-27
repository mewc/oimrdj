import React from 'react';
import {connect} from 'react-redux';
import * as str from "../../static/Strings";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import RequestSubmitButton from './RequestSubmitButton';

import { isBrowser} from 'react-device-detect';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 200,
        height: 200,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const gridValues = {
    mobile: {
        rowBig: 2,
        rowReg: 1,
        colBig: 1,
        colReg: 0.5
    },
    desktop: {
        rowBig: 2,
        rowReg: 1,
        colBig: 1,
        colReg: 0.5
    }
}
class SearchResultsGrid extends React.Component {

    constructor(props){
        super(props);



        this.state = {
            classes: PropTypes.object.isRequired,
            gridVals: (isBrowser)?gridValues.desktop:gridValues.mobile
        }
    }

    render() {
        const {classes} = this.state;
        return (
            <div className={classes.root}>
                <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                    {this.props.spotify.map(tile => (

                            <GridListTile key={tile.id}
                                          cols={(tile.popularity > 75) ? this.state.gridVals.colBig : this.state.gridVals.colReg}
                                          rows={(tile.popularity > 75)  ? this.state.gridVals.rowBig : this.state.gridVals.rowReg}>

                            <img src={tile.album.images[0].url} alt={tile.artists[0].name + ' ' + tile.name}/>
                            <GridListTileBar
                                title={tile.name + ' - ' + tile.artists[0].name}
                                titlePosition="top"
                                actionIcon={
                                    <RequestSubmitButton track={tile} actionPosition={"left"}/>
                                }
                                actionPosition="right"
                                className={classes.titleBar}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        spotify: state.spotify,
    }
}

export default connect(mapStateToProps) (withStyles(styles)(SearchResultsGrid));