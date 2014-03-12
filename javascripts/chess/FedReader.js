function FedReader() {
	
	var parsefed = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	
	var parts;
	
	parse();
	
	this.setFed = function(fed) {
		parsefed = fed;
		parse();
	}
	
	function parse() {
		parts = parsefed.split(' ');
	}
	
	this.isNextTurnWhite = function() {
		return parts[1] == 'w';
	}
	
	this.castle = function() {
		return {
			K: S(parts[2]).contains('K'), 
			Q: S(parts[2]).contains('Q'), 
			k: S(parts[2]).contains('k'), 
			q: S(parts[2]).contains('q')
		};
	}

	this.getEnpassant = function() {
		if (parts[3] != '-') {
			var x = 'abcdefgh'.indexOf(parts[3].charAt(0));
			var y = 8 - (1*parts[3].charAt(1));
			return {x: x, y: y};
		}
		return {x: -1, y: -1};
	}

	this.getHalfMoves = function() {
		return parts[4] * 1;
	}

	this.getMoves = function() {
		return parts[5] * 1;
	}
	
	this.getBoard = function() {
		var fedPart = parts[0];
		
		var positions = fedPart;
		var replace = '';
		for (var i = 1; i <= 8; i++) {
			replace += '-';
			positions = S(positions).replaceAll('' + i, replace).s;
		}
		var lines = positions.split('/');
		
		var board = new Array(8);
		for (var y = 0; y < board.length; y++) {
			board[y] = new Array(8);
			for (var x = 0; x < board[y].length; x++) {
				board[y][x] = lines[y].charAt(x);
			}
		}
		return board;
	}
	

}
