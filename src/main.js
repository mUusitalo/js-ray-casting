const canvas_id = "myCanvas";
const fps = 144;
const nRays = 3000;
const nWalls = 10;
const wallMaxLen = 800;
const canvas_size = [1000, 1000];
var mspf = 1000 / fps;


var cd = new CanvasDrawer(document.getElementById(canvas_id));



class World{
    constructor(numOfRays = nRays, numOfWalls = nWalls, wallLen = wallMaxLen){
        this.lamp = new Lamp(numOfRays, undefined, 0.1);
        this.nWalls = numOfWalls;
        this.wallMaxLen = wallLen;
        this.walls = [];
        this.spawnWalls();
    }

    spawnEdgeWalls(){
        let topRight = new Vec(cd.canvas.width, 0);
        let topLeft = new Vec(0, 0);
        let bottomLeft = new Vec(0, cd.canvas.height);
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
        var fps = 1000 / (thisLoop - lastLoop);
        lastLoop = thisLoop;
        console.log(this.lamp.pos);
    }
}

function main(){
    updateInterval = window.setInterval("world.update()", mspf);
}

world = new World();
var lastLoop = new Date();
main();



