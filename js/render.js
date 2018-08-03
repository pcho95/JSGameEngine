//render.js
//lib specifically pertaining to the rendering of the canvas

function resizeCanvas(width, height, dWidth, dHeight) {
	//note: this clears the current render
	canv.width = width;
	canv.height = height;
	canv.style.width = dWidth;
	canv.style.height = dHeight;
}