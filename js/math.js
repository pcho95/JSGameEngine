//math.js

function degToRad(theta) {
  return ( theta * (Math.PI / 180) );
}

function dsin(theta) {
	return (Math.sin(degToRad(theta)));
}

function dcos(theta) {
	return (Math.cos(degToRad(theta)));
}