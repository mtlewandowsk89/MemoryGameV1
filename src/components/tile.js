import React, { useState, useEffect } from 'react';
import '../App.css';

function GameTile (props){

    const [classes, changeClasses] = useState();

    const checkTile = () => {
        if (!props.timerRunning && props.correctTiles.length && !props.won && (props.tilesClickedOn.indexOf(props.tileNumber) < 0)) {
            if (props.correctTiles.indexOf(props.tileNumber) > -1) {
                changeClasses('correctTile');
                props.setTileFound(props.tileNumber);
            } else {
                changeClasses('wrongTile');
            }
        }
    }

    useEffect(() => {
        if (props.timerRunning && props.correctTiles.indexOf(props.tileNumber) > -1 && classes !== 'previewTile') {
            changeClasses('previewTile');
        } else if ((!props.timerRunning && (classes !== 'correctTile' && classes !== 'wrongTile')) || !props.correctTiles.length){
            changeClasses();
        }
    }, [classes, props.correctTiles, props.tileNumber, props.timerRunning])
    

    return(
        <div className={`tile ${classes}`} onClick={checkTile}></div>
    )
}

export default GameTile;