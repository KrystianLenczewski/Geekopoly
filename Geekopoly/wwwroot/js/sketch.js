var flag = false;
var json_object;

window.fields = [];
window.properites = [];
window.categories = [];
var newtile = [];
var popup_open = false;
window.players = [];
window.mysterious_cards = [];

var checkbox1;
var checkbox2;
var checkbox3;
var is_decision_made = false;

var text_box;
var popup_background;

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
    window.players[i] = { id_Player: 0, NameOfPlayer: '', AmountOfCash: 0, PositionPlayer: 0,is_Active:1 };
}
for (i = 0; i < 10; i++) {
    window.mysterious_cards[i] = { id_MysteriousCard: 0, Description: '', Reward: 0 };
}

var widthheight = 990;
var PlayerArray = [];
var FieldArray = [];
var CategoryArray = [];
var counters = [];

var current_player;
var current_field;
var decision;
var current_mysterious_card;
var m = 0;

function preload() {
    let url = '/Boards/Json';

    httpGet(url, 'json', function (response) {
        flag = true;
        json_object = response;
        replace_setup();
    });
}



window.onload = function () {

    decision = -1;
    let bClick = document.getElementById("roll");
    document.getElementById("roll").style.background = '#FFFFFF';

    bClick.onclick = function () {

        document.getElementById("upgrade").disabled = false;
        document.getElementById("roll").disabled = false;
        document.getElementById("lucky6").disabled = false;
        document.getElementById("pay_prison_penalty").disabled = false;
        document.getElementById("buy").disabled = false;
        document.getElementById("ok").disabled = false;

        dice_roll();

    };

    let buyButton = document.getElementById("buy");
    document.getElementById("buy").style.background = '#FFFFFF';
    buyButton.onclick = function () {
      
        document.getElementById("roll").disabled = false;
        document.getElementById("buy").disabled = true;
        document.getElementById("ok").disabled = true;

       
        document.getElementById("ok").style.background = '#FFFFFF';
        document.getElementById("buy").style.background = '#FFFFFF';

        let property;
        let category;

        for (let i = 0; i < properites.length; i++) {
            if (properites[i].field_Fk === current_field.id_Field) {
                property = properites[i];
            }
        }

        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id_Category === property.category_FK) {
                category = categories[i];
            }
        }
        if (property.owner_FK === null) {
            if (this.player_cash < category.entry_Value) {
                decision = 0;
            }
            else {
                decision = 1;
            }
        }
        else {
            decision = 0;
        }
        popup_background.remove();
        let json_data = { numbers: -1, decision_value: decision, mysterious_card_number: current_mysterious_card };
        $.ajax({
            type: "POST",
            url: "/Boards/Game",
            data: JSON.stringify(json_data),
            contentType: "application/json",
            success: function () {
                httpGet('/Boards/Json', 'json', function (response) {
                    json_object = response;
                    loadData();
                    assign_property_to_player();
                });
            }
        });
    };

    let upgradeButton = document.getElementById("upgrade");
    document.getElementById("upgrade").style.background = '#FFFFFF';
    upgradeButton.onclick = function () {
        document.getElementById("ok").style.background = '#FFFFFF';
        document.getElementById("upgrade").style.background = '#FFFFFF';
        document.getElementById("roll").disabled = false;
        document.getElementById("lucky6").disabled = true;
        document.getElementById("pay_prison_penalty").disabled = true;
        document.getElementById("buy").disabled = true;
        document.getElementById("ok").disabled = true;
        document.getElementById("upgrade").disabled = true;

        let property;
        let category;

        for (let i = 0; i < properites.length; i++) {
            if (properites[i].field_Fk === current_field.id_Field) {
                property = properites[i];
            }
        }

        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id_Category === property.category_FK) {
                category = categories[i];
            }
        }

        if (property.owner_FK === current_player.id_player && property.type_Of_Property < 3) {

            if (current_player.amount_of_cash > category.upgrade_Cost) {
                decision = 2;
            }
            else {
                decision = 0;
            }
        }
        else {
            decision: 0;
        }
        popup_background.remove();
        let json_data = { numbers: -1, decision_value: decision, mysterious_card_number: current_mysterious_card };
        $.ajax({
            type: "POST",
            url: "/Boards/Game",
            data: JSON.stringify(json_data),
            contentType: "application/json",
            success: function () {
                let url3 = '/Boards/Json';
                httpGet(url3, 'json', function () {
                    json_object = response;
                    loadData();
                });
            }
        });
    };

    let okButton = document.getElementById("ok");
    document.getElementById("ok").style.background = '#FFFFFF';
    okButton.onclick = function () {
        document.getElementById("roll").disabled = false;
        document.getElementById("lucky6").disabled = true;
        document.getElementById("buy").disabled = true;
        document.getElementById("ok").disabled = true;
        document.getElementById("buy").style.background = '#FFFFFF';
        document.getElementById("upgrade").style.background = '#FFFFFF';
  
        popup_background.remove();
        document.getElementById("ok").style.background = '#FFFFFF';
        document.getElementById("lucky6").style.background = '#FFFFFF';
        document.getElementById("pay_prison_penalty").style.background = '#FFFFFF';
        if (decision === 3 || decision === 6 || decision === 7) {
            let json_data = { numbers: -1, decision_value: decision, mysterious_card_number: current_mysterious_card };
            $.ajax({
                type: "POST",
                url: "/Boards/Game",
                data: JSON.stringify(json_data),
                contentType: "application/json",
                success: function () {
                    let url3 = '/Boards/Json';
                    httpGet(url3, 'json', function (response) {
                        json_object = response;
                        loadData();
                    });
                }
            });
        }
    };

    let luckySixButton = document.getElementById("lucky6");
    document.getElementById("lucky6").style.background = '#FFFFFF';
    luckySixButton.onclick = function () {
        document.getElementById("upgrade").disabled = true;
        document.getElementById("roll").disabled = false;
        document.getElementById("pay_prison_penalty").disabled = true;
        document.getElementById("buy").disabled = true;
        document.getElementById("lucky6").disabled = true;
        document.getElementById("lucky6").disabled = true;
  
        popup_background.remove();
        document.getElementById("ok").style.background = '#FFFFFF';
        document.getElementById("lucky6").style.background = '#FFFFFF';
        document.getElementById("pay_prison_penalty").style.background = '#FFFFFF';
        if ((Math.floor(Math.random() * 12) + 2) === 12) {
            decision = 4;
        }
        else {
            decision = 0;
        }

        let json_data = { numbers: -1, decision_value: decision, mysterious_card_number: current_mysterious_card };
        $.ajax({
            type: "POST",
            url: "/Boards/Game",
            data: JSON.stringify(json_data),
            contentType: "application/json",
            success: function () {
                let url3 = '/Boards/Json';
                httpGet(url3, 'json', function (response) {
                    json_object = response;
                    loadData();
                });
            }
        });
    };

    let payForFreedom = document.getElementById("pay_prison_penalty");
    document.getElementById("pay_prison_penalty").style.background = '#FFFFFF';
    payForFreedom.onclick = function () {
        document.getElementById("pay_prison_penalty").disabled = true;
        document.getElementById("roll").disabled = false;
        document.getElementById("lucky6").disabled = true;
        document.getElementById("ok").disabled = true;
   
        popup_background.remove();
        document.getElementById("ok").style.background = '#FFFFFF';
        document.getElementById("lucky6").style.background = '#FFFFFF';
        document.getElementById("pay_prison_penalty").style.background = '#FFFFFF';
        decision = 5;

        let json_data = { numbers: -1, decision_value: decision, mysterious_card_number: current_mysterious_card };
        $.ajax({
            type: "POST",
            url: "/Boards/Game",
            data: JSON.stringify(json_data),
            contentType: "application/json",
            success: function () {
                let url3 = '/Boards/Json';
                httpGet(url3, 'json', function (response) {
                    json_object = response;
                    loadData();
                });
            }
        });
    };
};
var canvas;

