//collision.js

/*
CHORE LIST:
-- Instead of return T/F, return point of collision or undefined
-- Add automatic detection and conversion of BBox to Polygon under a generic collision function
---- there should be 2 versions of thie generic function: one that returns owner, and one that returns both owner and point(s) of collision
-- Account for circular masks
-- Account for bbox masks
*/

///// CIRCLE-BASED COLLISION

///// BOX-BASED COLLISION

///// POINT-BASED COLLISION

//Collision points
function Point(xx,y) {
	this.x = xx;
	this.y = yy;
}

	Point.prototype.translate = function(xx,yy) {
		this.x = xx;
		this.y = yy;
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
}

//Polygons against eachother
function collisionPolygonPolygon(ma,mb) {
	//use collisionLinePolygon
}

//Point inside of a polygon
function collisionPointPolygon(p,m){

}