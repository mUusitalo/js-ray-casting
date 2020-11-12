

class CanvasDrawer{
    constructor(canvas){
        this.canvas = canvas;
        this.canvas.width = CANVAS_SIZE[0];
        this.canvas.height = CANVAS_SIZE[1];
        this.ctx = canvas.getContext("2d");
        this.cursorPos = new Vec(this.canvas.width / 2, this.canvas.height / 2);
        this.canvas.addEventListener("mousemove", (evt) => this.calcCursorPos(evt)); //This is dumb. ("mousemove", this.calcCursorPos) doesn't work since "this" in this.calcCursorPos refers to the canvas???
    }

    line(p1, p2, strokeStyle = "#FFFFFF", alpha = 1.0, width = 1){
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.globalAlpha = alpha;
        this.ctx.lineWidth = width;
        this.ctx.moveTo(p1[0], p1[1]);
        this.ctx.lineTo(p2[0], p2[1]);
        this.ctx.stroke();
        //this.ctx.moveTo(Math.floor(p1[0]), Math.floor(p1[1])); //Floored coords should be faster but floats look so much better.
        //this.ctx.lineTo(Math.floor(p2[0]), Math.floor(p2[1]));
        //this.ctx.stroke(); //This is needed to make opacities work but it's super slow.
    }

    square(p1, size, fillStyle = "#FFFFFF", alpha = 1.0,){
        this.ctx.beginPath();
        this.ctx.fillStyle = fillStyle;
        this.ctx.globalAlpha = alpha;
        this.ctx.fillRect(p1[0] - (size / 2), p1[1] - (size / 2), size, size);
        this.ctx.fill();
    }

    calcCursorPos(event){
        var rect = this.canvas.getBoundingClientRect();
        this.cursorPos = new Vec(event.clientX - rect.left, event.clientY - rect.top);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
    }

    refresh(){
        this.ctx.globalAlpha = 1
        this.ctx.fillStyle = "#000000"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    }
};