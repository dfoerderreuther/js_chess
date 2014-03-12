function ImageLoader() {
	
	var loading = {};
	var loadedImages = 0;
	var numImages = 0;
	var loader = this;
	// loadedImagesm of sources
	
	this.load = function(sources) {
		loading = {};
		loadedImages = 0
		numImages = 0;
		for ( var src in sources) {
			numImages++;
		}
		
		for (var src in sources) {
			loading[src] = new Image();
			loading[src].onload = function() {
				if (++loadedImages >= numImages) {
					loader.onload();
				}
			};
			loading[src].src = sources[src];
		}
	}
	
	this.images = function() {
		return loading;
	}
	
	this.onload = function() {
		console.log('unimplemented');
	}
}