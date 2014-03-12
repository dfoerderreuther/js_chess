function ChessLogger(chess) {
	
	var $this = this;
	
	var onChange = function() {
		$this.logBoard();
	}

	this.follow = function() {
		chess.addChangeCallback(onChange);
	}
	
	var flipped = false;
	
	this.flip = function(flip) {
		flipped = flip;
	}

	this.logBoard = function() {
		var board = chess.getBoard();
		this.logTestBoard(board);
	}

	this.logTestBoard = function(board) {
		var str = '';
		
		str += '   x | ';
		for (var x = 0; x < 8; x++) {
			str += ' ' + (flipped ? 7-x : x) + ' '
		}
		str += ' |   ';
		str += '\n';
		
		var ltr = 'ABCDEFGH';
		str += 'y    | ';
		for (var x = 0; x < 8; x++) {
			str += ' ' + ltr.charAt(flipped ? 7-x : x) + ' '
		}
		str += ' |   ';
		str += '\n';
		
		str += '-----+-';
		for (var x = 0; x < 8; x++) {
			str += '---'
		}
		str += '-+---';
		str += '\n';
		
		for (var y = 0; y < board.length; y++) {
			str += (flipped ? 7-y : y) + '  ' + (flipped ? y+1 : 8-y) + ' | ';
			for (var x = 0; x < board[y].length; x++) {
				str += ' ' + board[flipped ? 7-y : y][flipped ? 7-x : x] + ' ';
			}
			str += ' | ' + (flipped ? y+1 : 8-y) + ' ';
			str += '\n';
		}
		
		str += '-----+-';
		for (var x = 0; x < 8; x++) {
			str += '---'
		}
		str += '-+---';
		str += '\n';
		
		str += '     | ';
		for (var x = 0; x < 8; x++) {
			str += ' ' + (flipped ? 8-x : x+1) + ' '
		}
		str += ' |   ';
		str += '\n';
		
		str += 'Turn: ' + (chess.isNextTurnWhite()?'white':'black') + '\n';
		var castle = chess.getCastle();
		str += 'rochade: K: ' + castle.K + ', Q: ' + castle.Q + ', k: ' + castle.k + ', q: ' + castle.q + '\n';
		str += 'moves: ' + chess.getMoves() + '\n';
		str += 'halfMoves: ' + chess.getHalfMoves() + '\n';
		str += 'En Passant x: ' + chess.getEnpassant().x + ' y: ' + chess.getEnpassant().y + '\n';
		console.log(str);
	}
}