//program.js

// THIS IS WHERE ALL PROJECT-SPECIFIC CODE SHOULD BE WRITTEN
// MOST OTHER FILES ARE SPECIFICALLY FOR ENGINE FUNCTIONS AND 
// MAY BREAK THE PROGRAM IF MODIFIED

progs = Object.freeze({
	"game":0,
	"pause":1
}) //for determining which part of the program should be running
prog = progs.game;

function gameStart() {
	//Runs at the very beginning of the program, before anything else happens
	oPlayer = instanceCreate(16,16,'Player');
	oBox = instanceCreate(80,40,'Box',[32,32]);//new Box( 80, 40, 32, 32);
}

function gameEnd() {
	//Closes the game
}