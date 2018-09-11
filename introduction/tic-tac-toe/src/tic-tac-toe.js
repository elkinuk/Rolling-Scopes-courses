class TicTacToe {
    constructor() {
		this.matrix = new Array (new Array (null,null,null), new Array (null,null,null), new Array (null,null,null));
		this.size = 3;
		this.player = 'x';
		this.filledCells = 0;
    }

    getCurrentPlayerSymbol() {
	    if ((this.player === 'x') || (this.filledCells == 0))
			return 'x';
		if (this.player === 'o')
			return 'o';
    }

    nextTurn(rowIndex, columnIndex) {
		if (this.matrix[rowIndex][columnIndex] == null){
		
			this.matrix[rowIndex][columnIndex] = this.player;
		
			this.filledCells++;
			
			if (this.player === 'o'){
				this.player = 'x';}
			else this.player = 'o';
		}
    }

    isFinished() {
		if ((this.getWinner()) || (this.isDraw()))
			return true;
		else return false;
    }

    getWinner() {
		if (this.matrix[0][0] != null && this.matrix[0][0] === this.matrix[0][1] && this.matrix[0][1] === this.matrix[0][2])
	    	return this.matrix[0][2];
		if (this.matrix[1][0] != null && this.matrix[1][0] === this.matrix[1][1] && this.matrix[1][1] === this.matrix[1][2])
			return this.matrix[1][2];
		if (this.matrix[2][0] != null && this.matrix[2][0] === this.matrix[2][1] && this.matrix[2][1] === this.matrix[2][2])
			return this.matrix[2][2];
		if (this.matrix[0][0] != null && this.matrix[0][0] === this.matrix[1][0] && this.matrix[1][0] === this.matrix[2][0])
			return this.matrix[2][0];
		if (this.matrix[0][1] != null && this.matrix[0][1] === this.matrix[1][1] && this.matrix[1][1] === this.matrix[2][1])
			return this.matrix[2][1];
		if (this.matrix[0][2] != null && this.matrix[0][2] === this.matrix[1][2] && this.matrix[1][2] === this.matrix[2][2])
			return this.matrix[2][2];
		if (this.matrix[0][0] != null && this.matrix[0][0] === this.matrix[1][1] && this.matrix[1][1] === this.matrix[2][2])
			return this.matrix[2][2];
		if (this.matrix[0][2] != null && this.matrix[0][2] === this.matrix[1][1] && this.matrix[1][1] === this.matrix[2][0]) 
			return this.matrix[2][0];
		return null;

    }

    noMoreTurns() {
		if (this.filledCells == 9)
			return true;
		else return false;
    }

    isDraw() {
		if ((this.filledCells == 9) && (this.getWinner() == null))
			return true;
		else return false;
    }

    getFieldValue(rowIndex, colIndex) { //!!!!!!!!!!!!!!!!!
		return this.matrix[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
