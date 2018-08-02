//input.js

arrayInput = [];
arrayLastInput = [];

for (var _i=0; _i < 222; _i++) {
	arrayInput[_i] = false;
	arrayLastInput[_i] = false;
}

//Capture keyboard inputs


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
	onkeydown = onkeyup = function(key) {
		arrayInput[key.keyCode] = key.type == 'keydown';
	}
}