let type_of_decision;

class Decision {


    constructor(field, player) {
        fill(204, 101, 192);

        this.field_id = field.id_Field;
        this.field_type = field.TypeOfField;
        this.description = field.nameOfField;
        this.player_id = player.id_player;
        this.player_cash = player.amount_of_cash;
    }

    make_decision() {

        popup_background = createDiv(this.description);
        popup_background.style('background-color', 'purple');
        popup_background.position(200, 300);
        popup_background.size(800, 400);
        popup_background.style('font-size', '24px');
        popup_background.style('color', 'white');
        let property;
        switch (this.field_type) {

            case 0:
                decision = 7;
                current_mysterious_card = Math.floor(Math.random() * mysterious_cards.length);
                let current_mysterious_card_object = mysterious_cards[current_mysterious_card];
                popup_background.html("   " + current_mysterious_card_object.Description, true);
                break;
            case 1:
                decision = 6;
                break;
            case 4:
                for (let i = 0; i < properites.length; i++) {
                    if (properites[i].field_Fk === this.field_id) {
                        property = properites[i];
                    }
                }
                if (property.owner_FK !== null) {
                    if (property.owner_FK !== this.player_id) {
                        popup_background.html("\n" + "you have to pay", true);
                        decision = 3;
                    }
                }
                break;
        }
    }



    //switch (this.field_type) {
    //    case 0:
    //        checkbox1 = createCheckbox('Understood man');
    //        checkbox1.id('checkbox1');
    //        checkbox1.changed(send_decision(1));
    //        checkbox1.position(500, 600);
    //        checkbox1.style('font-size', '24px');
    //        checkbox1.style('color', 'white');
    //        break;
    //    case 1:
    //        checkbox1 = createCheckbox('Lovely!');
    //        checkbox1.id('checkbox1');
    //        checkbox1.changed(send_decision(1));
    //        checkbox1.position(500, 600);
    //        checkbox1.style('font-size', '24px');
    //        checkbox1.style('color', 'white');
    //        break;
    //    case 3:
    //        //fill(255);
    //        //checkbox1 = createCheckbox('Pay 50$');
    //        //checkbox1.id('checkbox1');
    //        //checkbox1.changed(send_decision(3));
    //        //checkbox1.position(300, 600);
    //        //checkbox1.style('font-size', '24px');
    //        //checkbox1.style('color', 'white');
    //        //checkbox2 = createCheckbox('Let me try to roll!');
    //        //checkbox2.id('checkbox2');
    //        //checkbox2.changed(send_decision(3));
    //        //checkbox2.position(500, 600);
    //        //checkbox2.style('font-size', '24px');
    //        //checkbox2.style('color', 'white');
    //        //checkbox3 = createCheckbox('I am good, i gonna stay officer!');
    //        //checkbox3.id('checkbox3');
    //        //checkbox3.changed(send_decision(3));
    //        //checkbox3.position(700, 600);
    //        //checkbox3.style('font-size', '24px');
    //        //checkbox3.style('color', 'white');
    //        break;
    //    case 4:
    //        let property;
    //        let category;

    //        for (let i = 0; i < properites.length; i++) {
    //            if (properites[i].field_Fk === this.field_id) {
    //                property = properites[i];
    //            }
    //        }

    //        for (let i = 0; i < categories.length; i++) {
    //            if (categories[i].id_Category === property.category_FK) {
    //                category = categories[i];
    //            }
    //        }


    //        //if (property.owner_FK === null) {
    //        //    if (this.player_cash < category.entry_Value) {
    //        //        checkbox1 = createCheckbox('Pass');
    //        //        checkbox1.id('checkbox1');
    //        //        checkbox1.changed(send_decision(1));
    //        //        checkbox1.position(500, 600);
    //        //        checkbox1.style('font-size', '24px');
    //        //        checkbox1.style('color', 'white');
    //        //        break;
    //        //    }
    //        //    else {
    //        //        checkbox1 = createCheckbox('Buy');
    //        //        checkbox1.id('checkbox1');
    //        //        checkbox1.position(500, 600);
    //        //        checkbox1.style('font-size', '24px');
    //        //        checkbox1.style('color', 'white');
    //        //        checkbox2 = createCheckbox('Pass');
    //        //        checkbox2.id('checkbox2');
    //        //        checkbox2.position(600, 600);
    //        //        checkbox2.style('font-size', '24px');
    //        //        checkbox2.style('color', 'white');
    //        //        while (!is_decision_made) {
    //        //            console.log('tag', is_decision_made);
    //        //            checkbox1.changed(send_decision(1));
    //        //            checkbox2.changed(send_decision(2));
    //        //        }
    //        //        is_decision_made = false;
    //        //        break;
    //        //    }
    //        //}
    //        //else if (property.owner_FK === this.player_id) {
    //        //    if (this.player_cash < category.upgrade_Cost) {
    //        //        checkbox1 = createCheckbox('Pass');
    //        //        checkbox1.id('checkbox1');
    //        //        checkbox1.changed(send_decision(1));
    //        //        checkbox1.position(500, 600);
    //        //        checkbox1.style('font-size', '24px');
    //        //        checkbox1.style('color', 'white');
    //        //        break;
    //        //    }
    //        //    else {
    //        //        checkbox1 = createCheckbox('Upgrade');
    //        //        checkbox1.id('checkbox1');
    //        //        checkbox1.changed(send_decision(2));
    //        //        checkbox1.position(500, 600);
    //        //        checkbox1.style('font-size', '24px');
    //        //        checkbox1.style('color', 'white');
    //        //        checkbox2 = createCheckbox('Pass');
    //        //        checkbox2.id('checkbox2');
    //        //        checkbox2.changed(send_decision(2));
    //        //        checkbox2.position(600, 600);
    //        //        checkbox2.style('font-size', '24px');
    //        //        checkbox2.style('color', 'white');
    //        //        break;
    //        //    }
    //        //}

    //        //else if (property.owner_FK !== this.played_id) {
    //        //    checkbox1 = createCheckbox('Pay penalty Mr. Wozniacki!');
    //        //    checkbox1.id('checkbox1');
    //        //    checkbox1.changed(send_decision(1));
    //        //    checkbox1.position(500, 600);
    //        //    checkbox1.style('font-size', '24px');
    //        //    checkbox1.style('color', 'white');
    //        //    break;
    //        //}
    //}
}
