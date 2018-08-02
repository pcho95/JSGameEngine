// "Macros" (just constants, really)
/*#macro*/ EV_STEP =		0;
/*#macro*/ EV_DRAW =		1;
/*#macro*/ events  = 		[EV_STEP, EV_DRAW];

//Input Vars
holdLeft = holdRight = false;

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

	oPlayer = new Player(false);
	oPlayer2 = new Player(true);

	setInterval(update,1000/30);
	document.addEventListener("keydown",	keyDown);
	document.addEventListener("keyup",		keyUp);
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

	keyUpdate();
}

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





// Player 
function Player(lock) {
	this.x = 8 + lock;
	this.y = 17;
	this.lock = lock;
	this.priority = 1;
	this.depth = 0;
	this.sprite = new loadSprite("sOcto");
	structObj[ structObj.length ] = this;
} //OBJECT

	Player.prototype.evStep = function() {
		//this.x += 1.00 * (holdRight - holdLeft) * (this.lock==true);
		this.x = 8 + 16*(keyPress(39)||keyRelease(39));
		this.depth = this.x;
	}

	Player.prototype.evDraw = function() {
		this.sprite.draw(this.x,this.y);
	}

	Player.prototype.evDestroy = function() {
		delete this;
	}