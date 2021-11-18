var $ = function(id){return document.getElementById(id)};

var canvas = new fabric.Canvas("canvas", {
    isDrawingMode: true
});
var currentBrushSize = 0;

var userDrawing = {}

canvas.setHeight(400);
canvas.setWidth(500);

function brushRed(){
    var brush = canvas.freeDrawingBrush;
    brush.color = "Red";
}
function brushOrange(){
    var brush = canvas.freeDrawingBrush;
    brush.color = "Orange";
}
function brushYellow(){
    var brush = canvas.freeDrawingBrush;
    brush.color = "Yellow";
}
function brushGreen(){
    var brush = canvas.freeDrawingBrush;
    brush.color = "Green";
}
function brushBlue(){
    var brush = canvas.freeDrawingBrush;
    brush.color = "Blue";
}
function increase_brush_size(){
    if (currentBrushSize == 100){
        return
    }
    currentBrushSize += 10;
    var brush = canvas.freeDrawingBrush;
    brush.width += 10;
}
function decrease_brush_size(){
    if(currentBrushSize == 10){
        return
    }
    currentBrushSize -= 10;
    var brush = canvas.freeDrawingBrush;
    brush.width -= 10;
}

function saveDrawing() {
    userDrawing = canvas.toJSON() 
}

function loadDrawing() {
    if (!userDrawing) {
        console.log('there is no drawing saved!');
    } else {
        canvas.loadFromJSON(userDrawing);
    }
}


