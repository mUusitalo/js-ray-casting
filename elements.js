
class Wall{
    constructor(a, b, absorptivity){
        this.a = a;
        this.b = b;
        this.vec = this.b - this.a
        this.absorptivity = absorptivity;
    }

    draw(){
        cd.line(this.a, this.b, "black", 1, 2);
    }
};

class Ray{
    constructor(pos, vec, intensity = 1){
        this.pos = pos;
        this.vec = vec;
        this.intersection = null;
        this.intensity = intensity;
    }

    draw(){
        cd.line(this.pos, this.intersection, alpha = this.intensity);
    }

    intersect_wall(wall){
        /*
        Returns Vec of point where rayintersects given wall or null if not.
        TODO: Lots of optimization required. Bounding boxes, quadtrees, checking intersections first.
        */
        let v1 = this.pos - wall.a;
        let v3 = this.vec.norm();
        let t2 = (v1.dot(norm) / wall.vec.dot(v3));
        if (0 <= t2 && t2 <= 1){
            let t1 = (wall.vec.cross(v1) / wall.vec.dot(v3));
            if (t1 > 0){
                return wall.a + t2 * wall.vec;
            }
        }
        return null;
    }
};

