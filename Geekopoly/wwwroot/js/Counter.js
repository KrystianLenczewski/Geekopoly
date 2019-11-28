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
            rect(this.x-5, this.y-5, this.alt, this.lar);
        }
        if (pom == 'BLUE') {
            fill('BLUE');
            rect(this.x, this.y, this.alt, this.lar);
        }
        if (pom == 'YELLOW') {
            fill('YELLOW');
            rect(this.x+20, this.y+5, this.alt, this.lar);
        }
        if (pom == 'BLACK') {
            fill('BLACK');
            rect(this.x+5, this.y+7, this.alt, this.lar);
        }

    }


}