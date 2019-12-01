 property1 = [];

class category_class {
    

    constructor(nameOfCategory, x, y, lar, alt, property1, id_Category, entry_Value, upgrade_Cost) {
        this.nameOfCategory = nameOfCategory;
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        this.property1 = new Array(3);
        this.id_Category = id_Category;
        this.entry_Value = entry_Value;
        this.upgrade_Cost = upgrade_Cost;
    }
   
  

    show_tiles() {
        //noStroke();

        fill(255);
        rect(this.x, this.y, this.lar, this.alt);
        fill('BLACK');
           text(this.nameOfCategory, this.x + 10, this.y + 20);
        text(this.property1[0], this.x + 10, this.y + 30);
        text(this.property1[1], this.x + 10, this.y + 40);
        text(this.property1[2], this.x + 10, this.y + 50);
        text(this.property1[3], this.x + 10, this.y + 60);
    }

}