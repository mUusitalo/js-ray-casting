const RAY_DRAW_BRIGHTNESS_MULTIPLIER = 0.1;
const RAY_INTENSITY_CUTOFF = 0.01;
const INTERSECTION_TOLERANCE = 0.001;

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
    intensityCutoff = RAY_INTENSITY_CUTOFF;

    constructor(pos, vec, intensity = 1){
        this.pos = pos;
        this.vec = vec;
        this.intensity = intensity;
        this.intersection = null;
        this.intersectingWall = null;
    }


    drawDot(){
        //let line = this.intersection.sub(this.pos);
        cd.square(this.intersection, 10, "white", Math.sqrt(this.intensity) * RAY_DRAW_BRIGHTNESS_MULTIPLIER);
    }

    drawLine(){
        cd.line(this.pos, this.intersection, "white", Math.sqrt(this.intensity) * RAY_DRAW_BRIGHTNESS_MULTIPLIER);
    }

    draw(){
        this.drawLine();
    }

    intersectWall(wall){
        /*
        Returns Array(Vec of intersection point, wall) or null if Ray doesn't intersect it.
        TODO: Lots of optimization required. Bounding boxes, quadtrees, checking intersections first.
        */
        let v1 = this.pos.sub(wall.a);
        let norm = this.vec.normal();
        let wallScale = (v1.dot(norm) / wall.vec.dot(norm));
        if (wallScale < 0 || wallScale > 1) return; // Line defined by ray doesn't intersect wall
        let rayScale = wall.vec.cross(v1) / wall.vec.dot(norm);
        if (rayScale > 0) return [wall.a.add(wall.vec.scale(wallScale)), wall];
    }

    findIntersections(walls){
        return walls.map(wall => this.intersectWall(wall)).filter(Boolean);
    }

    reflect(intersectingWall){
        let newIntensity = this.intensity * (1 - intersectingWall.absorptivity);
        if (newIntensity < this.intensityCutoff) return;
        let wallNormalDirectionless = intersectingWall.a.sub(intersectingWall.b).normal().unit()
        let wallNormal = wallNormalDirectionless.dot(this.vec) > 0 ? wallNormalDirectionless : wallNormalDirectionless.scale(-1); // Makes sure that the wall's normal vector is facing the right way
        let reflectVec = this.vec.sub(wallNormal.scale(this.vec.dot(wallNormal) * 2));
        return new Ray(this.intersection.add(wallNormal.scale(INTERSECTION_TOLERANCE)), reflectVec, newIntensity);
    }

    cast(walls){
        let intersections = this.findIntersections(walls);
        let intersectingWall;
        [this.intersection, intersectingWall] = intersections.reduce((function(prev, curr){
            return squareDistance(this.pos, prev[0]) < squareDistance(this.pos, curr[0]) ? prev : curr;
        }).bind(this));
        return this.reflect(intersectingWall);
    }

};

class RayService{
    // Takes walls and rays and calculates the reflections
    constructor(walls){
        this.walls = walls;
        this.rays = []
    }

    addRays(rayList){
        this.rays = this.rays.concat(rayList);
    }

    clearRays(){
        this.rays = [];
    }

    cast(rayList){
        // Recursively casts rays and appends new ones to this.rays
        let newRays = rayList.map(ray => ray.cast(this.walls)).filter(Boolean);
        if (newRays.length === 0) return;
        this.rays = this.rays.concat(newRays);
        this.cast(newRays);
    }

    run(){
        this.cast(this.rays);
        for (let ray of this.rays){
            ray.draw();
        }
    }
}

class Lamp{
    constructor(nRays, pos = cd.cursorPos, brightness = 1, walls){ // Passing walls to the lamps is spagetti-y
        this.nRays = nRays;
        this.pos = pos;
        this.brightness = brightness;
        this.rayVectors = [];
        this.calculateRayVectors();
        this.rayService = new RayService(walls);
    }

    calculateRayVectors(){
        let rotAngle = (Math.PI * 2) / this.nRays;
        let x = Math.cos(rotAngle);
        let y = Math.sin(rotAngle);
        let rotationMatrix = [[x, -y], [y, x]];
        let currentVec = new Vec(0, 1);
        for (let i = 0; i < this.nRays; i++){ // Creates all of the new vectors by rotating currentVec with rotationMatrix
            this.rayVectors.push(currentVec);
            currentVec = currentVec.mrotate(rotationMatrix);
        }
    }

    spawn_rays(){
        let rayList = [];
        for (let vec of this.rayVectors){
            rayList.push(new Ray(this.pos, vec, this.brightness));
        }
        return rayList;
    }

    update(){
        this.pos = cd.cursorPos;
        this.rayService.clearRays();
        this.rayService.addRays(this.spawn_rays());
        this.rayService.run();
    }
}