using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class MysteriousCard
    {
        [Key]
        public int id_mysterious_card { get; set; }
        public string description { get; set; }
        public int reward { get; set; }



        public MysteriousCard(int id_card, string description, int reward)
        {
            this.id_mysterious_card = id_card;
            this.description = description;
            this.reward = reward;

        }

        public MysteriousCard()
        {
        }

    }

}
