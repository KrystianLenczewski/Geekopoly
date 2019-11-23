 property1 = [];

class category_class {
    

    constructor(nameOfCategory,x, y, lar, alt, property1) {
        this.nameOfCategory = nameOfCategory;
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        this.property1 = new Array(3);
        


    }

    show_tiles() {
        //noStroke();
        rect(this.x, this.y, this.lar, this.alt);
           text(this.nameOfCategory, this.x + 10, this.y + 20);
        text(this.property1[0], this.x + 10, this.y + 30);
        text(this.property1[1], this.x + 10, this.y + 40);
        text(this.property1[2], this.x + 10, this.y + 50);
        text(this.property1[3], this.x + 10, this.y + 60);
       
       
    }

}