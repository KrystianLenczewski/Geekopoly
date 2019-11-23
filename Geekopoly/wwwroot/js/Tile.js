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

        rect(this.x, this.y, this.lar, this.alt);
        text(this.nameOfField, this.x + 10, this.y + 20, 70, 70);
        text(this.Price, this.x + 50, this.y + 50);

    }



}
