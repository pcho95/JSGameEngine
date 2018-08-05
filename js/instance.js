//instance.js
//Instances are objects that exist within the gameworld and run code of their own on a per-update basis

//DO NOT MODIFY THIS PORTION OF THE CODE

instanceMap = new Map();
instanceID = 0;

//Create a copy of an object in-game
function instanceCreate(xx, yy, obj, param) {
	var _o = new window[obj](param);
	_o.x = xx;
	_o.y = yy;
	_o.rotation = 0.0;
	_o.scale = 1.0;

	var _n = instanceMap.get(obj);
	if (_n === undefined) {
		_n = [];
	}
	_n[ _n.length ] = _o;
	instanceMap.set(obj,_n);

	structObj[ structObj.length ] = _o;

	//console.log(instanceMap);
	return _o;
}

//Runs a provided operation on all instances of an object
function forAll(object, func, ret) {
	var _ol = instanceMap.get(object);
	var _r = false;
	for (var _i=0; _i<_ol.length; _i++) {
		_r = func( _ol[_i] );
		if (ret && ( _r !== null ) ) {return _r};
	}
	return null;
}

// NOTHING BEFORE THIS POINT SHOULD BE MODIFIED FOR THE PROGRAM
// BEYOND THIS POINT, OBJECTS CAN BE DEFINED FOR THE PROGRAM

// Player
function Player() {
	this.ID = instanceID++;

	this.x = this.y = 0.0;
	this.hsp = this.vsp = 0.0;
	this.priority = 1;
	this.depth = 0;
	this.sprite = new loadSprite("sOcto");
	this.mask = new Mask( this, [0,0], [8,0], [4, -2], [2, -4], [0, -8] );

	return this;
} 

	Player.prototype.evStep = function() {
		//this.x += 1.00 * (holdRight - holdLeft) * (this.lock==true);

		//this.hsp = keyPress(39) ? 2.0 : Math.max(this.hsp-0.2, 0);
		//Update horizontal and vertical speed based on input, or lackthereof
		this.hsp = ( keyHold(37) || keyHold(39) ) ? 1.0*(keyHold(39)-keyHold(37)) : Math.sign(this.hsp)*Math.max( Math.abs(this.hsp)-0.2, 0);
		this.vsp = ( keyHold(38) || keyHold(40) ) ? 1.0*(keyHold(40)-keyHold(38)) : Math.sign(this.vsp)*Math.max( Math.abs(this.vsp)-0.2, 0);

		if (keyPress(32)) {
			resizeCanvas(80,80,160,160);
		}

		this.x += this.hsp;//= 8 + 16*(keyPress(39)||keyRelease(39));
		this.y += this.vsp;
		this.depth = this.y;

		this.mask.update(this.x,this.y);
	}

	Player.prototype.evDraw = function() {
		//this.sprite.draw(this.x,this.y);
		drawSetColor( 'red');
		//if (collisionPolygonPolygon(this.mask, structObj[1].mask)) {
		if (collisionObject(this,'Box')) {
			drawSetColor( 'green');
		}
		//drawLine( 0, 0, this.x, this.y );
		//console.log(this.mask)
		drawMask( this.x, this.y, this.mask );
	}

	Player.prototype.evDestroy = function() {
		delete this;
	}

// Box 
function Box(arr) {

	var aa = arr[0];
	var bb = arr[1];

	this.ID = instanceID++;

	this.x = this.y = 0.0;
	this.priority = 2;
	this.depth = 0;
	this.mask = new Mask( this, [0,0], [aa,0], [aa, bb], [0,bb] );

	return this;
}

	Box.prototype.evStep = function() {
		this.depth = this.y;
		this.mask.update(this.x,this.y);
		this.rotation += ( 0.2 + 1.0*(keyHold(68)-keyHold(65)) );
		this.scale += 0.01*(keyHold(87)-keyHold(83));
	}

	Box.prototype.evDraw = function() {
		drawSetColor( 'yellow');
		//if (collisionPolygonPolygon(this.mask, structObj[0].mask)) {
		if (collisionObject(this,'Player')){
			drawSetColor( 'blue');
		}
		drawMask( this.x, this.y, this.mask );
	}

	Box.prototype.evDestroy = function() {
		delete this;
	}

//Parent Map
parentMap = new Map();
//format : < object, theParentOfThatObject >
parentMap.set('Player', null );
parentMap.set('Box', 'Player' );

//Child Map
//Automatically populate the map based on pre-defined parentage
childMap = new Map();
var _m = Array.from(parentMap.keys());
//console.log(_m);
for (var _i=0; _i<_m.length; _i++) {
	var _key = _m[_i];
	var _val = parentMap.get(_key);

	//Skip if there is no parent for this object
	if (_val === null) {
		continue;
	}

	var _children = [];
	var _v = childMap.get(_val);
	if (_v !== undefined) {
		_children = _v.slice();
	}
	_children[_children.length] = _key;
	childMap.set( _val, _children.slice() )
}
//console.log(childMap);