function squareDistance(a, b){
    return Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2)
}

class Wall{
    constructor(a, b, absorptivity = 1){
        this.a = a;
        this.b = b;
        this.absorptivity = absorptivity;
        this.vec = this.b.sub(this.a);
    }

    draw(){
        cd.line(this.a, this.b, "white", 1, 2);
    }
};

class Ray{
    constructor(pos, vec, intensity = 1){
        this.pos = pos;
        this.vec = vec;
        this.intensity = intensity;
        this.intersection = null;
    }

    draw(){
        cd.line(this.pos, this.intersection, "white", this.intensity);
    }

    intersectWall(wall){
        /*
        Returns Vec of point where ray intersects given wall or null if it doesn't.
        TODO: Lots of optimization required. Bounding boxes, quadtrees, checking intersections first.
        */
        let v1 = this.pos.sub(wall.a);
        let norm = this.vec.normal();
        let wallScale = (v1.dot(norm) / wall.vec.dot(norm));
        if (wallScale < 0 || wallScale > 1) return; // Line defined by ray doesn't intersect wall
        let rayScale = wall.vec.cross(v1) / wall.vec.dot(norm);
        if (rayScale > 0) return wall.a.add(wall.vec.scale(wallScale));
    }

    findIntersections(walls){
        return walls.map(wall => this.intersectWall(wall)).filter(Boolean);
    }

    findClosestIntersection(walls){
        let intersections = this.findIntersections(walls);
        this.intersection = intersections.reduce((function(prev, curr){
            return squareDistance(this.pos, prev) < squareDistance(this.pos, curr) ? prev : curr;
        }).bind(this));
    }

    update(){
        this.findClosestIntersection(world.walls);
        this.draw();
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
        let x = Math.cos(rotAngle);
        let y = Math.sin(rotAngle);
        let rotationMatrix = [[x, -y], [y, x]];
        let currentVec = new Vec(0, 1);
        for (let i = 0; i < this.nRays; i++){ //Creates all of the new vectors by rotating currentVec with rotationMatrix
            this.rays.push(new Ray(this.pos, currentVec, this.brightness));
            currentVec = currentVec.mrotate(rotationMatrix);
        }
    }

    update(){
        this.pos = cd.cursorPos;
        for (let ray of this.rays){
            ray.pos = this.pos;
            ray.update();
        }
    }
}