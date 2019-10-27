using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class MysteriousCard 
    {
        [Key]
        public int id_mysterious_card { get; set; }
        public string description { get; }
        public int? penalty = null;
        public int? reward = null;
        public Boolean? prison = null;


        public MysteriousCard(int id, string name, int id_card, string description, int? penalty, int? reward, Boolean? prison) 
        {
            this.id_mysterious_card = id_card;
            this.description = description;
            this.penalty = penalty;
            this.reward = reward;
            this.prison = prison;
        }

        public MysteriousCard()
        {
        }
      /*  public override string ActOnPlayer(Player player)
        {
            return MysteriousCardGenerator.GeneratorRandomCard(player);
        }*/
    }

}
