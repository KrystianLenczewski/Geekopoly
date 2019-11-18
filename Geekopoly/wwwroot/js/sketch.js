

var flag = false;

$(document).ready(function () {
    //Call EmpDetails jsonResult Method
    $.getJSON("/Boards/Json",
        function (json) {

            for (var i = 0; i < 40; i++) {
                fields[i].nameOfField2 = json.field_list[i].name;

                fields[i].id_Field = json.field_list[i].id_field;
                fields[i].TypeOfField = json.field_list[i].field_type;

            }
            for (var i = 0; i < 4; i++) {
                players[i].id_Player = json.player_list[i].id_player;
                players[i].NameOfPlayer = json.player_list[i].name;
                players[i].AmountOfCash = json.player_list[i].amount_of_cash;
                players[i].PositionPlayer = json.player_list[i].position;

            }
            for (var i = 0; i < 28; i++) {
                properites[i].id_Property = json.property_list[i].id_property;
                properites[i].type_Of_Property = json.property_list[i].type_of_property;
                properites[i].owner_FK = json.property_list[i].ownerFK;
                properites[i].field_Fk = json.property_list[i].fieldFK;
                properites[i].category_FK = json.property_list[i].categoryFK;


            }
            for (var i = 0; i < 9; i++) {

                categories[i].id_Category = json.category_list[i].id_category;
                categories[i].Name = json.category_list[i].name;
                categories[i].entry_Value = json.category_list[i].entry_value;
                categories[i].upgrade_Cost = json.category_list[i].upgrade_cost;

            }
            flag = true;


        }
    );






});

window.fields = [];
window.properites = [];
window.categories = [];
window.newtile = [];
window.players = [];
for (var i = 0; i < 40; i++) {
    window.fields[i] = { id_Field: 0, nameOfField2: ' ', TypeOfField: 0, Price: 0 }
}
for (i = 0; i < 28; i++) {
    window.properites[i] = { id_Property: 0, type_Of_Property: 0, owner_FK: 0, field_Fk: 0, category_FK: 0 }
}
for (i = 0; i < 9; i++) {
    window.categories[i] = { id_Category: 0, Name: '', entry_Value: 0, upgrade_Cost: 0 }
}

for (i = 0; i < 4; i++) {
    window.players[i] = {id_Player:0,NameOfPlayer:'',AmountOfCash:0,PositionPlayer:0}
}
window.all_fields = [];

var tileRowUp = [];
var tileColLeft = [];
var tileColRight = [];
var tileRowdown = [];
var widthheight = 880;
let initialPosX = 225;
let initialPosY = 225;
var PlayerArray = [];

var dice;
var dice_clicked = false;

var m = 0;
var n = 0;
var b = 0;
var counters = [];
var url = "/Boards/Game";

function setup() {
    createCanvas(1800, 1800);
    background(255);
   
    for (var i = 0; i < 3; i++) {

        for (var k = 0; k < 3; k++) {
            var x = (i + 4) * initialPosX;
            var y = (k) * initialPosY;
            newtile[m] = new category_class('', x, y, 150, 150,''); 
            
            m = m + 1; 
        }
    }
    for (var i = 0; i < 2; i++) {
        for (k = 0; k < 2; k++) {
            var x = (i + 5) * 200;
            var y = (k+6) * 110;
            PlayerArray[b] = new Player(x, y, 100, 100, 0, '', 0, 0);
            b = b + 1;
        }
    }
    for (var i = 0; i < 4; i++) {
        counters[i] = new Counter(0, 0, 0, 0, 0, '', 0, 0, '');
    }
    

}

