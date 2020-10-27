class Ray{
    constructor(pos, vec, intensity){
        this.pos = pos;
        this.vec = vec;
        this.intensity = intensity;
    }

    draw(){
    }
}

class Wall{
    constructor(a, b, absorptivity){
        this.a = a;
        this.b = b;
        this.absorptivity = absorptivity;
    }

    draw(){
        cd.line(this.a, this.b, "black", 1, 2);
    }
}

