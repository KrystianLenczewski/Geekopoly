

player_properties = [];

class Player {
    constructor(x, y, lar, alt, id_Player, Name_Player, amount_Of_Cash, Position, player_properties,is_Active) {
        this.id_Player = id_Player;
        this.Name_Player = Name_Player;
        this.amount_Of_Cash = amount_Of_Cash;
        this.Position = Position;
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        this.player_properties = new Array();
        this.is_Active = is_Active;
      
    }
   
    show_player() {
        //noStroke();
        var k = 0;
        var yy = 55;
        var height_rect = 340;
        fill(255);
        if (this.id_Player == 1) {
            strokeWeight(7);
            stroke('red');
            rect(this.x, 150, this.lar, height_rect);


            fill('BLACK');
            noStroke();
            textStyle(NORMAL);
            textSize(15);
            text(this.Name_Player, this.x + 10, 180);
            text('Cash' + this.amount_Of_Cash, this.x + 10, 200);
            //text(this.Position, this.x + 10, 220); 
            while (this.player_properties[k] != null) {
                textSize(12);
                text(this.player_properties[k], this.x + 10, 240 + yy);
                k++;
                yy = yy + 10;
            }
        }
        else if (this.id_Player == 2) {
            strokeWeight(7);
            stroke('green');
            rect(this.x, this.y, this.lar, height_rect);
        }
        else if (this.id_Player == 3) {
            strokeWeight(7);
            stroke('yellow');
            rect(this.x, 150, this.lar, height_rect);
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
            strokeWeight(7);
            stroke('#06F3C8');
            rect(this.x, this.y, this.lar, height_rect);
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
