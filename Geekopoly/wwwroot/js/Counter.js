class Counter {


    constructor(x, y, lar, alt, id_Player, Name_Player, amount_Of_Cash, Position,color) {
        this.id_Player = id_Player;
        this.Name_Player = Name_Player;
        this.amount_Of_Cash = amount_Of_Cash;
        this.Position = Position;
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        this.color = color;
    }

    show_counter(pom) {

        if (pom == 'RED') {
            fill('RED');
            rect(this.x+9, this.y-3, this.alt, this.lar);
        }
        if (pom == 'GREEN') {
            fill('GREEN');
            rect(this.x+9, this.y+35, this.alt, this.lar);
        }
        if (pom == 'YELLOW') {
            fill('YELLOW');
            rect(this.x+30, this.y-3, this.alt, this.lar);
        }
        if (pom == '#06F3C8') {
            fill('#06F3C8');
            rect(this.x + 30, this.y + 35, this.alt, this.lar);
        }
        

    }


}