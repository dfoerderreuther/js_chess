var Tools = {

	copyBoard: function(boardIn) {
		var board = [];
		for (var y in boardIn) {
			var line = boardIn[y];
			board[y] = [];
			for (var x in line) {
				board[y][x] = line[x];
			}
		}
		return board;
	}, 

	getKnightSteps: function(fromx, fromy) {
		var off = Constants.knightSteps;
		var ret = [];
		for (var i in off) {
			var offstep = off[i];
			var step = [fromx - offstep[0], 1*fromy + offstep[1]];
			if (step[0] > 0 && step[0] < 8 && step[1] > 0 && step[1] < 8) {
				ret[ret.length] = { x: step[0], y: step[1] };
			}
		}
		return ret;
	}, 

	contains : function(array, element) {
		for (var i in array) {
			if (array[i] === element) {
				return true;
			}
		}
		return false;
	}, 

	getPosition: function(board, figure) {
		for (var y in board) {
			var line = board[y];
			for (var x in line) {
				if (line[x] === figure) {
					return {x: x, y: y}
				}
			}
		}
	}, 

	isWhite: function(letter) {
		return contains(Constants.whites, letter);
	}


}
