
class mysterious_cards {


    constructor(id_mysterious_card, description, reward) {
        this.id_mysterious_card = id_mysterious_card;
        this.description = description;
        this.reward = reward;


    }
  
   show_message_mysterious_card(id_player) {
       fill('BLACK')
      
      // text("MYSTERIOUS CARD FOR PLAYER OF ID: " + this.reward, 100, 100);
       //fill(255);
      // let message = this.description;
      text(this.description, 200, 100,200,200);

   }


    
}