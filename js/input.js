//input.js

arrayInput = [];
arrayLastInput = [];

//Capture keyboard inputs
onkeydown = onkeyup = function(key) {
	arrayInput[key.keyCode] = key.type == 'keydown';
}

//Functions
function keyPress(key) {
	return ( (arrayInput[key]==true) && (arrayLastInput[key]==false) )
}

function keyRelease(key) {
	return ( (arrayInput[key]==false) && (arrayLastInput[key]==true) )
}

function keyHold(key) {
	return arrayInput[key];
}

function keyUpdate() {
	arrayLastInput = arrayInput.slice();
}