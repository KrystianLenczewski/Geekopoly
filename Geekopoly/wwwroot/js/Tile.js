class Tile {
    constructor(x, y, lar, alt, id_Field, nameOfField, TypeOfField,Price) {

        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        this.id_Field = id_Field;
        this.nameOfField = nameOfField;
        this.TypeOfField = TypeOfField;
        this.Price = Price;

    }

    show() {
        //noStroke();
        textSize(10);
        textLeading(10);

        fill(255);
        rect(this.x, this.y, this.lar, this.alt);
        fill('BLACK');
        text(this.nameOfField, this.x + 15, this.y + 30, 70, 70);
        if(this.Price!=0)text(this.Price, this.x + 50, this.y + 60);
        

    }



}
