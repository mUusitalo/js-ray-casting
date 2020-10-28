const canvas_id = "myCanvas";
const fps = 144;
const nRays = 1000;
const nWalls = 10;
const wallMaxLen = 800;
const canvas_size = [1000, 1000];
var mspf = 1000 / fps;


var cd = new CanvasDrawer(document.getElementById(canvas_id));



class World{
    constructor(numOfRays = nRays, numOfWalls = nWalls, wallLen = wallMaxLen){
        this.lamp = new Lamp(numOfRays);
        this.nWalls = numOfWalls;
        this.wallMaxLen = wallLen;
        this.walls = [];
        this.spawnWalls();
    }

    spawnEdgeWalls(){
        let topRight = new Vec(cd.width, 0);
        let topLeft = new Vec(0, 0);
        let bottomLeft = new Vec(0, cd.height);
        let bottomRight = new Vec(cd.width, cd.height);
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
        cd.clear();
        for (let wall of this.walls){
            wall.draw()
        }
        cd.refresh()
        this.lamp.update();
        cd.refresh();
    }
}

function main(){
    updateInterval = window.setInterval("world.update()", mspf);
}

world = new World();
main();



