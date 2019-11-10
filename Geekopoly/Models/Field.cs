using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Field
    {
        [Key]
        public int id_field { get; set; }
        public string name { get; set; }

        // Type says which type of Field is it: 0 - Mysterious Card, 1 - Start, 2 - GoToPrison, 3 - Prison, 4 - Property
        public int type { get; set; }

        public Field()
        {
            id_field = 0;
            name = "";
        }

        public Field(int id, string name)
        {
            this.id_field = id;
            this.name = name;
        }
        string ActOnPlayer(Player player)
        {
            if(this.id_field==0)
            {
                player.increment_money(200);
                return "You landed on GO field\nCollect 200";
            }
            else if(this.id_field==10)
            {
                return "You are going to Jail";
            }
            else if(this.id_field==20)
            {
                return "You are landing on free parking. Nothing happend";
            }
            else
            {
                return "You are in jail. You will skip next one round";
            }
        }
    }
}