function setup() {
    canvas = createCanvas(1400, 1150);
    background('#130E32');
    canvas.position(100, 43);
    for (var i = 0; i < 3; i++) {

        for (var k = 0; k < 3; k++) {
            var x = (i + 5) * 200;
            var y = (k) * 180;
            newtile[m] = new category_class('', x + 28, y, 170, 170, '', 0, 0, 0, '');
            m = m + 1;
        }
    }
    let b2 = 0;
    for (var i = 0; i < 2; i++) {
        for (k = 0; k < 2; k++) {
            var x = (i + 1) * 230;
            var y = (k + 3) * 400;
            PlayerArray[b2] = new Player(x, y, 200, 450, 0, '', 0, 0, '',1);
            b2 = b2 + 1;
        }
    }


    for (let i = 0; i < 40; i++) {
        FieldArray[i] = new Tile(0, 0, 0, 0, 0, '', 0, 0);
    }
    for (let i = 0; i < 9; i++) {
        CategoryArray[i] = new category_class('', 0, 0, 150, 150, '', 0, 0, 0);
    }

    xx = 80;
    if (flag) {
        loadData();
    }

    for (var i = 0; i < 11; i++) {
        var posX = map(i, 0, 11, 0, widthheight);
        FieldArray[i] = new Tile(posX, 0, 80, xx, FieldArray[i].id_Field, FieldArray[i].nameOfField, FieldArray[i].TypeOfField, FieldArray[i].Price);
    }

    var k = 10;
    for (var i = 0; i < 11; i++) {
        var posX = map(i, 0, 11, 0, widthheight);
        if (k < 21) {
            FieldArray[k] = new Tile(widthheight - 80, posX, 80, xx, FieldArray[k].id_Field, FieldArray[k].nameOfField, FieldArray[k].TypeOfField, FieldArray[k].Price);
            k = k + 1;
        }
    }
    var k2 = 30;
    for (var i = 0; i < 11; i++) {
        var posX2 = map(i, 0, 11, 0, widthheight);
        if (k2 >= 21) {
            FieldArray[k2] = new Tile(posX2, widthheight - 80, 80, xx, FieldArray[k2].id_Field, FieldArray[k2].nameOfField, FieldArray[k2].TypeOfField, FieldArray[k2].Price);
            k2 = k2 - 1;
        }
    }
    var k3 = 39;
    for (var i = 1; i < 11; i++) {

        var posY = map(i, 0, 11, 0, widthheight);

        if (k3 >= 30) {
            FieldArray[k3] = new Tile(0, posY, 80, xx, FieldArray[k3].id_Field, FieldArray[k3].nameOfField, FieldArray[k3].TypeOfField, FieldArray[k3].Price);
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


    }
}

function replace_setup() {
    background('#130E32');
    for (var i = 0; i < 3; i++) {
        for (var k = 0; k < 3; k++) {
            var x = (i + 4) * 255;
            var y = (k) * 225;
            newtile[m] = new category_class('', x, y, 150, 150, '', 0, 0, 0, '');
            m = m + 1;
        }
    }

    for (let p = 0; p < 9; p++) {
        if (p == 6) {
            newtile[p] = new category_class('', newtile[p - 1].x, newtile[p - 1].y + 180, 170, 170, '', 0, 0, 0, '');
        }
        if (p == 7) {
            newtile[p] = new category_class('', newtile[2].x, newtile[2].y + 180, 170, 170, '', 0, 0, 0, '');
        }
        if (p == 8) {
            newtile[p] = new category_class('', newtile[7].x + 70, newtile[7].y + 190, 220, 190, '', 0, 0, 0, '');
        }
    }
    let b2 = 0;
    for (var i = 0; i < 2; i++) {
        for (k = 0; k < 2; k++) {
            var x = (i + 1) * 260;
            var y = (k + 1) * 300;
            PlayerArray[b2] = new Player(x, y, 200, 220, 0, '', 0, 0, '');
            b2 = b2 + 1;
        }
    }

    for (let i = 0; i < 40; i++) {
        FieldArray[i] = new Tile(0, 0, 0, 0, 0, '', 0, 0);
    }
    for (let i = 0; i < 9; i++) {
        CategoryArray[i] = new category_class('', 0, 0, 150, 150, '', 0, 0, 0);
    }

    var width_height = 90;
    if (flag) {
        loadData();
    }

    for (var i = 0; i < 11; i++) {
        var posX = map(i, 0, 11, 0, widthheight);
        FieldArray[i] = new Tile(posX, 0, width_height, 100, FieldArray[i].id_Field, FieldArray[i].nameOfField, FieldArray[i].TypeOfField, FieldArray[i].Price);
       
         
       
    }

    var k = 10;
    for (var i = 0; i < 11; i++) {
        var posX = map(i, 0, 11, 0, 1100);
        if (k < 21) {

            FieldArray[k] = new Tile(widthheight - width_height, posX, 100, 100, FieldArray[k].id_Field, FieldArray[k].nameOfField, FieldArray[k].TypeOfField, FieldArray[k].Price);

            k = k + 1;
        }
    }
    var k2 = 30;
    for (var i = 0; i < 11; i++) {
        var posX2 = map(i, 0, 11, 0, widthheight);
        if (k2 >= 21) {
            FieldArray[k2] = new Tile(posX2, widthheight + 10, width_height, 100, FieldArray[k2].id_Field, FieldArray[k2].nameOfField, FieldArray[k2].TypeOfField, FieldArray[k2].Price);
            k2 = k2 - 1;
        }
    }
    var k3 = 39;
    for (var i = 1; i < 11; i++) {

        var posY = map(i, 0, 11, 0, 1100);

        if (k3 >= 30) {
            FieldArray[k3] = new Tile(0, posY, width_height, 100, FieldArray[k3].id_Field, FieldArray[k3].nameOfField, FieldArray[k3].TypeOfField, FieldArray[k3].Price);
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
            counters[i].Position = PlayerArray[i].Position;

            counters[0].Color = 'RED';
            counters[1].Color = 'GREEN';
            counters[2].Color = 'YELLOW';
            counters[3].Color = '#06F3C8';

            var m = 0;
            for (let p = 0; p < 28; p++) {
                if (PlayerArray[i].id_Player == properites[p].owner_FK) {
                    for (var z = 0; z < 40; z++) {
                        if (properites[p].field_Fk == FieldArray[z].id_Field) {
                            PlayerArray[i].player_properties[m] = FieldArray[z].nameOfField;
                            m = m + 1;
                        }
                    }
                }
            }


        }
        for (let i = 0; i < 4; i++) {
            for (let z = 0; z < 40; z++) {
                if (counters[i].Position == FieldArray[z].id_Field) {

                    counters[i].x = FieldArray[z].x + 10;
                    counters[i].y = FieldArray[z].y + 10;


                    break;
                }
            }
        }
    }

}

function draw() {

    for (let i = 0; i < 40; i++) {
        FieldArray[i].show();
    }
    for (let i = 0; i < 40; i++) {
        if (i == 1 || i==3 || i==4) {
            fill('RED');
            rect(FieldArray[i].x, FieldArray[i].y+90, FieldArray[i].lar, 10);

        }
        if (i == 6 || i == 7 || i == 9) {
            fill('YELLOW');
            rect(FieldArray[i].x, FieldArray[i].y + 90, FieldArray[i].lar, 10);

        }
        if (i == 5 ) {
            fill('#FF1493');
            rect(FieldArray[i].x, FieldArray[i].y + 90, FieldArray[i].lar, 10);

        }
        if (i == 11 || i == 12 || i == 14) {
            fill('GREEN');
            rect(FieldArray[i].x, FieldArray[i].y,10, FieldArray[i].alt);

        }
        if (i == 16 || i == 17 || i == 19) {
            fill('BLUE');
            rect(FieldArray[i].x, FieldArray[i].y, 10, FieldArray[i].alt);

        }
        if (i == 15) {
            fill('#FF1493');
            rect(FieldArray[i].x, FieldArray[i].y, 10, FieldArray[i].alt);

        }
        if (i == 21 || i == 23 || i == 24) {
            fill('BROWN');
            rect(FieldArray[i].x, FieldArray[i].y, FieldArray[i].lar, 10);

        }
        if (i == 26 || i == 28 || i == 29) {
            fill('#00CED1');
          
            rect(FieldArray[i].x, FieldArray[i].y, FieldArray[i].lar, 10);

        }
        if ( i == 25) {
            fill('#FF1493');
            rect(FieldArray[i].x, FieldArray[i].y, FieldArray[i].lar, 10);

        }
        if (i == 31 || i == 33 || i == 34) {
            fill('PURPLE');
            rect(FieldArray[i].x+80, FieldArray[i].y,10, FieldArray[i].lar+10);

        }
        if (i == 36 || i == 38 || i == 39) {
            fill('ORANGE');
            rect(FieldArray[i].x + 80, FieldArray[i].y, 10, FieldArray[i].lar + 10);

        }
        if (i ==35) {
            fill('#FF1493');
            rect(FieldArray[i].x + 80, FieldArray[i].y, 10, FieldArray[i].lar + 10);

        }
    }
 
    for (let k = 0; k < 9; k++) {
        newtile[k].show_tiles();
    }
    for (let k = 0; k < 9; k++) {
        if (k == 0) {
            fill('RED');
            rect(newtile[k].x, newtile[k].alt-10, newtile[k].lar, 10);
               
        }
        if (k == 1) {
            fill('YELLOW');
            rect(newtile[k].x, newtile[k].y+160, newtile[k].lar, 10);

        }
        if (k == 2) {
            fill('GREEN');
            rect(newtile[k].x, newtile[k].y + 160, newtile[k].lar, 10);

        }
        if (k == 3) {
            fill('BLUE');
            rect(newtile[k].x, newtile[k].y + 160, newtile[k].lar, 10);

        }
        if (k == 4) {
            fill('BROWN');
            rect(newtile[k].x, newtile[k].y + 160, newtile[k].lar, 10);

        }
        if (k == 5) {
            fill('#00CED1');
            rect(newtile[k].x, newtile[k].y + 160, newtile[k].lar, 10);

        }
        if (k == 6) {
            fill('PURPLE');
            rect(newtile[k].x, newtile[k].y + 160, newtile[k].lar, 10);

        }
        if (k == 7) {
            fill('ORANGE');
            rect(newtile[k].x, newtile[k].y + 160, newtile[k].lar, 10);

        }
        if (k == 8) {
            fill('#FF1493');
            rect(newtile[k].x, newtile[k].y + 190, newtile[k].lar, 10);

        }



    }
    for (let j = 0; j < 4; j++) {
        PlayerArray[j].show_player();
    }
    for (let m = 0; m < 4; m++) {
        if (PlayerArray[m].is_Active == true) {
            counters[m].show_counter(counters[m].Color);
        }
    }
    // image(img, FieldArray[0].x, FieldArray[0].y,30);
}

function dataPosted(result) {
    console.log(result);
}

function dataError(err) {
    console.log(err);
}

var response23;
var promise;

function dice_roll() {
    let generated_numbers = this.numbers = Math.floor(Math.random() * 12) + 2;
    let json_data = { numbers: generated_numbers, decision_value: -1, mysterious_card_number: current_mysterious_card };

    let url2 = '/Boards/Game';

    $.ajax({
        type: "POST",
        url: "/Boards/Game",
        data: JSON.stringify(json_data),
        contentType: "application/json",
        success: function () {
            let url3 = '/Boards/Json';
            decision = 0;
            current_mysterious_card = 0;
            httpGet(url3, 'json', function (response) {
                movePlayer();
                promise = new Promise(function (resolve, reject) {
                    response23 = response;
                    if (response23 === response) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
                promise.then(move_and_generate_decision)
                    .catch(function () {
                        console.log('Error in promise');
                    });
            });
        },
        error: function (data) {
            console.log('Error: ' + data);
        }
    });
}

function move_and_generate_decision() {
    dipslayPlayers();
    // movePlayer();
    let current_player_index = response23.board_list[0].current_player_index;
    if (current_player_index == 0) { current_player_index = 3; }
    else { current_player_index = current_player_index - 1; }

    decision_player = response23.player_list[current_player_index];
    generate_decision_popup(decision_player);
}

var object_from_json;

function movePlayer() {

    let url4 = '/Boards/Json';
    httpGet(url4, 'json', function (response) {
        object_from_json = response;
        move_pl();
    });

}

function move_pl() {
    for (let i = 0; i < 4; i++) {
        counters[i].Position = object_from_json.player_list[i].position;
        PlayerArray[i].is_Active = object_from_json.player_list[i].is_active;
       
    }

    var player_ = object_from_json.board_list[0].current_player_index;
    if (player_ == 0) player_ = 4;
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
       PlayerArray[i].is_Active = response23.player_list[i].is_active;
    }
    for (var i = 0; i < 4; i++) {
        
            PlayerArray[i].show_player();
        
    }
}

function generate_decision_popup(player) {
    popup_open = true;
    current_player = player;
    current_field = FieldArray[player.position];
    let decision = new Decision(current_field, current_player);
    decision.make_decision();
}

function loadData() {
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
        players[i].is_Active = json_object.player_list[i].is_active;
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
        PlayerArray[i].is_Active = players[i].is_Active;
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
        let zz = 0;
        newtile[k].nameOfCategory = CategoryArray[k].nameOfCategory;
        for (let z = 0; z < 28; z++) {
            if (CategoryArray[k].id_Category == properites[z].category_FK) {
                for (let m = 0; m < 40; m++) {
                    if (properites[z].field_Fk == FieldArray[m].id_Field)
                        if (a <= 4) {
                            newtile[k].property1[a] = FieldArray[m].nameOfField;
                            newtile[k].owner_property_name[zz] = properites[z].owner_FK;
                            a = a + 1;
                            zz = zz + 1;
                        }
                }
            }
        }
    }

    for (let l = 0; l < mysterious_cards.length; l++) {
        mysterious_cards[l].id_MysteriousCard = json_object.mysterious_card_list[l].id_mysterious_card;
        mysterious_cards[l].Description = json_object.mysterious_card_list[l].description;
        mysterious_cards[l].Reward = json_object.mysterious_card_list[l].reward;
    }
}

function assign_property_to_player() {

    for (let k = 0; k < 4; k++) {
        var m = 0;
        for (let i = 0; i < 28; i++) {
            if (PlayerArray[k].id_Player == json_object.property_list[i].ownerFK && PlayerArray[k].is_Active == true) {
                for (var z = 0; z < 40; z++) {
                    if (json_object.property_list[i].fieldFK == FieldArray[z].id_Field) {
                        PlayerArray[k].player_properties[m] = FieldArray[z].nameOfField;
                        m = m + 1;
                    }
                }
            }
            else if (PlayerArray[k].is_Active == false) {
                PlayerArray[k].player_properties[m] = '';
                m = m + 1;
            }
        }
    }
}