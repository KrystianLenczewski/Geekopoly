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
        document.getElementById("roll").disabled = true;
        document.getElementById("ok").style.background = '#32CD32';
        document.getElementById("buy").style.background = '#32CD32';
        document.getElementById("upgrade").disabled = true;
        document.getElementById("pay_prison_penalty").disabled = true;
        document.getElementById("lucky6").disabled = true;

        popup_background = createDiv(this.description);
        popup_background.style('text-align:center; padding: 40px;');
        popup_background.style('background-color', 'purple');
        popup_background.style('font-size', '32px');
        popup_background.style('color', 'white');
        popup_background.position(200, 300);
        popup_background.size(800, 400);
     

        let property;
        switch (this.field_type) {
            
            // Mysterious Card
            case 0:
                decision = 7;
                document.getElementById("buy").disabled = true;
                document.getElementById("buy").style.background = '#FFFFFF';
                document.getElementById("upgrade").disabled = true;
                document.getElementById("roll").disabled = true;
                document.getElementById("lucky6").disabled = true;
                document.getElementById("pay_prison_penalty").disabled = true;
                current_mysterious_card = Math.floor(Math.random() * mysterious_cards.length);
                let current_mysterious_card_object = mysterious_cards[current_mysterious_card];
                popup_background.html('<br><br><br>', true);
                popup_background.html(current_mysterious_card_object.Description, true);
                document.getElementById("ok").style.background = '#32CD32';
                break;

            // Start/You Get 50$ Property
            case 1:
                document.getElementById("buy").disabled = true;
                document.getElementById("upgrade").disabled = true;
                document.getElementById("buy").style.background = '#FFFFFF';
                document.getElementById("roll").disabled = true;
                document.getElementById("lucky6").disabled = true;
                document.getElementById("pay_prison_penalty").disabled = true;
                popup_background.style('background-color', 'green');
                document.getElementById("ok").style.background = '#32CD32';
                decision = 6;
         
                break;

            // Prison
            case 3:
                document.getElementById("lucky6").disabled = false;
                document.getElementById("buy").style.background = '#FFFFFF';
                document.getElementById("pay_prison_penalty").disabled = false;
                document.getElementById("buy").disabled = true;
                document.getElementById("upgrade").disabled = true;
                document.getElementById("roll").disabled = true;
                popup_background.style('background-color', 'red');
                document.getElementById("ok").style.background = '#32CD32';
                document.getElementById("lucky6").style.background = '#32CD32';
                document.getElementById("pay_prison_penalty").style.background = '#32CD32';
                break;

            // Property
            case 4:
            
                for (let i = 0; i < properites.length; i++) {
                    if (properites[i].field_Fk === this.field_id) {
                        property = properites[i];
                    }
                }
                if (property.owner_FK !== null) {
                    document.getElementById("buy").style.background = '#FFFFFF';
                    if (property.owner_FK !== this.player_id) {
                        
                        popup_background.style('background-color', 'red');
                        document.getElementById("ok").style.background = '#32CD32';
                        popup_background.html('<br><br><br>', true);
                        popup_background.html("You have to pay", true);
                        decision = 3;
                        document.getElementById("buy").disabled = true;
                        document.getElementById("upgrade").disabled = true;
                        document.getElementById("roll").disabled = true;
                        document.getElementById("lucky6").disabled = true;
                        document.getElementById("pay_prison_penalty").disabled = true;
                       
                    }
                    else {
                        popup_background.style('background-color', 'green');
                        document.getElementById("buy").disabled = true;
                        document.getElementById("ok").style.background = '#32CD32';
                        document.getElementById("upgrade").style.background = '#32CD32';
                        document.getElementById("roll").disabled = true;
                        document.getElementById("upgrade").disabled = false;
                 
                        document.getElementById("lucky6").disabled = true;
                        document.getElementById("pay_prison_penalty").disabled = true;
                    }
                }
                break;
        }
    }
}
