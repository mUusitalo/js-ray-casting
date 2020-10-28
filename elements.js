
class Wall{
    constructor(a, b, absorptivity = 1){
        this.a = a;
        this.b = b;
        this.vec = this.b.sub(this.a);
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
        cd.line(this.pos, this.pos.add(this.vec.scale(300)), "black", 0.1, 1);
    }

    intersectWall(wall){
        /*
        Returns Vec of point where ray intersects given wall or null if not.
        TODO: Lots of optimization required. Bounding boxes, quadtrees, checking intersections first.
        */
        let v1 = this.pos.sub(wall.a);
        let v3 = this.vec.norm();
        let t2 = (v1.dot(norm) / wall.vec.dot(v3));
        if (0 <= t2 && t2 <= 1){
            let t1 = (wall.vec.cross(v1) / wall.vec.dot(v3));
            if (t1 > 0){
                return wall.a.add(wall.vec.scale(t2));
            }
        }
        return null;
    }

    findIntersection(walls){
        
    }
};

class Lamp{
    constructor(nRays, pos = cd.cursorPos, brightness = 1){
        this.nRays = nRays;
        this.pos = pos;
        this.brightness = brightness;
        this.rays = [];
        this.spawn_rays();
    }

    spawn_rays(){
        let rotAngle = (Math.PI * 2) / this.nRays;
        let cosA = Math.cos(rotAngle);
        let sinA = Math.sin(rotAngle);
        let rotationMatrix = [[cosA, -sinA], [sinA, cosA]];
        let currentVec = new Vec(0, 1);
        for (let i = 0; i < this.nRays; i++){ //Creates all the new vectors by rotating currentVec with rotationMatrix
            this.rays.push(new Ray(this.pos, currentVec, this.brightness));
            currentVec = currentVec.mrotate(rotationMatrix);
        }
    }

    draw(){
        for (let ray of this.rays){
            ray.draw();
        }
    }

    update(){
        this.pos = cd.cursorPos;
        for (let ray of this.rays){
            ray.pos = this.pos;
        }
        this.draw();
    }
}