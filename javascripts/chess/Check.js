function Check(chess) {

	this.Status = {
		check : 'check', 
		checkmate : 'checkmate', 
		pat : 'pat', 
		none : 'none'
	}

	var $this = this;

	this.gameStatus = function() {
		// TODO
		return this.Status.none;
	}

	/** Prüft, ob man durch diesen Zug in Schach gerät **/
	this.isCheckAfter = function(fromx, fromy, tox, toy) {
		var board = Tools.copyBoard(chess.getBoard());
		board[toy][tox] = board[fromy][fromx];
		board[fromy][fromx] = '-';
		var king = Tools.contains(Constants.whites, board[toy][tox]) ? 'K' : 'k';
		var status = checkBoard(board, king);
		log(board);
		return (status != this.Status.none);
	}

	var checkBoard = function(board, king) {
		console.log('CHECK BOARD');
		var position = Tools.getPosition(board, king);
		var white = king == 'K';
		var tests = [isThreatFromKnight, isThreatFromPawn, isThreatFromBishopOrQueen, isThreatFromRookOrQueen, isThreatFromKing];
		for (var i in tests) {
			if (tests[i](board, position, white)) return $this.Status.check;
		}
		return $this.Status.none;
	}

	var isThreatFromKnight = function(board, position, white) {
		console.log('isThreatFromKnight');
		var knightPositions = Tools.getKnightSteps(position.x, position.y);
		for (var i in knightPositions) {
			var pos = knightPositions[i];
			if (testPosition(board, pos, white, 'n')) {
				console.log('check by knight');
				return true;
			}
		}
		return false;
	}

	var isThreatFromPawn = function(board, position, white) {
		console.log('isThreatFromPawn');
		var positions = [
				{x: 1*position.x-1, y: 1*position.y + (white ? -1 : 1)}, 
				{x: 1*position.x+1, y: 1*position.y + (white ? -1 : 1)}
			];
		for (var i in positions) {
			if (testPosition(board, positions[i], white, 'p')) {
				console.log('check by pawn');
				return true;
			}
		}
		return false;
	}

	var isThreatFromBishopOrQueen = function(board, position, white) {
		console.log('isThreatFromBishopOrQueen');
		if (
			testLine(board, position, white, 'qb', -1, -1) || 
			testLine(board, position, white, 'qb', -1, 1) || 
			testLine(board, position, white, 'qb', 1, -1) || 
			testLine(board, position, white, 'qb', 1, 1)
		) {
			console.log('check by queen or bishop');
			return true;
		}
		return false;
	}

	var isThreatFromRookOrQueen = function(board, position, white) {
		console.log('isThreatFromRookOrQueen');
		if (
			testLine(board, position, white, 'qr', 0, -1) || 
			testLine(board, position, white, 'qr', 0, 1) || 
			testLine(board, position, white, 'qr', -1, 0) || 
			testLine(board, position, white, 'qr', 1, 0)
		) {
			console.log('check by queen or rook');
			return true;
		}
		return false;
	}

	var isThreatFromKing = function(board, position, white) {
		console.log('isThreatFromKing');
		if (
			testPosition(board, {x: 1*position.x-1, y: 1*position.y-1 }, white, 'k') || 
			testPosition(board, {x: 1*position.x-1, y: 1*position.y   }, white, 'k') || 
			testPosition(board, {x: 1*position.x-1, y: 1*position.y+1 }, white, 'k') || 

			testPosition(board, {x: 1*position.x,   y: 1*position.y+1 }, white, 'k') || 
			testPosition(board, {x: 1*position.x,   y: 1*position.y-1 }, white, 'k') || 

			testPosition(board, {x: 1*position.x+1, y: 1*position.y+1 }, white, 'k') || 
			testPosition(board, {x: 1*position.x+1, y: 1*position.y   }, white, 'k') || 
			testPosition(board, {x: 1*position.x+1, y: 1*position.y-1 }, white, 'k')
		) {
			console.log('check by king');
			return true;
		}
		return false;
	}

	/** Testet eine Linie, ausgehend von einem punkt auf das vorkommen eines figurentyps. stoppt bei einer anderen figur */
	var testLine = function(board, position, white, type, xoff, yoff) {
		for (var i = 1; i < 8; i++) {
			var pos = {x: 1*position.x+(xoff*i), y: 1*position.y+(yoff*i)};
			if (pos.y < 0 || pos.y > 7 || pos.x < 0 || pos.x > 7) return false;
			if (testPosition(board, pos, white, type)) return true;
			if (board[pos.y][pos.x] != '-')  return false;
		}
		return false;
	}

	/** Testet einen Punkt auf einen Figurentyp **/
	var testPosition = function(board, pos, white, type) {
		if (pos.y < 0 || pos.y > 7 || pos.x < 0 || pos.x > 7) return false;
		var hit = board[pos.y][pos.x];
		if (
			(! white && S(type.toUpperCase()).contains(hit)) ||
			(white && S(type.toLowerCase()).contains(hit))
			) {
			return true;
		}
		return false;
	}

	var log = function(board) {
		var t = new ChessLogger(chess);
		console.log('TEST BOARD: ');
		t.logTestBoard(board);
	}


}