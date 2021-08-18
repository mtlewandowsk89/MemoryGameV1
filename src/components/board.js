import React, { useState } from 'react';
import '../App.css';
import GameTile from './tile.js';

function GameBoard (){

    const [difficulty, changeDifficulty] = useState(2);
    const [timer, updateTimer] = useState(false);
    const [correctTiles, updateCorrectTiles] = useState([]);
    const [tilesClickedOn, addTileClicked] = useState([]);
    const [won, setWin] = useState(false);
    const [tilesFound, incrementTiles] = useState(1);
    const [gameStarted, gameStart] = useState(false);
    let tiles = [];
    let gridColumns = '';
    let correctTilesStorage = [];
    let winMessage;

    const startGame = () => {
        if (!gameStarted) {
            gameStart(true);
            for (let i = 0; i < difficulty; i++) {
                let number = Math.floor(Math.random() * (difficulty * difficulty)) + 1;
                if (correctTilesStorage.indexOf(number) < 0) {
                    correctTilesStorage.push(number);
                } else { 
                    i--;
                }
            }
            updateCorrectTiles(correctTilesStorage);
            updateTimer(true);
            setTimeout(() => {
                updateTimer(false);
            }, 3000)
        }
    }

    const setTileFound = (tileID) => {
        addTileClicked(tilesClickedOn => [...tilesClickedOn, tileID]);
        incrementTiles(tilesFound + 1);
        if (tilesFound === correctTiles.length) {
            setWin(true);
        }
    }

    const resetGame = (e) => {
        changeDifficulty(e.target.value || difficulty);
        updateTimer(false);
        updateCorrectTiles([]);
        incrementTiles(1);
        setWin(false);
        gameStart(false);
        addTileClicked([]);
    }

    // update number of tiles
    for (let i = 1; i <= difficulty * difficulty; i++){
        tiles.push(<GameTile tileNumber={i} correctTiles={correctTiles} won={won} tilesClickedOn={tilesClickedOn} timerRunning={timer} setTileFound={(tileID) => setTileFound(tileID)} key={i}></GameTile>);
    }

    //update grid settings
    for (let i = 0; i < difficulty; i++) {
        gridColumns += 'auto ';
    }

    if (won) {
        winMessage = <div className="win">Congratulations, you've found all the correct tiles!</div>;
    }

    return(
        <div>
            <label className="difficultyLabel">
                Change difficulty: 
                <input type="range" min="2" max="20" value={difficulty} onChange={(e) => {resetGame(e)}} className="slider" id="myRange" />
            </label>
            <div className="difficulty">Difficulty: {difficulty}</div>
            <button className="startButton" onClick={startGame}>Start</button><button className="resetButton" onClick={resetGame}>Reset</button>
            <div className="gameBoard" style={{gridTemplateColumns: gridColumns}}>
                {tiles}
                {winMessage}
            </div> 
        </div>
    )
}

export default GameBoard;