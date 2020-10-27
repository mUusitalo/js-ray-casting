class Vec extends Array{
    //2D vector class with basic math operations.
    constructor(x, y){
        super(x, y);
        this.x = x;
        this.y = y;
    }

    add(other){
        //returns other vec added to this
        return new Vec(this[0] + other[0], this[1] + other[1]);
    }

    sub(other){
        //returns other vec substracted from this
        return new Vec(this[0] - other[0], this[1] - other[1]);
    }
    
    dot(other){
        //returns dot product of this and other vec
        return this[0]*other[0] + this[1]*other[1];
    }

    angle(other){
        //returns angle between this and other vec
        return Math.acos((this.dot(other)) / (this.mag()*other.mag()));
    }

    cross(other){
        //returns cross product of this and other vec
        return this.mag() * other.mag() * Math.sin(this.angle(other));
    }
    
    scale(scalar){
        //returns this multiplied (scaled) by scalar
        return new Vec(this[0] * scalar, this[1] * scalar);
    }

    divide(scalar){
        //returns this divided by scalar (scaled by inverse of scalar)
        return this.scale(1 / scalar);
    }

    mag(){
        //returns magnitude (length) of this
        return Math.sqrt(this.dot(this));
    }

    unit(){
        //returns unit vector of this (vector with same direction but length 1)
        mag = this.mag();
        return new Vec(this[0] / mag, this[1] / mag);
    }

    normal(){
        //returns this rotated by 90°
        return new Vec(this[1], -this[0])
    }
};