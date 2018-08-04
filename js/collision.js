//collision.js

/*
CHORE LIST:
-- Instead of return T/F, return point of collision or undefined
-- Add automatic detection and conversion of BBox to Polygon under a generic collision function
---- there should be 2 versions of thie generic function: one that returns owner, and one that returns both owner and point(s) of collision
-- Account for circular masks
-- Account for bbox masks
-- Add property that accounts for owner of masks/colliders, so we can do object-specific checking
*/

///// CIRCLE-BASED COLLISION
// This may be overkill, so we'll worry about this later. Worst case, we make a circular polygon mask

///// BOX-BASED COLLISION
// We'll use this to determine if object are even close enough to collide before checking masks.
// This will happen after we consult the collision tree

///// POINT-BASED COLLISION

//Collision points
function Point(xx,yy) {
	this.x = xx;
	this.y = yy;
}

	Point.prototype.translate = function(xx,yy) {
		this.x = xx;
		this.y = yy;
	}

//Collision mask
function Mask(p) {
	this.rawpoints = [];
	//if (p.constructor === Array) {
	//	this.points = p.slice();
	//} else {
		for (var _i = 0; _i < arguments.length; _i++) {
			this.rawpoints[_i] = new Point(arguments[_i][0], arguments[_i][1] ); //p[_i];
		}
	//}
	this.points = [];
	this.points = this.rawpoints.slice();
}

	Mask.prototype.update = function(xx,yy) {
		//var _r = this.rawpoints.slice();
		for (var _i=0; _i<this.rawpoints.length; _i++) {
			this.points[_i] = new Point( this.rawpoints[_i].x + xx, this.rawpoints[_i].y + yy);
		}
		//this.rawpoints = _r.slice();
	}

//Line-Line Collision
//Based on this solution: https://gamedev.stackexchange.com/questions/26004/how-to-detect-2d-line-on-line-collision
function collisionLineLine(pa, pb, pc, pd)
{
	var _d, _a, _b, _r, _s;
    _d = ((pb.x - pa.x) * (pd.y - pc.y)) - ((pb.y - pa.y) * (pd.x - pc.x));
    _a = ((pa.y - pc.y) * (pd.x - pc.x)) - ((pa.x - pc.x) * (pd.y - pc.y));
    _b = ((pa.y - pc.y) * (pb.x - pa.x)) - ((pa.x - pc.x) * (pb.y - pa.y));

    if (_d == 0) {
    	return (_a == 0 && _b == 0);
    }

    _r = _a / _d;
    _s = _b / _d;

    return ( (_r >= 0 && _r <= 1) && (_s >= 0 && _s <= 1) );
}

//Line against polygonal mask
function collisionLinePolygon(pa, pb, mask) {
	//use collisionLineLine, and collisionPointPolygon if lineline fails
	var _r = false;
	
	//Line-based
	for(var _i=0; _i<mask.points.length; _i++) {
		_r = collisionLineLine( pa, pb, mask.points[_i], mask.points[ (_i+1)%mask.points.length ] );
		if (_r) {
			return true; //change to be mask owner or something
		}
	}

	//Point-based
	//This is necessary in case the line itself is completely within the shape
	if (!_r) {
		return ( collisionPointPolygon(pa,mask) ? true : collisionPointPolygon(pb,mask) );
	}

	//In case we somehow get past the conditions above...
	return false;
}

//Polygons against eachother
function collisionPolygonPolygon(ma,mb) {
	var _r = false;
	for(var _i=0; _i<ma.points.length; _i++){
		_r = collisionLinePolygon(ma.points[_i], ma.points[ (_i+1)%ma.points.length ], mb);
		if (_r) {
			return true; //same note as collisionLineLine
		}	
	}
	for(var _i=0; _i<mb.points.length; _i++){
		_r = collisionLinePolygon(mb.points[_i], mb.points[ (_i+1)%mb.points.length ], ma);
		if (_r) {
			return true; //same note as collisionLineLine
		}	
	}
	return false;
}

//Point inside of a polygon
//Adapted from https://github.com/substack/point-in-polygon under MIT license
function collisionPointPolygon(p,mask){
    var x = p.x, y = p.y;
    var m = mask.points;
    var inside = false;
    for (var i = 0, j = m.length - 1; i < m.length; j = i++) {
        var xi = m[i].x, yi = m[i].y;
        var xj = m[j].x, yj = m[j].y;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

//Render collision mask
function drawMask(x,y,m,color) {

	var _c = ctx.strokeStyle;
	mask = m.points;

	if (arguments.length>3) {
		ctx.strokeStyle = getColorCode(color);
	}

	for(var _i=0; _i<mask.length; _i++){
		var _pa, _pb;
		_pa = mask[_i];
		_pb = mask[ (_i+1)%mask.length ];

		drawLine( _pa, _pb/*, [x,y]*/ );
	}

	ctx.strokeStyle = _c;
}