function squareDistance(a, b){
    return Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2)
}

function findClosestPoint(point, pointList){
    closest = pointList[0];
    closestDist = squareDistance(point, pointList[0]);
    for (i = 1; i < pointList.length; i++){
        squareDist = squareDistance(point, pointList[i]);
        if (squareDist < closestDist){
            closest = pointList[i];
            closestDist = squareDist;
        } 
    }
    return closest;
}

class Wall{
    constructor(a, b, absorptivity = 1){
        this.a = a;
        this.b = b;
        this.vec = this.b.sub(this.a);
        this.absorptivity = absorptivity;
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
        cd.line(this.pos, this.intersection, "white", this.intensity, this.intensity);
    }

    intersectWall(wall){
        /*
        Returns Vec of point where ray intersects given wall or null if not.
        TODO: Lots of optimization required. Bounding boxes, quadtrees, checking intersections first.
        */
        let v1 = this.pos.sub(wall.a);
        let v3 = this.vec.normal();
        let t2 = (v1.dot(v3) / wall.vec.dot(v3));
        if (0 <= t2 && t2 <= 1){
            let t1 = (wall.vec.cross(v1) / wall.vec.dot(v3));
            if (t1 > 0){
                return wall.a.add(wall.vec.scale(t2));
            }
        }
        return null;
    }

    findClosestIntersection(walls){
        let intersections = [];
        for (let wall of walls){
            let intersection = this.intersectWall(wall);
            if (intersection){
                intersections.push(intersection);
            }
        }
        this.intersection = findClosestPoint(this.pos, intersections);
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
        let cosA = Math.cos(rotAngle);
        let sinA = Math.sin(rotAngle);
        let rotationMatrix = [[cosA, -sinA], [sinA, cosA]];
        let currentVec = new Vec(0, 1);
        for (let i = 0; i < this.nRays; i++){ //Creates all the new vectors by rotating currentVec with rotationMatrix
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