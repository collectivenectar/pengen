// fabric.js initialization for free drawing
var canvas = new fabric.Canvas("canvas", {
    isDrawingMode: true
});

// Storing brush width as it's changed dynamically
var currentBrushSize = 5;

// initializing the iro.js ColorPicker object
var colorPicker = new iro.ColorPicker("#picker", {
    width: 110,
    color: "#AAA"
})

var userDrawing = {}
// checking the window orientation based on ratio, not device orientation
var mqportrait = window.matchMedia( "(orientation: portrait)" );

// at runtime, set the canvas size correlated to browser window size
setCanvasDimensions()
// if the window is resized after initialization
window.addEventListener("resize", setCanvasDimensions)

//When colorPicker has been used to change color, update brush color
colorPicker.on('color:change', function(color) {
    var brush = canvas.freeDrawingBrush;
    brush.color = color.hexString;
  });

//For setting canvas dimensions dynamically
function setCanvasDimensions(){
    //if orientation is portrait, canvas needs to be size differently
    if (mqportrait.matches){
        canvas.setHeight(window.innerHeight * 0.60);
        canvas.setWidth(window.innerWidth * 0.965);
    }
    else{
        canvas.setHeight(window.innerHeight * 0.70);
        canvas.setWidth(window.innerWidth * 0.70);
    }
}
// called by the range slider to adjust the brush size
function change_brush_size(slider_value){
    var brush = canvas.freeDrawingBrush;
    brush.width = parseInt(slider_value, 10) || 1;
}

function saveDrawing() {
    const drawingName = prompt('Give your picture a name');
    var userDrawing = canvas.toJSON();
    userDrawing = JSON.stringify(userDrawing)
    localStorage.setItem(drawingName, userDrawing)
    addOptionToSelector(drawingName)
    document.querySelector('.dropbtn').innerHTML = drawingName;
}

function loadDrawing() {
    if (!userDrawing) {
        console.log('there is no drawing saved!');
    } else {
        canvas.loadFromJSON(userDrawing);
    }
}



async function handleClickLoad(selected) {
    // load the selected drawing from the database
    console.log(selected);
    const baseURL = 'https://pengen.herokuapp.com/api/drawing?title=';
    let URL = baseURL.concat(selected);
    const response = await fetch(URL);
    const data = await response.json();
    const canvasData = data[0].dataURL;
    console.log(canvasData);
    canvas.loadFromJSON(canvasData);
    document.querySelector('.dropbtn').innerHTML = selected;

}

async function handleClickSave() {
    const url = 'https://pengen.herokuapp.com/api/drawings'; // url for heroku app
    const drawingName = prompt('Give your picture a name');

    if (drawingName != null) {
        let userDrawing = canvas.toJSON();
        userDrawing = JSON.stringify(userDrawing)

        let data = {
            'title': drawingName,
            'dataURL': userDrawing
        }

        const json = JSON.stringify(data)

        const response = await fetch(url, {
            method: 'POST',
            // mode: 'no-cors',
            'Access-Control-Allow-Origin': '*',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body: json,
        });
        document.querySelector('.dropbtn').innerHTML = drawingName;
        addOptionToSelector(drawingName);
    }
       
    
}

function addOptionToSelector(optName) {
    /**
     * add a single option to the dropdown menu
     * @ param {String} the name of a drawing
     */
     
    var sel = document.querySelector('#load');
    var opt = document.createElement('option');
        opt.value = optName;
        opt.innerHTML = optName;
        sel.appendChild(opt);
}

async function populateSelector() {
    // populate the dropdown menu with the names of all of the drawings
    console.log('fetching data...');
    const URL = 'https://pengen.herokuapp.com/api/drawings'
    const response = await fetch(URL);
    console.log(response.status);
    const data = await response.json(); // must use 'await' here or it won't work
    console.log(data);

    
    // Map all of the drawing names to an option in the dropdown  
    let sel = document.querySelector('#load');
    data.forEach((item) => {
        var opt = document.createElement('option');
        opt.value = item.title;
        opt.innerHTML = item.title;
        sel.appendChild(opt);
    })
};


// functions to carry out once the window has loaded
window.onload = () => {
    populateSelector();
}


