/// PAUL CHO & CHRIS KING, 2018
/*
CHORES:

CORE:
-- Create a masking and collision detection lib, line-based (sprite based is... okay, but it requires more memory. Math based is better, afaik.)
-- Create a mouse-detection system that functions either within or akin to our already-existing INPUT.JS

HOUSEKEEPING: (less important tasks)
-- (maybe) convert display to WebGL (shaders are nice to have)
-- Figure out less intense solution to object sorting (2 sorts, 60 times a second?? We can do better, I'm sure.)
-- Figure out how to limit the amount of any one sound playing. Non-essential, but something I've wanted built-in to other engines.
-- Rename anything that seems silly or irresponsibly named at the moment, like "structObj." That name is a bit vague.
*/

//deleteme: testing the webhook


// "Macros" (just constants, really. I'll figure out something more elegant for this later.)
/*#macro*/ EV_STEP =		0;
/*#macro*/ EV_DRAW =		1;
/*#macro*/ events  = 		[EV_STEP, EV_DRAW];

//Input Vars
//holdLeft = holdRight = false;

//Objects
structObj = [];

forceCrash = false;

//Functions
window.onload = function() {
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	canv.width = 160;
	canv.height = 160;
	ctx.imageSmoothingEnabled = false;

	oPlayer = new Player(16,16);

	setInterval(update,1000/60);
	//document.addEventListener("keydown",	keyDown);
	//document.addEventListener("keyup",		keyUp);
}

//Event Run
function objectEvent(obj, event) {
	switch(event) {

		//Step Event
		case EV_STEP:
			//Main Step
			if (typeof obj.evStep === 'function') {
				obj.evStep();
			} break;

		//Draw Event
		case EV_DRAW:
			//Draw
			if (typeof obj.evDraw === 'function') {
				obj.evDraw();
			} break;

		//Destroy Event
		case EV_DESTROY:
			//Draw
			if (typeof obj.evDestroy === 'function') {
				obj.evDestroy;
			}else{ delete obj } break; //Destroy if event doesn't exist
	}
}



//Game Loop
//This function is called every "step"
//And calls each objects individual events as needed
function update() {

	if (forceCrash) {
		document.getElementById("report").innerHTML = "APPLICATION CRASHED. VIEW CONSOLE FOR MORE INFO";
		return;
	}

	//Clear Display
	/////canvas2D
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);

	//webgl
	  // Set clear color to black, fully opaque
	//  ctx.clearColor(0.0, 0.0, 0.0, 1.0);
	  // Clear the color buffer with specified clear color
	//  ctx.clear(ctx.COLOR_BUFFER_BIT);

	//Run All Events
	for (var _i=0; _i < events.length; _i++) {
		switch(events[_i]) {
			//For step, run in order of priority
			case EV_STEP:
				structObj.sort(function(a,b){
					return (a.priority - b.priority);
			}); break;
			//For draw, run in order of depth
			case EV_DRAW:
				structObj.sort(function(a,b){
					return (b.depth - a.depth);
			}); break;
		}
		for (var _j=0; _j < structObj.length; _j++) {
			objectEvent( structObj[_j], events[_i] );
		}
	}
	//Update keyboard inputs
	keyUpdate();
}
/*
//Key Press
function keyDown(evt) {
	switch(evt.key) {
		case "ArrowLeft":
			holdLeft=true;
			break;
		case "ArrowUp":
			var _s = new sound("sfxTest");
			_s.play();
			//_s.loop(true);
			break;
		case "ArrowRight":
			holdRight=true;
			break;
	}
} //returns NOTHING

//Key Release
function keyUp(evt) {
	switch(evt.keyCode) {
		case 37:
			holdLeft=false;
			break;
		case 39:
			holdRight=false;
			break;
	}
} //returns NOTHING
*/




// Player 
function Player(xx,yy) {
	this.x = xx; //+ lock;
	this.y = yy;
	this.hsp = 0;
	this.vsp = 0;
	this.priority = 1;
	this.depth = 0;
	this.sprite = new loadSprite("sOcto");
	structObj[ structObj.length ] = this;
} //OBJECT

	Player.prototype.evStep = function() {
		//this.x += 1.00 * (holdRight - holdLeft) * (this.lock==true);

		//this.hsp = keyPress(39) ? 2.0 : Math.max(this.hsp-0.2, 0);
		//Update horizontal and vertical speed based on input, or lackthereof
		this.hsp = ( keyPress(37) || keyPress(39) ) ? 2.0*(keyPress(39)-keyPress(37)) : Math.sign(this.hsp)*Math.max( Math.abs(this.hsp)-0.2, 0);
		this.vsp = ( keyPress(38) || keyPress(40) ) ? 2.0*(keyPress(40)-keyPress(38)) : Math.sign(this.vsp)*Math.max( Math.abs(this.vsp)-0.2, 0);

		if (keyPress(32)) {
			resizeCanvas(80,80,160,160);
		}

		this.x += this.hsp;//= 8 + 16*(keyPress(39)||keyRelease(39));
		this.y += this.vsp;
		this.depth = this.y;
	}

	Player.prototype.evDraw = function() {
		this.sprite.draw(this.x,this.y);
	}

	Player.prototype.evDestroy = function() {
		delete this;
	}