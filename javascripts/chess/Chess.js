function Chess() {

	var board;
	var nextTurnWhite = true;

	var castle = {K: true, Q: true, k: true, q: true};
	
	var enpassant = {x: '', y: ''};

	var halfMoves = 0;
	var moves = 1;

	this.whites = 'BKNPQR';
	this.blacks = 'bknpqr';

	var changeCallbacks = [];

	var promotionHandler = function(promotion) {
		promotion.convert('r');
	};

	this.getPromotionHandler = function() {
		return promotionHandler;
	}

	this.setPromotionHandler = function(callback) {
		promotionHandler = callback;
	}
	
	this.addChangeCallback = function(callback) {
		changeCallbacks[changeCallbacks.length] = callback;
	}

	this.isNextTurnWhite = function() {
		return nextTurnWhite;
	}

	this.getHalfMoves = function() {
		return halfMoves;
	}

	this.getMoves = function() {
		return moves;
	}

	this.getBoard = function() {
		return board;
	}

	this.getEnpassant = function() {
		return enpassant;
	}

	this.getCastle = function() {
		return castle;
	}

	this.open = function(fed) {
		create(fed);
	}

	this.tryMove = function(fromx, fromy, tox, toy) {
		var from = board[fromy][fromx];
		var to = board[toy][tox];
		console.log('move ' + 'fromx: ' + fromx + ' fromy: ' + fromy + ' tox: '
				+ tox + ' toy: ' + toy + ' | from: ' + from + ' | to: ' + to
				+ ' white? ' + nextTurnWhite);

		var moveChecker = new MoveChecker(this, fromx, fromy, tox, toy);

		// allowed move?
		if ( ! moveChecker.isAllowed())
			return false;

		moveChecker.move();
		nextTurnWhite = !nextTurnWhite;
		
		onChange();
		return true;
	}

	this.afterPromotion = function() {
		
		onChange();
	}

	this.moved = function(resetHalfMoves) {
		moves++;
		halfMoves++;
		if (resetHalfMoves) halfMoves = 0;
		testGameStatus();
	}

	init();

	var testGameStatus = function() {
		console.log('test game status (TODO)');
	}
	
	function onChange() {
		for (var i = 0; i < changeCallbacks.length; i++) {
			changeCallbacks[i]();
		}
	}

	function init() {
		create();
	}

	function create(fed) {
		console.log('create: fed ' + fed);
		var fedReader = new FedReader();
		if (fed) {
			fedReader.setFed(fed);
		}

		board = fedReader.getBoard();

		nextTurnWhite = fedReader.isNextTurnWhite();
		var ep = fedReader.getEnpassant();
		enpassant.x = ep.x;
		enpassant.y = ep.y;

		castle = fedReader.castle();

		halfMoves = fedReader.getHalfMoves();
		moves = fedReader.getMoves();

	}

}