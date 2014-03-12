function Rochade(chess, fromx, fromy, tox, toy) {

	var board = chess.getBoard();
	
	var moveFigure = board[fromy][fromx];
	var hitFigure = board[toy][tox];

	var board = chess.getBoard();
	
	var moveFigure = board[fromy][fromx];
	var hitFigure = board[toy][tox];

	var castle = chess.getCastle();

	this.isRochade = function(doit) {
		var methods = [checkDoBlackQueenside, checkDoBlackKingside, checkDoWhiteQueenside, checkDoWhiteKingside];
		for (var fi in methods) {
			if (methods[fi](doit)) {
				return true;
			}
		}	
		return false;
	}

	this.doRochade = function() {
		this.isRochade(true);
	}

	var checkDoBlackKingside = function(doit) {
		if (castle.k == false || moveFigure != 'k' || tox != 6) return false;
		// TODO Schachprüfung
		if (doit) {
			console.log('rochade black queen');
			board[0][7] = '-';
			board[0][5] = 'r';
		}
		return true;
	}

	var checkDoBlackQueenside = function(doit) {
		if (castle.q == false || moveFigure != 'k' || tox != 2) return false;
		// TODO Schachprüfung
		if (doit) {
			console.log('rochade black queen');
			board[0][0] = '-';
			board[0][3] = 'r';
		}
		return true;
	}

	var checkDoWhiteKingside = function(doit) {
		if (castle.K == false ||  moveFigure != 'K' || tox != 6) return false;
		// TODO Schachprüfung
		if (doit) {
			console.log('rochade white king');
			board[7][7] = '-';
			board[7][5] = 'R';
		}
		return true;
	}

	var checkDoWhiteQueenside = function(doit) {
		if (castle.Q == false || moveFigure != 'K' || tox != 2) return false;
		// TODO Schachprüfung
		if (doit) {
			console.log('rochade white queen');
			board[7][0] = '-';
			board[7][3] = 'R';
		}
		return true;
	}

	this.checkDestroy = function() {
		if (moveFigure == 'k' || (fromx == 7 && moveFigure == 'r')) {
			castle.k = false;
		}
		if (moveFigure == 'k' || (fromx == 0 && moveFigure == 'r')) {
			castle.q = false;
		}
		if (moveFigure == 'K' || (fromx == 7 && moveFigure == 'R')) {
			castle.K = false;
		}
		if (moveFigure == 'K' || (fromx == 0 && moveFigure == 'R')) {
			castle.Q = false;
		}
	}




}