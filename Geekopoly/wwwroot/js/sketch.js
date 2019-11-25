var flag = false;
var json_object;

window.fields = [];
window.properites = [];
window.categories = [];
var newtile = [];
window.players = [];
for (var i = 0; i < 40; i++) {
    window.fields[i] = { id_Field: 0, nameOfField2: ' ', TypeOfField: 0, Price: 0 };
}
for (i = 0; i < 28; i++) {
    window.properites[i] = { id_Property: 0, type_Of_Property: 0, owner_FK: 0, field_Fk: 0, category_FK: 0 };
}
for (i = 0; i < 9; i++) {
    window.categories[i] = { id_Category: 0, Name: '', entry_Value: 0, upgrade_Cost: 0 };
}

for (i = 0; i < 4; i++) {
    window.players[i] = { id_Player: 0, NameOfPlayer: '', AmountOfCash: 0, PositionPlayer: 0 };
}

var widthheight = 880;
var PlayerArray = [];
var FieldArray = [];
var CategoryArray = [];
var counters = [];

function preload() {

    let url = '/Boards/Json';
    httpGet(url, 'json', function (response) {
        flag = true;
        json_object = response;
        setup();
    });
}
var m = 0;

window.onload = function () {
    let bClick = document.getElementById("roll");
    bClick.onclick = function () {

        dice_roll();

    }
}

function setup() {
    createCanvas(1800, 1800);
    background(255);


    for (var i = 0; i < 3; i++) {

        for (var k = 0; k < 3; k++) {
            var x = (i + 4) * 255;
            var y = (k) * 225;
            newtile[m] = new category_class('', x, y, 150, 150, '', 0, 0, 0);

            m = m + 1;
        }
    }
    let b2 = 0;
    for (var i = 0; i < 2; i++) {
        for (k = 0; k < 2; k++) {
            var x = (i + 5) * 200;
            var y = (k + 6) * 110;
            PlayerArray[b2] = new Player(x, y, 100, 100, 0, '', 0, 0);
            b2 = b2 + 1;
        }
    }
    for (let i = 0; i < 40; i++) {

        FieldArray[i] = new Tile(0, 0, 0, 0, 0, '', 0, 0);
    }
    for (let i = 0; i < 9; i++) {
        CategoryArray[i] = new category_class('', 0, 0, 150, 150, '', 0, 0, 0);
    }

    if (flag) {
        for (let i = 0; i < 40; i++) {
            fields[i].nameOfField2 = json_object.field_list[i].name;
            fields[i].id_Field = json_object.field_list[i].id_field;
            fields[i].TypeOfField = json_object.field_list[i].field_type;

        }
        for (let i = 0; i < 4; i++) {
            players[i].id_Player = json_object.player_list[i].id_player;
            players[i].NameOfPlayer = json_object.player_list[i].name;
            players[i].AmountOfCash = json_object.player_list[i].amount_of_cash;
            players[i].PositionPlayer = json_object.player_list[i].position;

        }
        for (let i = 0; i < 28; i++) {
            properites[i].id_Property = json_object.property_list[i].id_property;
            properites[i].type_Of_Property = json_object.property_list[i].type_of_property;
            properites[i].owner_FK = json_object.property_list[i].ownerFK;
            properites[i].field_Fk = json_object.property_list[i].fieldFK;
            properites[i].category_FK = json_object.property_list[i].categoryFK;


        }
        for (let i = 0; i < 9; i++) {

            categories[i].id_Category = json_object.category_list[i].id_category;
            categories[i].Name = json_object.category_list[i].name;
            categories[i].entry_Value = json_object.category_list[i].entry_value;
            categories[i].upgrade_Cost = json_object.category_list[i].upgrade_cost;

        }

        for (let i = 0; i < 4; i++) {
            PlayerArray[i].id_Player = players[i].id_Player;
            PlayerArray[i].Name_Player = players[i].NameOfPlayer;
            PlayerArray[i].amount_Of_Cash = players[i].AmountOfCash;
            PlayerArray[i].Position = players[i].PositionPlayer;
        }


        for (let i = 0; i < 40; i++) {
            FieldArray[i].id_Field = fields[i].id_Field;
            FieldArray[i].nameOfField = fields[i].nameOfField2;
            FieldArray[i].TypeOfField = fields[i].TypeOfField;
        }

        for (let i = 0; i < 9; i++) {

            CategoryArray[i].id_Category = categories[i].id_Category;
            CategoryArray[i].nameOfCategory = categories[i].Name;
            CategoryArray[i].entry_Value = categories[i].entry_Value;
            CategoryArray[i].upgrade_Cost = categories[i].upgrade_Cost;
        }
        for (let i = 0; i < 40; i++) {
            if (FieldArray[i].TypeOfField == 4) {
                for (let k = 0; k < 28; k++) {
                    if (FieldArray[i].id_Field == properites[k].field_Fk) {
                        for (let c = 0; c < 9; c++) {
                            if (properites[k].category_FK == CategoryArray[c].id_Category) {
                                FieldArray[i].Price = CategoryArray[c].entry_Value;
                                break;

                            }

                        }
                    }
                }
            }
        }
        for (let k = 0; k < 9; k++) {
            let a = 0;
            newtile[k].nameOfCategory = CategoryArray[k].nameOfCategory;
            for (let z = 0; z < 28; z++) {
                if (CategoryArray[k].id_Category == properites[z].category_FK) {
                    for (let m = 0; m < 40; m++) {
                        if (properites[z].field_Fk == FieldArray[m].id_Field)
                            if (a <= 4) {
                                newtile[k].property1[a] = FieldArray[m].nameOfField;
                                a = a + 1;
                            }


                    }
                }

            }


        }



    }

    for (var i = 0; i < 11; i++) {

        var posX = map(i, 0, 11, 0, widthheight);


        FieldArray[i] = new Tile(posX, 0, 80, 80, FieldArray[i].id_Field, FieldArray[i].nameOfField, FieldArray[i].TypeOfField, FieldArray[i].Price);
    }

    var k = 10;
    for (var i = 0; i < 11; i++) {

        var posX = map(i, 0, 11, 0, widthheight);
        if (k < 21) {

            FieldArray[k] = new Tile(widthheight - 80, posX, 80, 80, FieldArray[k].id_Field, FieldArray[k].nameOfField, FieldArray[k].TypeOfField, FieldArray[k].Price);
            k = k + 1;

        }
    }
    var k2 = 30;
    for (var i = 0; i < 11; i++) {

        var posX2 = map(i, 0, 11, 0, widthheight);
        if (k2 >= 21) {

            FieldArray[k2] = new Tile(posX2, widthheight - 80, 80, 80, FieldArray[k2].id_Field, FieldArray[k2].nameOfField, FieldArray[k2].TypeOfField, FieldArray[k2].Price);
            k2 = k2 - 1;
        }
    }
    var k3 = 39;
    for (var i = 1; i < 11; i++) {

        var posY = map(i, 0, 11, 0, widthheight);

        if (k3 >= 30) {

            FieldArray[k3] = new Tile(0, posY, 80, 80, FieldArray[k3].id_Field, FieldArray[k3].nameOfField, FieldArray[k3].TypeOfField, FieldArray[k3].Price);
            k3 = k3 - 1;


        }
        var d2 = 0;
        for (let i = 0; i < 2; i++) {

            for (let z = 0; z < 2; z++) {
                let x = (i + 1) * 20;
                let y = (z + 2) * 20;
                counters[d2] = new Counter(x, y, 10, 10, 0, '', 0, 0, 0);
                d2 = d2 + 1;
            }
        }
        for (let i = 0; i < 4; i++) {
            counters[i].id_Player = players[i].id_Player;
            counters[i].Name_Player = players[i].NameOfPlayer;
            counters[i].amount_Of_Cash = players[i].AmountOfCash;
            counters[i].Position = players[i].PositionPlayer;
            counters[0].Color = 'RED';
            counters[1].Color = 'BLUE';
            counters[2].Color = 'YELLOW';
            counters[3].Color = 'BLACK';

        }
    }
}



