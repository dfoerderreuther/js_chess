function FedWriter(chess) {
	
	var printBoard = function() {
		var board = chess.getBoard();
		var str = '';
		for (var y = 0; y < 8; y++) {
			for (var x = 0; x < 8; x++) {
				str += board[y][x];
			}
			str += '/';
		}
		for (var i = 8; i > 0; i--) {
			str = S(str).replaceAll(S('-').repeat(i).s, i).s;
		}
		return str;
	}
	
	var printColor = function() {
		return chess.isNextTurnWhite() ? 'w' : 'b';
	}
	
	var printCastle = function() {
		var str = '';
		var castle = chess.getCastle();
		if (castle.K) str += 'K';
		if (castle.Q) str += 'Q';
		if (castle.k) str += 'k';
		if (castle.q) str += 'q';
		if (str == '') str = '-';
		return str;
	}
	
	var printEnPassant = function() {
		if (chess.getEnpassant().x > -1 && chess.getEnpassant().y > -1) {
			return "abcdefgh".charAt(chess.getEnpassant().x) +  '' + (chess.getEnpassant().y+1);
		}
		return '-';
	}
	
	var printHalfMove = function() {
		return chess.getHalfMoves();
	}
	
	var printFullMove = function() {
		return chess.getMoves();
	}
	
	var parts = [
	             printBoard(), 
	             printColor(), 
	             printCastle(), 
	             printEnPassant(), 
	             printHalfMove(), 
	             printFullMove()
	             ];
	
	this.write = function() {
		return parts.join(' ');
	}
	

}
