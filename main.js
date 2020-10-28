const fps = 30;
var mspf = 1000 / fps;
const canvas_id = "myCanvas";

var cd = new CanvasDrawer(document.getElementById(canvas_id));
//console.log(cd);

function update(){
    cd.update();
}

function main(){
    updateInterval = window.setInterval("update()", mspf);
}

main();



