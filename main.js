var canvas = new fabric.Canvas("canvas", {
    isDrawingMode: true
});

var currentBrushSize = 5;

var colorPicker = new iro.ColorPicker("#picker", {
    width: 110,
    color: "#AAA"
})

var hex = colorPicker.color.hexString;
var userDrawing = {}

setCanvasDimensions()
window.addEventListener("resize", setCanvasDimensions)

//When colorPicker has been used to change color, update brush color
colorPicker.on('color:change', function(color) {
    var brush = canvas.freeDrawingBrush;
    brush.color = color.hexString;
  });

//For setting canvas dimensions dynamically
function setCanvasDimensions(){
    canvas.setHeight(window.innerHeight * 0.70);
    canvas.setWidth(window.innerWidth * 0.70);
}
function change_brush_size(slider_value){
    //When brush size slider is used, update brush size
    var brush = canvas.freeDrawingBrush;
    brush.width = parseInt(slider_value, 10) || 1;
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


