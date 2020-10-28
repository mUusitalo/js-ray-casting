const canvas_size = [1000, 1000];


class CanvasDrawer{
    constructor(canvas){
        this.canvas = canvas;
        this.canvas.width = canvas_size[0];
        this.canvas.height = canvas_size[1];
        this.ctx = canvas.getContext("2d");
        this.cursorPos = new Vec(0, 0);
        this.strokeEdges();
        this.canvas.addEventListener("mousemove", (evt) => this.calcCursorPos(evt)); //This is dumb. ("mousemove", this.calcCursorPos) doesn't work since "this" in this.calcCursorPos refers to the canvas???
    }

    strokeEdges(){
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 1;
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(p1, p2, strokeStyle = "#000000", alpha = 1.0, width = 1){
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.globalAlpha = alpha;
        this.ctx.lineWidth = Math.ceil(width);
        this.ctx.moveTo(Math.floor(p1[0]), Math.floor(p1[1]));
        this.ctx.lineTo(Math.floor(p2[0]), Math.floor(p2[1]));
    }

    calcCursorPos(event){
        var rect = this.canvas.getBoundingClientRect();
        this.cursorPos = new Vec(event.clientX - rect.left, event.clientY - rect.top);
    }

    clear(){
        this.ctx.fillStyle = "#ffffff";
        this.ctx.globalAlpha = 1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.strokeEdges();
    }

    update(){
        this.clear()
        this.ctx.stroke();
        this.ctx.fill();
    }
};