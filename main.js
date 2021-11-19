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
    const drawingName = prompt('Give your picture a name');
    var userDrawing = canvas.toJSON();
    userDrawing = JSON.stringify(userDrawing)
    localStorage.setItem(drawingName, userDrawing)
    addOptionToSelector(drawingName)
}

function loadDrawing() {
    if (!userDrawing) {
        console.log('there is no drawing saved!');
    } else {
        canvas.loadFromJSON(userDrawing);
    }
}

function loadFromSelector(selected) {
    console.log(selected);
    store = window.localStorage
    var dataString =  store.getItem(selected)
    json = JSON.parse(dataString)
    canvas.loadFromJSON(json)
}

function addOptionToSelector(optName) {
    /**
     * add a single option to the dropdown menu
     * @ param {String} the name of a drawing
     */
     
    var sel = document.querySelector('#drawings');
    var opt = document.createElement('option');
        opt.value = optName;
        opt.innerHTML = optName;
        sel.appendChild(opt);
}

function populateSelector() {
    // populate the dropdown menu with the names of all of the drawings
    const storageKeys = Object.keys(localStorage); // get all the keys from local storage
    var sel = document.querySelector('#drawings');

    // Map all of the drawing names to an option in the dropdown  
    storageKeys.forEach((drawingName) => {
        var opt = document.createElement('option');
        opt.value = drawingName;
        opt.innerHTML = drawingName;
        sel.appendChild(opt);
    })
};


// functions to carry out once the window has loaded
window.onload = () => {
    populateSelector();
}


