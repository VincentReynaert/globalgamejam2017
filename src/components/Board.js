import React, { Component } from 'react';
import Square from '../containers/Square';

import styles from './Board.css';

export default class Board extends Component {
	
	sum(tab) {
		var res = 0;
		for(let i = 0; i<tab.length;i++){
			res+=tab[i];
		}
		return res;
	}

	/**
	* return the pictureName of the square with coordinates i, j 
	*/
	squareToPicture(i, j) {
		var board = this.props.boardValues;
		var pictureName = "";
		var value = board[i][j];
		var boardSize = board.length;
		
		if (value == 0){
			pictureName += "empty";
		}else{
			if (value > 0){
				pictureName += "pile_" + (value).toString();
			} else {
					pictureName += "hole_" + (-1 * value).toString();
			}

			var positionOfNeighbours = [0, 0, 0, 0];

			// bas
			if (0 <= (i + 1) && (i + 1) < boardSize){
				if (board[i + 1][j] * value > 0){
					positionOfNeighbours[0] = 1;
				}
			}
			// haut
			if (0 <= (i - 1) && (i - 1) < boardSize){
				if (board[i - 1][j] * value > 0){
					positionOfNeighbours[1] = 1;
				}
			}
			// droite
			if (0 <= (j + 1) && (j + 1) < boardSize){
				if (board[i][j + 1] * value > 0){
					positionOfNeighbours[2] = 1;
				}
			}
			// gauche
			if (0 <= (j - 1) && (j - 1) < boardSize){
				if (board[i][j - 1] * value > 0){
					positionOfNeighbours[3] = 1;
				}
			}

			// 4 murs
			if (this.sum(positionOfNeighbours) == 0) {
				pictureName += "_4_0";
			} else {
				// 3 murs
				if (this.sum(positionOfNeighbours) == 1){
					pictureName += "_3";
					let rotation = 0;
					while (!(positionOfNeighbours[rotation])){
						rotation += 1;
					}
					// rotation = 3 = 0°, rotation = 0 = 90°, rotation = 2 = 180°, rotation = 1 = 270°
					if (rotation == 0){
						pictureName += "_" + (270).toString();
					} else {
						if (rotation == 1){
							pictureName += "_" + (90).toString();
						}else{ 
							if (rotation == 2){
								pictureName += "_" + (180).toString();
							}else{
								if (rotation == 3){
									pictureName += "_" + (0).toString();
								}
							}
						}
					}
				} else {
					// 2 murs
					if (this.sum(positionOfNeighbours) == 2){
					    const pon = JSON.stringify(positionOfNeighbours);
						pictureName += "_2";
						// 2 murs couloir
						if (pon == JSON.stringify([1, 1, 0, 0]) ||
							pon == JSON.stringify([0, 0, 1, 1])) {
							pictureName += "_couloir";
							// si positionOfNeighbours == [0, 0, 1, 1]) rotation = 0° sinon 90°
							if (pon == JSON.stringify([0, 0, 1, 1])){
								pictureName += "_0";
							} else {
								pictureName += "_90";
							}
						} else {						
							// 2 murs angle
							pictureName += "_angle";
							if (pon == JSON.stringify([1, 0, 1, 0])){
								pictureName += "_180";
							}else{
								if (pon == JSON.stringify([1, 0, 0, 1])) {
                                    pictureName += "_270";
								}else{
									if (pon == JSON.stringify([0, 1, 0, 1])){
										pictureName += "_0";
									}else{
										if (pon == JSON.stringify([0, 1, 1, 0])){
                                            pictureName += "_90";
										}
									}
								}
							}
						}
					}else{
						// 1 murs
						if (this.sum(positionOfNeighbours) == 3){
							pictureName += "_1";
							let rotation = 0;
							while (positionOfNeighbours[rotation]){
								rotation += 1;
							}
							// rotation = 3 = 0°, rotation = 0 = 90°, rotation = 2 = 180°, rotation = 1 = 270°
							if (rotation == 0){
                                pictureName += "_" + (270).toString();
							} else {
								if (rotation == 1) {
                                    pictureName += "_" + (90).toString();
								} else {
									if (rotation == 2){
										pictureName += "_" + (180).toString();
									} else {
										if (rotation == 3) {
											pictureName += "_" + (0).toString();
										}
									}
								}
							}
						}
						else {
							pictureName += '_0_0';
						}
					}
				}
			}
		}
		return pictureName;
	}
	
	render() {
	    const { boardValues, isGameOver } = this.props;

         const board = boardValues.map((rowArray, indexRow) => {
        	const squares = rowArray.map((col, indexCol)=> {
        		return <Square
					key={indexCol}
					x= {indexRow}
					y = {indexCol}
					value={col}
					imgSrc={this.squareToPicture(indexRow,indexCol)} />
        	});
        	return <div className={ styles.row } key={indexRow}> {squares} </div>;
        });
        return (
        	<section className={styles.base}>
                <div className={styles.container}>{board}</div>
				{ isGameOver && <div className={ styles.gameOver } /> }
			</section>
		);
    }
}


