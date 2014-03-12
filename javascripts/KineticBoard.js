function KineticBoard(containerId, size, path, chess) {

	var images;

	var flipped = false;
	
	// rnbqkbnr
	var sources = {
		man_b : path + 'images/svg/Chess_bdt45.svg', // Bishop / Läufer
		man_B : path + 'images/svg/Chess_blt45.svg', 
		man_k : path + 'images/svg/Chess_kdt45.svg', // King / König
		man_K : path + 'images/svg/Chess_klt45.svg',
		man_n : path + 'images/svg/Chess_ndt45.svg', // Knight / Springer
		man_N : path + 'images/svg/Chess_nlt45.svg',
		man_p : path + 'images/svg/Chess_pdt45.svg', // Pawn / Bauer
		man_P : path + 'images/svg/Chess_plt45.svg',
		man_q : path + 'images/svg/Chess_qdt45.svg', // Queen / Königin
		man_Q : path + 'images/svg/Chess_qlt45.svg',
		man_r : path + 'images/svg/Chess_rdt45.svg', // Rook / Turm
		man_R : path + 'images/svg/Chess_rlt45.svg'
	};
	
	var chessmen = [];
	
	var $this = this;

	var promotionSelector;

	var imageLoader = new ImageLoader();
	imageLoader.onload = function() {
		$this.draw(this.images());
	}
	imageLoader.load(sources);

	this.draw = function(loadedImages) {
		images = loadedImages;
		drawPlaygroud();
		drawMen();
	}

	this.flip = function(flip) {
		flipped = flip;
	}
	
	function onChange() {
		// console.log('change');
		for (var i = 0; i < chessmen.length; i++) {
			chessmen[i].destroy();
		}
		chessmen = [];
		drawMen();
		if (promotionSelector && promotionSelector.getParent()) {
			promotionSelector.moveToTop();
		}
	}
	chess.addChangeCallback(onChange);

	var currentPromotion;
	var promotionHandler = function(promotion) {
		drawPromotionSelector(promotion);
		currentPromotion = promotion;
	}
	chess.setPromotionHandler(promotionHandler);

	var onPromotionSelect = function(letter) {
		promotionSelector.destroy();
		currentPromotion.convert(letter);
	}

	var drawPromotionSelector = function(promotion) {
		var group = new Kinetic.Group();
		promotionSelector = new Kinetic.Layer();

		var fog = new Kinetic.Rect({
			x: 0, y: 0, 
			width : size * 8, 
			height : size * 8, 
			opacity : 0.5,
			fill : 'white'
		});
		group.add(fog);

		var box = new Kinetic.Rect({
			x : size*2.5,
			y : size*3.5,
			width : size*4,
			height : size*1,
			stroke : 'black', 
			fill : 'white', 
			cornerRadius: 3
		});
		group.add(box);

		var selects = ['q', 'r', 'b', 'n'];
		for (var i in selects) {
			var letter = selects[i];
			if (promotion.isNextTurnWhite()) {
				letter = letter.toUpperCase();
			}

			var kimg = new Kinetic.Image({
				x : size*2.5 + size*i,
				y : size*3.5, 
				width : size,
				height : size,
				letter: letter, 
				image : images['man_' + letter]
			});
			kimg.on('click', function() {
				onPromotionSelect(this.attrs.letter);
			});
			group.add(kimg);
		}
		promotionSelector.add(group);
		stage.add(promotionSelector);
	}

	var stage = new Kinetic.Stage({
		container : containerId,
		width : size * 8,
		height : size * 8,
		x : 0,
		y : 0
	});

	function drawPlaygroud() {
		var xoff = 0;

		for (var y = 0; y < 8; y++) {
			for (var x = 0; x < 8; x++) {
				var box = new Kinetic.Rect({
					x : xoff + x * size,
					y : y * size,
					width : size,
					height : size,
					fill : ((x + 1) % 2 == y % 2) ? 'grey' : 'white'
				});
				var boxlayer = new Kinetic.Layer();
				boxlayer.add(box);
				stage.add(boxlayer);
			}
		}

		var box = new Kinetic.Rect({
			x : xoff,
			y : 0,
			width : (size * 8),
			height : (size * 8),
			stroke : 'black',
		});

		var boxlayer = new Kinetic.Layer();
		boxlayer.add(box);
		stage.add(boxlayer);
	}


	function drawMen() {
		var xoff = 0;

		var board = chess.getBoard();

		for (var y = 0; y < board.length; y++) {
			for (var x = 0; x < board[y].length; x++) {
				var letter = board[flipped ? 7 - y : y][flipped ? 7 - x : x];
				if (letter != '-') {
					var kimg = new Kinetic.Image({
						width : size,
						height : size,
						image : images['man_' + letter]
					});
					var layer = new Kinetic.Layer({
						type : letter,
						x : xoff + x * size,
						y : y * size,
						draggable : true,
						dragBoundFunc : dragbound
					});

					layer.on('dragstart', dragstart);
					layer.on('dragend', dragend);
					layer.add(kimg);

					stage.add(layer);
					chessmen[chessmen.length] = layer;
				}
			}
		}
	}
	var dragbound = function(pos) {
		var optx = Math.round(pos.x / size) * size;
		var opty = Math.round(pos.y / size) * size;
		var diff = Math.abs(optx - pos.x)
		+ Math.abs(opty - pos.y);
		if (diff < 20) {
			return {
				x : optx,
				y : opty
			}
		} else {
			return {
				x : pos.x,
				y : pos.y
			}
		}
	}
	
	var dragstart = function() {
		this.moveToTop();
		this.attrs.fromx = Math.round(this.attrs.x / size);
		this.attrs.fromy = Math.round(this.attrs.y / size);
	}
	
	var dragend = function() {
		var tox = Math.round(this.attrs.x / size);
		var toy = Math.round(this.attrs.y / size);
		this.setPosition({
			x : tox * size,
			y : toy * size
		});
		if (!chess.tryMove(this.attrs.fromx, this.attrs.fromy, tox, toy)) {
			console.log('back');
			this.setPosition({
				x : this.attrs.fromx * size,
				y : this.attrs.fromy * size
			});
		}
		stage.draw();
	}
}