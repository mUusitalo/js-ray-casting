const CANVAS_ID = "myCanvas";
const N_RAYS = 400;
const N_WALLS = 10;
const WALL_MAX_LEN = 800;
const CANVAS_SIZE = [1000, 1000];

var cd = new CanvasDrawer(document.getElementById(CANVAS_ID));

class World{
    constructor(numOfRays = N_RAYS, numOfWalls = N_WALLS, wallLen = WALL_MAX_LEN){
        this.lamp = new Lamp(numOfRays, undefined, 0.2);
        this.nWalls = numOfWalls;
        this.wallMaxLen = wallLen;
        this.walls = [];
        this.spawnWalls();
    }

    spawnEdgeWalls(){
        let topRight = new Vec(cd.canvas.width, -1);
        let topLeft = new Vec(-1, -1);
        let bottomLeft = new Vec(-1, cd.canvas.height);
        let bottomRight = new Vec(cd.canvas.width, cd.canvas.height);
        let top = new Wall(topRight, topLeft);
        let left = new Wall(topLeft, bottomLeft);
        let bottom = new Wall(bottomLeft, bottomRight);
        let right = new Wall(bottomRight, topRight);
        this.walls.push(top, left, bottom, right);
    }

    spawnWalls(){
        this.spawnEdgeWalls();
        for (let i = 0; i < this.nWalls; i++){
            let a = new Vec(Math.random() * cd.canvas.width, Math.random() * cd.canvas.height);
            let dir = Vec.random();
            let len = Math.random() * this.wallMaxLen;
            let b = a.add(dir.scale(len));
            this.walls.push(new Wall(a, b));
        }
    }

    update(){
        var thisLoop = new Date();
        cd.clear();
        for (let wall of this.walls){
            wall.draw();
        }
        cd.refresh()
        this.lamp.update();
        cd.refresh();
        let fps = 1000 / (thisLoop - lastLoop);
        lastLoop = thisLoop;
        console.log(fps);
        window.requestAnimationFrame(() => this.update());
    }
}


function main(){
    window.requestAnimationFrame(() => world.update());
}

world = new World();
var lastLoop = new Date();
main();