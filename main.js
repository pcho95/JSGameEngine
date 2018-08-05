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
/*#macro*/ EV_STEP 	=		0;
/*#macro*/ EV_DRAW 	=		1;
/*#macro*/ events  	= 		[EV_STEP, EV_DRAW];
/*#macro*/ fps		=		60;

//Input Vars
//holdLeft = holdRight = false;

//Objects
structObj = [];

forceCrash = false;

//Functions
window.onload = function() {
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");

	if (ctx === null) {
		console.log('WebGL not available!');
		return;
	}

	canv.width = 160;
	canv.height = 160;
	ctx.imageSmoothingEnabled = false;

	gameStart();

	setInterval(update,1000/fps);

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

		//Run the appropriate event
		for (var _j=0; _j < structObj.length; _j++) {
			objectEvent( structObj[_j], events[_i] );
		}

	}
	//Update keyboard inputs
	keyUpdate();
}