function draw() {
  
    for (let i = 0; i < 40; i++) {
        FieldArray[i].show();
    }
    for (let k = 0; k < 9; k++) {
        newtile[k].show_tiles();
    }
    for (let j = 0; j < 4; j++) {
        PlayerArray[j].show_player();
    }
    for (let m = 0; m < 4; m++) {

        counters[m].show_counter(counters[m].Color);
    }
}



function dataPosted(result) {
   
    console.log(result);
}

function dataError(err) {
    console.log(err);
}

var response23;
function dice_roll() {
    let generated_numbers = this.numbers = Math.floor(Math.random() * 12) + 1;
    let json_data = { numbers: generated_numbers, decision_value: 999 };

    let url2 = '/Boards/Game';

    //httpPost(url2, 'json', json_data, function () {

    //    let url3 = '/Boards/Json';
    //    httpGet(url3, function (response2) {

    //        response23 = response2;
    //        dipslayPlayers();
    //        movePlayer(response23.board_list[0].current_player_index);
    //    });

    //}, dataPosted);

    //fetch(url2, {
    //    method: 'POST',
    //    headers: {
    //        'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify(data)
    //})
    //    .then(() => function () {
    //        httpGet('/Boards/Json', 'json', function (response) {
    //            get_response = response;
    //            dipslayPlayers();
    //            movePlayer(get_response.board_list[0].current_player_index);
    //        });
    //    });

    $.ajax({
        type: "POST",
        url: "/Boards/Game",
        data: JSON.stringify(json_data),
        contentType: "application/json",
        success: function () {
            let url3 = '/Boards/Json';
            httpGet(url3, 'json', function (response) {
                response23 = response;
                dipslayPlayers();
                movePlayer(response23.board_list[0].current_player_index);
            });
        },
        error: function (data) {
            console.log('Error: ' + data);
        }

    });
}

function movePlayer(Current) {
    let current_player = Current;
    let url4 = '/Boards/Json';
    httpGet(url4, 'json', function (response25) {
 
        move_pl(current_player);
    });
   
}
function move_pl(cur) {
    var player_ = cur;
    //player_ = player_ + 1;
    for (let i = 0; i < 4; i++) {
        for (let z = 0; z < 40; z++) {
            if (counters[i].id_Player == player_ && counters[i].Position == FieldArray[z].id_Field) {
              
                    counters[i].x = FieldArray[z].x + 10;
                    counters[i].y = FieldArray[z].y + 10;
                
               
                counters[i].show_counter(counters[i].Color);

                break;
            }
        }
        
    }
}




function dipslayPlayers() {
    for (var i = 0; i < 4; i++) {
        PlayerArray[i].id_Player = response23.player_list[i].id_player;
        PlayerArray[i].Name_Player = response23.player_list[i].name;
        PlayerArray[i].Position = response23.player_list[i].position;

    }
    for (var i = 0; i < 4; i++) {
        PlayerArray[i].show_player();
    }
}