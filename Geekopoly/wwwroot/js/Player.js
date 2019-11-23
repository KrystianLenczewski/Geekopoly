class Player {
    

    constructor(x,y,lar,alt,id_Player, Name_Player,amount_Of_Cash,Position) {
        this.id_Player = id_Player;
        this.Name_Player = Name_Player;
        this.amount_Of_Cash = amount_Of_Cash;
        this.Position = Position;
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
    }
   
    show_player() {
        //noStroke();
        fill(255);
        rect(this.x, this.y, this.lar, this.alt);
        fill('BLACK');
        text(this.Name_Player, this.x + 10, this.y + 20);
        text(this.amount_Of_Cash, this.x + 10, this.y + 30);   
        text(this.Position, this.x + 10, this.y + 40);   

    }
    setValue(id_Player, Name_Player, amount_Of_Cash, Position) {
       
        this.id_Player = id_Player;
        this.id_Player = id_Player;
        this.Name_Player = Name_Player;
        this.amount_Of_Cash = amount_Of_Cash;
        this.Position = Position;
    }



}
