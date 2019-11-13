var flag = false;

$(document).ready(function () {
    //Call EmpDetails jsonResult Method
    $.getJSON("Boards/Json",
        function (json) {



            var tr;

            //Append each row to html table
            for (var i = 0; i < json.length; i++) {
                fields[i].nameOfField2 = json[i].name;
                fields[i].id_Field = json[i].id_field;
                fields[i].TypeOfField = json[i].field_type;
                tr = $('<tr/>');
                tr.append("<td>" + fields[i].id_Field + "</td>");
                tr.append("<td>" + fields[i].nameOfField2 + "</td>");
                tr.append("<td>" + fields[i].TypeOfField + "</td>");
                $('table').append(tr);
            }

            flag = true;
         

        });
});

window.fields = [];
            for (var i = 0; i < 40; i++) {
                window.fields[i] = { id_Field: 0, nameOfField2: ' ', TypeOfField: 0 }
}
var all_fields = [];




var tileRowUp = [];
var tileColLeft = [];
var tileColRight = [];
var tileRowdown = [];
 
function setup() {
    createCanvas(880, 880);
    background(255);
    
}

var k = 11;
var x = 80;
var pom = 0;
var pom1= 0;
function draw() {

    
        for (var i = 0; i < 11; i++) {

            var posX = map(i, 0, 11, 0, width);

            tileRowUp[i] = new Tile(posX, 0, x, x, fields[i].id_Field, fields[i].nameOfField2, fields[i].TypeOfField);

            //tileRowUp[i].show();

          


        }
    var k = 10;
    for (var i = 0; i < 11; i++) {

        var posX = map(i, 0, 11, 0, width);
        if (k < 21) {
            tileColRight[i] = new Tile(width - x, posX, x, x, fields[k].id_Field, fields[k].nameOfField2, fields[k].TypeOfField);
            k = k + 1;

        }
    }
    var k2 = 30;
    for (var i = 0; i < 11; i++) {

        var posX2 = map(i, 0, 11, 0, width);
        if (k2 => 21) {
            tileRowdown[i] = new Tile(posX2, height - x, x, x, fields[k2].id_Field, fields[k2].nameOfField2, fields[k2].TypeOfField);
            k2 = k2 - 1;
        }
    }
    var k3 = 39;
    for (var i = 1; i < 11; i++) {

        var posY = map(i, 0, 11, 0, height);

        if (k3 => 30) {
            tileColLeft[i] = new Tile(0, posY, x, x, fields[k3].id_Field, fields[k3].nameOfField2, fields[k3].TypeOfField);
            k3 = k3 - 1;
        }
      // tileColLeft[i].show();
    }

           
       
    if (flag) {
        while (pom < 40) {
            all_fields[pom] = new Tile(0, 0, 0, 0, 0, '', 0);
            pom = pom + 1;
        }
        
        
        for (var i = 0; i < 11; i++) {
          
            //all_fields.push(tileRowUp[i]);
            all_fields.splice(pom1, 1, tileRowUp[i]);
            pom1 = pom1 + 1;


        }
        
        
        for (var i = 1; i < 11; i++) {
          // all_fields[i] = new Tile(0, 0, 0, 0, 0, '', 0);
            //all_fields.push(tileColRight[i]);
            all_fields.splice(pom1, 1, tileColRight[i]);
            pom1 = pom1 + 1;

        }
        for (var i = 9; i >=0; i--) {
           //all_fields[i] = new Tile(0, 0, 0, 0, 0, '', 0);
            //all_fields.push(tileRowdown[i]);
            all_fields.splice(pom1, 1, tileRowdown[i]);
            pom1 = pom1 + 1;

        }
        for (var i = 9; i >=1; i--) {
           // all_fields[i] = new Tile(0, 0, 0, 0, 0, '', 0);
           // all_fields.push(tileColLeft[i]);
            all_fields.splice(pom1, 1, tileColLeft[i]);
            pom1 = pom1 + 1;

        }

        for (var i = 0; i < 40; i++) {
            all_fields[i].show();
        }
        flag = false;
    }
   
  
     

 
        
    
     //var posY = map(k, 0, 11, 0, height);
  //tileColLeft[k] = new Tile(0, posY, x, x, fields[zmienna].id_Field, fields[zmienna].nameOfField2, fields[zmienna].TypeOfField);

 
    

 
   

    


   // var mysteriousCard1 = new Tile(170, 190, 100, 100);


   // mysteriousCard1.show();

   // var mysteriousCard2 = new Tile(570, 490, 100, 100);
   // mysteriousCard2.show();
   // var dice = new Tile(390, 390, 50, 50);
   // dice.show();
   
    
}






   