var k = 11;
var x = 80;
var pom = 0;
var pom1 = 0;
var m2 = 0;   
function draw() {
    for (var i = 0; i < 4; i++) {
        PlayerArray[i].id_Player = players[i].id_Player;
        PlayerArray[i].Name_Player = players[i].NameOfPlayer;
        PlayerArray[i].amount_Of_Cash = players[i].AmountOfCash;
        PlayerArray[i].Position = players[i].PositionPlayer;
    }
    for (var i = 0; i < 4; i++) {
        counters[i].id_Player = players[i].id_Player;
        counters[i].Name_Player = players[i].NameOfPlayer;
        counters[i].amount_Of_Cash = players[i].AmountOfCash;
        counters[i].Position = players[i].PositionPlayer;
        counters[0].Color = 'RED';
        counters[1].Color = 'BLUE';
        counters[2].Color = 'YELLOW';
        counters[3].Color = 'DARK';
        
    }
    for (var k = 0; k < 9; k++) {
        var a = 0;
        newtile[k].nameOfCategory = categories[k].Name;
        for (var z = 0; z < 28; z++) {
            if (categories[k].id_Category == properites[z].category_FK) {
                for (var m = 0; m < 40; m++) {
                    if (properites[z].field_Fk == fields[m].id_Field)
                        if (a <= 4) {
                            newtile[k].property1[a] = fields[m].nameOfField2;
                                a = a + 1;
                        }
                      
                    
                }
            }
        
        }
       
        
    }

    for (var i = 0; i < 11; i++) {

        var posX = map(i, 0, 11, 0, widthheight);

        tileRowUp[i] = new Tile(posX, 0, x, x, fields[i].id_Field, fields[i].nameOfField2, fields[i].TypeOfField);

    }

    var k = 10;
    for (var i = 0; i < 11; i++) {

        var posX = map(i, 0, 11, 0, widthheight);
        if (k < 21) {
            tileColRight[i] = new Tile(widthheight - x, posX, x, x, fields[k].id_Field, fields[k].nameOfField2, fields[k].TypeOfField);
            k = k + 1;

        }
    }
    var k2 = 30;
    for (var i = 0; i < 11; i++) {

        var posX2 = map(i, 0, 11, 0, widthheight);
        if (k2 >= 21) {
            tileRowdown[i] = new Tile(posX2, widthheight - x, x, x, fields[k2].id_Field, fields[k2].nameOfField2, fields[k2].TypeOfField);
            k2 = k2 - 1;
        }
    }
    var k3 = 39;
    for (var i = 1; i < 11; i++) {

        var posY = map(i, 0, 11, 0, widthheight);

        if (k3 >= 30) {
            tileColLeft[i] = new Tile(0, posY, x, x, fields[k3].id_Field, fields[k3].nameOfField2, fields[k3].TypeOfField);
            k3 = k3 - 1;
        }

    }

    if (dice_clicked) {
        dice.dice_roll();
        dice.dice_clicked = false;
    }

    if (flag) {
        while (pom < 40) {
            all_fields[pom] = new Tile(0, 0, 0, 0, 0, '', 0, 0);
            pom = pom + 1;
        }


        for (var i = 0; i < 11; i++) {


            all_fields.splice(pom1, 1, tileRowUp[i]);
            pom1 = pom1 + 1;


        }


        for (var i = 1; i < 11; i++) {

            all_fields.splice(pom1, 1, tileColRight[i]);
            pom1 = pom1 + 1;

        }
        for (var i = 9; i >= 0; i--) {

            all_fields.splice(pom1, 1, tileRowdown[i]);
            pom1 = pom1 + 1;

        }
        for (var i = 9; i >= 1; i--) {

            all_fields.splice(pom1, 1, tileColLeft[i]);
            pom1 = pom1 + 1;

        }
        //   for (var i = 0; i < 40; i++) {
        //    if (all_fields[i].id_Field == 1 || all_fields[i].id_Field == 3 || all_fields[i].id_Field==4) {
        //        all_fields[i].Price = categories[0].entry_Value;

        //    }
        //    if (all_fields[i].id_Field == 6 || all_fields[i].id_Field == 7 || all_fields[i].id_Field == 9) {
        //        all_fields[i].Price = categories[1].entry_Value;

        //    }
        //    if (all_fields[i].id_Field == 5 || all_fields[i].id_Field == 15 || all_fields[i].id_Field == 25 || all_fields[i].id_Field==35) {
        //        all_fields[i].Price = categories[8].entry_Value;

        //    }

        //}
        for (var i = 0; i < 40; i++) {
            if (all_fields[i].TypeOfField == 4) {
                for (var k = 0; k < 28; k++) {
                    if (all_fields[i].id_Field == properites[k].field_Fk) {
                        for (var c = 0; c < 9; c++) {
                            if (properites[k].category_FK == categories[c].id_Category) {
                                all_fields[i].Price = categories[c].entry_Value;
                                break;

                            }

                        }
                    }
                }
            }
        }
        for (var i = 0; i < 40; i++) {
            all_fields[i].show();
        }
        for (var i = 0; i < 9; i++) {
            newtile[i].show_tiles();
        }
        for (var i = 0; i < 4; i++) {
            PlayerArray[i].show_player();
        }

        dice = new Dice(350, 350, 150, 150);
        dice.show_dice();
        flag = false;
    }
}

function mousePressed() {
    dice.dice_pressed();

}


function dataPosted(result) {
    console.log(result);
}

function dataError(err) {
    console.log(err);
}

