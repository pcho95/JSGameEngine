//Error Checking
function imageExists(imageObj){
  	return imageObj.complete && imageObj.naturalHeight !== 0;
}

mapSprite = new Map();

//Sprite Object
function Sprite( name ){
    this.load( name );  
    this.isLoaded = false;
} //SUB OBJECT

	Sprite.prototype.load = function(name){
	    this.image = new Image();
	    this.image.src = "img/" + name + ".png";

	    //Crash on failure to load an image
		this.image.onerror = function() {
	    	console.log("ERROR: Failed to load sprite: " + name );
	    	forceCrash = true;
		}
	}

	Sprite.prototype.draw = function(cx,cy){
	    ctx.drawImage(this.image, cx, cy);
	    //ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.x, this.y );
	}


//Sprite Loading (To prevent duplicates in memory)
function loadSprite( name ) {
	var _s;
	if (mapSprite.get(name) === undefined) {
		_s = new Sprite(name);
		mapSprite.set(name,_s);
	} else {
		_s = mapSprite.get(name);
	}
	return _s;
}