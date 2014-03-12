function Promotion(chess, fromx, fromy, tox, toy) {

	var board = chess.getBoard();
	
	var moveFigure = board[fromy][fromx];

	this.conversion = function() {
		if (moveFigure == 'p' && toy == 7 || moveFigure == 'P' && toy == 0) {
			chess.getPromotionHandler()(this);
			return true;
		}	
		return false;
	}

	this.convert = function(what) {
		if (moveFigure == 'p' && toy == 7) {
			board[toy][tox] = what.toLowerCase();
		}
		if (moveFigure == 'P' && toy == 0) {
			board[toy][tox] = what.toUpperCase();
		}	
		chess.moved(true);
		chess.afterPromotion();
	}

	this.isNextTurnWhite = function() {
		return chess.isNextTurnWhite();
	}



}