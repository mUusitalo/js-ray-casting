const canvas_id = "canvas";
//const canvas_size = [window.innerWidth, window.innerHeight];
const canvas_size = [1000, 1000];


class CanvasDrawer{
    constructor(canvas){
        this.canvas = canvas;
        this.canvas.width = canvas_size[0];
        this.canvas.height = canvas_size[1];
        this.ctx = canvas.getContext("2d");
        this.strokeEdges();
    }

    strokeEdges(){
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 1;
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
    }

    line(p1, p2, width = 1, strokeStyle = "#000000", alpha = 1.0){
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = Math.ceil(width);
        this.ctx.globalAlpha = alpha;
        this.ctx.moveTo(Math.floor(p1[0]), Math.floor(p1[1]));
        this.ctx.lineTo(Math.floor(p2[0]), Math.floor(p2[1]));
    }

    update(){
        this.ctx.stroke()
    }
};


cd = new CanvasDrawer(document.getElementById(canvas_id));
p1 = new Vec(50, 50);
p2 = p1.scale(10);
cd.line(p1, p2, 1);
cd.update();


