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
        return new Vec(this.x + other.x, this.y + other.y);
    }

    sub(other){
        //returns other vec substracted from this
        return new Vec(this.x - other.x, this.y - other.y);
    }
    
    dot(other){
        //returns dot product of this and other vec
        return this.x*other.x + this.y*other.y;
    }

    angle(other){
        //returns angle between this and other vec
        return Math.acos((this.dot(other)) / (this.mag()*other.mag()));
    }

    cross(other){
        //returns cross product of this and other vec
        return this.x*other.y - this.y*other.x;
    }
    
    scale(scalar){
        //returns this multiplied (scaled) by scalar
        return new Vec(this.x * scalar, this.y * scalar);
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
        let mag = this.mag();
        return new Vec(this.x / mag, this.y / mag);
    }

    normal(){
        //returns this rotated by 90°
        return new Vec(this.y, -this.x)
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