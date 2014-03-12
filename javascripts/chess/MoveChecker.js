function MoveChecker(chess, fromx, fromy, tox, toy) {
	
	var board = chess.getBoard();
	
	var moveFigure = board[fromy][fromx];
	var hitFigure = board[toy][tox];

	var rochade = new Rochade(chess, fromx, fromy, tox, toy);
	var enPassant = new EnPassant(chess, fromx, fromy, tox, toy);
	var promotion = new Promotion(chess, fromx, fromy, tox, toy);
	var check = new Check(chess);


	this.isAllowed = function() {
		var moveCheckMethods = [
				itsMyTurn, 
				itsAMove, 
				iCanHitThisColor, 
				moveInsideBoard, 
				iCanDoThisMove, 
				iCanWalkThisWay, 
				iDontGetCheck
			];
		for (var fi in moveCheckMethods) {
			if ( ! moveCheckMethods[fi]() ) {
				return false;
			}
		}
		return true;
	}


	this.move = function() {
		var resetHalfMoves = S('pP').contains(moveFigure) || hitFigure != '-';
		if (rochade.isRochade()) {
			rochade.doRochade();
		}
		if (enPassant.canHitEnPassant()) {
			enPassant.hitEnPassant();
			resetHalfMoves = true;
		}

		board[fromy][fromx] = '-';
		board[toy][tox] = moveFigure;

		rochade.checkDestroy();
		enPassant.enablingEnPassant();

		if ( ! promotion.conversion() ) {
			chess.moved(resetHalfMoves);	
		}	
	}

	
	var itsMyTurn = function() {
		if ((chess.isNextTurnWhite() && S(chess.blacks).contains(moveFigure))
				|| (!chess.isNextTurnWhite() && S(chess.whites).contains(moveFigure))) {
			console.log('its not my turn');
			return  false;
		}
		return true;
	}

	var itsAMove = function() {
		if (fromx == tox && fromy == toy) {
			console.log('its not a move');
			return  false;
		}
		return true;
	}

	var iCanHitThisColor = function() {
		if ((!chess.isNextTurnWhite() && S(chess.blacks).contains(hitFigure))
				|| (chess.isNextTurnWhite() && S(chess.whites).contains(hitFigure))) {
			console.log('can\'t hit own color');
			return  false;
		}
		return true;
	}
	
	var moveInsideBoard = function() {
		if (tox < 0 || toy < 0 || tox > 7 || toy > 7) {
			console.log('can\'t move outside');
			return  false;
		}
		return true;
	}
	
	var iCanDoThisMove = function() {
		var canDoThisMove = true;
		
		var difx = Math.abs(fromx - tox);
		var dify = Math.abs(fromy - toy);
		
		switch (moveFigure) {
		
		case 'b': // Bishop / Läufer 
		case 'B':
			if (difx != dify) {
				canDoThisMove = false;
			}
			break;
		
		case 'r': // Rook / Turm
		case 'R':
			if ((difx > 0 && dify > 0) || (difx == 0 && dify == 0)) {
				canDoThisMove = false;
			}
			break;
		
		case 'n': // Knight / Springer
		case 'N':
			if ( ! ((difx == 1 && dify == 2) || (difx == 2 && dify == 1))) {
				canDoThisMove = false;
			}
			break;
		
		case 'q': // Queen / Königin
		case 'Q':
			if ((difx != dify) && (difx > 0 && dify > 0) || (difx == 0 && dify == 0)) {
				console.log('queen fehler');	
				canDoThisMove = false;
			}
			break;
		
		case 'p': // Pawn / Bauer (schwarz)
			if (fromy - toy >= 0) {
				canDoThisMove = false;
			}
			if (difx > 1) {
				canDoThisMove = false;
			}
			if (difx == 1 && hitFigure == '-' && ! enPassant.canHitEnPassant()) {
				canDoThisMove = false;
			}
			if (fromy != 1 && dify > 1 || (fromy == 1 && dify > 2)) {
				canDoThisMove = false;
			}
			if (difx == 0 && hitFigure != '-') {
				canDoThisMove = false;
			}
			// todo vorbeigehen
			break;
			
		case 'P': // Pawn / Bauer (weiß)
			if (fromy - toy <= 0) {
				canDoThisMove = false;
			}
			if (difx > 1) {
				canDoThisMove = false;
			}
			if (difx == 1 && hitFigure == '-' && ! enPassant.canHitEnPassant()) {
				canDoThisMove = false;
			}
			if ((fromy != 6 && dify > 1) || (fromy == 6 && dify > 2)) {
				canDoThisMove = false;
			}
			if (difx == 0 && hitFigure != '-') {
				canDoThisMove = false;
			}
			// todo vorbeigehen
			break;
		
		case 'k': // King / König
		case 'K':
			if ((difx > 1 || dify > 1) && !rochade.isRochade()) {
				canDoThisMove = false;
			}
			break;

		default:
			break;
		}
		if (check.isCheckAfter(fromx, fromy, tox, toy) ) {
			console.log('cant move, getting check');
			canDoThisMove = false;
		}

		if (!canDoThisMove) {
			console.log('move not allowed');
			return  false;
		}
		return true;
	}
	
	var iCanWalkThisWay = function() {
		
		if (S('nN').contains(moveFigure)) return true; 
		
		var xRange = [fromx, tox];
		var yRange = [fromy, toy];
		
		var xSteps =  0;
		if (xRange[0] < xRange[1]) xSteps = 1;
		if (xRange[0] > xRange[1]) xSteps = -1;
		
		var ySteps =  0;
		if (yRange[0] < yRange[1]) ySteps = 1;
		if (yRange[0] > yRange[1]) ySteps = -1;
		
		var xWalk = xRange[0] + xSteps;
		var yWalk = yRange[0] + ySteps;
		
		while (xWalk != xRange[1] || yWalk != yRange[1]) {
			if (board[yWalk][xWalk] != '-') {
				//console.log('cant jump over ' + board[yWalk][xWalk] + ' on y' + yWalk + ' x' +xWalk);
				return  false;
			} else {
				//console.log('jump over ' + board[yWalk][xWalk] + ' on y' + yWalk + ' x' +xWalk);
				
			}
			xWalk += xSteps;
			yWalk += ySteps;
		}
		return true;
	}
	
	var iDontGetCheck = function() {
		// todo, Schachprüfung
		return true;
	}



}

