class Vec extends Array{
    //2D vector class with basic math operations.
    constructor(x, y){
        super(x, y);
    }

    get x(){
        return this[0];
    }

    set x(new_x){
        this[0] = new_x;
    }

    get y(){
        return this[1];
    }

    set y(new_y){
        this[1] = new_y;
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
        return this[0]*other[1] - this[1]*other[0];
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
    
    mrotate(matrix){
        //return new vector that is rotated with given rotation matrix
        return new Vec(this[0]*matrix[0][0] + this[1]*matrix[0][1],
                       this[0]*matrix[1][0] + this[1]*matrix[1][1]);
    }

    static random(){
        //returns random unit vector
        let angle = Math.random() * 2 * Math.PI;
        let x = Math.cos(angle);
        let y = Math.sin(angle);
        return new Vec(x, y);
    }
};