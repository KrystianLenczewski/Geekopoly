//CANVAS THINGS

let canvasWidth = 1800;
let canvasHeight = 1600;


//2D ARRAY THINGS - Play with the number of Cols and Rows
let arrayCols = 11;
let arrayRows = 11;

let initialPosX = 100;
let initialPosY = 100;

let rectWidth = 100;
let rectHeight = 100;
class field {

    contructor(id,valueX, valueY, name,width,height) {
        this.id = id;
        this.valueX = valueX;
        this.valueY = valueY;
        this.name = name;
        this.height = height;
        this.width = width;
    }
}


//create array for colors
let colors = [];
//define a gray color. Try a random(100,200)
let tileColor = 255;
// You can also create an array with a pre-define size 
// var colors = new array(10);

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background('white');

    for (var i = 0; i < arrayCols; i++) {
        //every colum is also an array
        colors[i] = [];
        for (var j = 0; j < arrayRows; j++) {
                       
            colors[i][j] = tileColor;
            var x = (i + 1) * initialPosX;
            var y = (j + 1) * initialPosY;
            if (i>=1 && i<=9 &&j>=1 &&j<=9) continue;
            else {
            fill(colors[i][j]);
                rect(x, y, rectWidth, rectHeight);
                for (var k = 0; k < 40; k++) {
                    var pola = new field(k, x, y,"" ,rectWidth,rectHeight);
                }
               
            fill(0);
            }
            
          
            text("START",  initialPosX+25 ,  initialPosY +55);
            text("STOP" ,  initialPosX+255 ,  initialPosY +55);
        }
    }
}
