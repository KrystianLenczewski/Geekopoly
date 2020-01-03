property_in_category = [];
owner_property_name = [];
class category_class {


    constructor(nameOfCategory, x, y, lar, alt, property1, id_Category, entry_Value, upgrade_Cost, owner_property_name) {
        this.nameOfCategory = nameOfCategory;
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        this.property1 = new Array(3);
        this.owner_property_name = new Array(3);
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

        text(this.property1[0], this.x + 10, this.y + 40);
        textStyle(BOLD);
        if (this.owner_property_name[0] !== null) {
            text("Owner: " + this.owner_property_name[0], this.x + 10, this.y + 50);
        }
        else {
            text("Free estate", this.x + 10, this.y + 50);
        }
        textStyle(NORMAL);
        text(this.property1[1], this.x + 10, this.y + 60);
        textStyle(BOLD);
        if (this.owner_property_name[1] !== null) {
            text("Owner: " + this.owner_property_name[1], this.x + 10, this.y + 70);
        }
        else {
            text("Free estate", this.x + 10, this.y + 70);
        }
        textStyle(NORMAL);
        text(this.property1[2], this.x + 10, this.y + 80);
        textStyle(BOLD);
        if (this.owner_property_name[2] !== null) {
            text("Owner: " + this.owner_property_name[2], this.x + 10, this.y + 90);
        }
        else {
            text("Free estate", this.x + 10, this.y + 90);
        }
        textStyle(NORMAL);
        var special4 = "OFFICE IN SILICON VALLEY";
        if ((special4.localeCompare(this.property1[3])) == 0) {
            text(this.property1[3], this.x + 10, this.y + 100);
            textStyle(BOLD);
            if (this.owner_property_name[3] !== null)
                text("Owner: " + this.owner_property_name[3], this.x + 10, this.y + 110);
            else {
                text("Free estate", this.x + 10, this.y + 110);
            }
        }


    }

}