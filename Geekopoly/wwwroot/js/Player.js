

player_properties = [];

class Player {
    constructor(x, y, lar, alt, id_Player, Name_Player, amount_Of_Cash, Position, player_properties) {
        this.id_Player = id_Player;
        this.Name_Player = Name_Player;
        this.amount_Of_Cash = amount_Of_Cash;
        this.Position = Position;
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        this.player_properties = new Array();

    }
   
    show_player() {
        //noStroke();
        var k = 0;
       var yy = 55;
        fill(255);
        if (this.id_Player == 1) {
            stroke('red');
            rect(this.x, 150, this.lar, 300);


            fill('BLACK');
            noStroke();
            text(this.Name_Player, this.x + 10, 170);
            text(this.amount_Of_Cash, this.x + 10, 180);
            text(this.Position, this.x + 10, 190); 
            while (this.player_properties[k] != null) {

                text(this.player_properties[k], this.x + 10, 150 + yy);
                k++;
                yy = yy + 10;
            }
        }
        else if (this.id_Player == 2) {
            stroke('blue');
            rect(this.x, this.y, this.lar, 300);
        }
        else if (this.id_Player == 3) {
            stroke('yellow');
            rect(this.x, 150, this.lar, 300);
            fill('BLACK');
            noStroke();
            text(this.Name_Player, this.x + 10, 170);
            text(this.amount_Of_Cash, this.x + 10, 180);
            text(this.Position, this.x + 10, 190); 

            while (this.player_properties[k] != null) {

                text(this.player_properties[k], this.x + 10, 150 + yy);
                k++;
                yy = yy + 10;
            }

        }
        else if (this.id_Player == 4) {
            stroke('black');
            rect(this.x, this.y, this.lar, 300);
        }
        if (this.id_Player != 1&& this.id_Player!=3) {
            fill('BLACK');
            noStroke();
            text(this.Name_Player, this.x + 10, this.y + 20);
            text(this.amount_Of_Cash, this.x + 10, this.y + 30);
            text(this.Position, this.x + 10, this.y + 40);
            while (this.player_properties[k] != null) {

                text(this.player_properties[k], this.x + 10, this.y + yy);
                k++;
                yy = yy + 10;
            }
        }
        
        stroke('grey');
        strokeWeight(1);
       
    }
    



}
