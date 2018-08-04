//render.js
//lib specifically pertaining to the rendering of the canvas

function resizeCanvas(width, height, dWidth, dHeight) {
	//note: this clears the current render
	canv.width = width;
	canv.height = height;
	canv.style.width = dWidth;
	canv.style.height = dHeight;
}

function drawLine(a,b,c,d) {
	
	var _x = _y = _ax = _ay = _bx = _by = 0.0;

	//Args as points
	if ( (arguments.length == 2) || (arguments.length == 3) ) {
		_ax = arguments[0].x;
		_ay = arguments[0].y;
		_bx = arguments[1].x;
		_by = arguments[1].y;
	//Args as individual coords
	} else {
		_ax = arguments[0];
		_ay = arguments[1];
		_bx = arguments[2];
		_by = arguments[3];
	}

	if ( Array.isArray( arguments[arguments.length-1]) ) {
		_x = arguments[arguments.length-1][0];
		_y = arguments[arguments.length-1][1]; 
	}

	//Draw
	ctx.beginPath();
	ctx.moveTo(_ax + _x,_ay + _y);
	ctx.lineTo(_bx + _x,_by + _y);
	ctx.stroke();
	ctx.moveTo(0,0);
}

function drawSetColor(name) {
	/*
	var _c = "#FF0000";
	switch(name) {
		case 'white': 
			_c = "#FFFFFF"; break;
		case 'black': 
			_c = "#000000"; break;
		case 'red': 
			_c = "#EE2C2C"; break;
		case 'blue': 
			_c = "#1E90FF"; break;
		case 'green': 
			_c = "#00CD00"; break;
		case 'yellow': 
			_c = "#FFFF00"; break;
		case 'grey':
		case 'gray': 
			_c = "#BABABA"; break;
	}*/
	ctx.strokeStyle = getColorCode(name); /*_c;*/
}

function getColorCode(name) {
	var _c = "#000000";
	switch(name) {
		case 'white': 
			_c = "#FFFFFF"; break;
		case 'black': 
			_c = "#000000"; break;
		case 'red': 
			_c = "#EE2C2C"; break;
		case 'blue': 
			_c = "#1E90FF"; break;
		case 'green': 
			_c = "#00CD00"; break;
		case 'yellow': 
			_c = "#FFFF00"; break;
		case 'grey':
		case 'gray': 
			_c = "#BABABA"; break;
	}
	return _c;
}