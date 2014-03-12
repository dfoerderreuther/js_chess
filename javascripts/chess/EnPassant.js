function EnPassant(chess, fromx, fromy, tox, toy) {

	var board = chess.getBoard();
	
	var moveFigure = board[fromy][fromx];
	var hitFigure = board[toy][tox];

	var enpassant = chess.getEnpassant();


	this.enablingEnPassant = function() {
		if (moveFigure == 'p' && fromy == 1 && toy == 3) {
			enpassant.x = fromx; 
			enpassant.y= 2;
			return true;
		}
		if (moveFigure == 'P' && fromy == 6 && toy == 4) {
			enpassant.x = fromx; 
			enpassant.y= 5;
			return true;
		}	
		enpassant.x = ''; 
		enpassant.y = '';
		return false;
	}

	this.canHitEnPassant = function() {
		if (
				(moveFigure == 'p' || moveFigure == 'P') && 
				enpassant.x == tox && 
				enpassant.y == toy && 
				(fromx == tox - 1 || fromx == tox + 1)
			) {
			console.log('can canHitEnPassant!');
			return true;
		}
		return false;
	}

	this.hitEnPassant = function() {
		if (enpassant.y == 5) {
			board[4][enpassant.x] = '-';
		}
		if (enpassant.y == 2) {
			board[3][enpassant.x] = '-';
		}
	}


}