using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Player
    {
        public const int initial_player_money = 2000;
        public const int total_number_of_fields = 40;
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_player { get; set; }
        public string name { get; set; }
        public int amount_of_cash { get; private set; } = initial_player_money;
        public int position { get; set; }
        public bool is_in_jail { get; private set; } = false;
        public List<Property> Properties { get; set; } = new List<Property>();


        public Player(int id_player, string name)
        {
            this.id_player = id_player;
            this.name = name;
        }

        public Player()
        {
        }

        //methods 

        public void new_position(int new_position)
        {
            int pom = new_position;
            if (pom < 0)
            {
                pom += total_number_of_fields;
            }
            if (pom >= total_number_of_fields)
            {
                pom = pom - total_number_of_fields;
                this.increment_money(200);
            }
            this.position = pom;
        }
        public void increment_money(int money)
        {
            this.amount_of_cash += money;
        }
        public void decrement_money(int money)
        {
            this.amount_of_cash -= money;
        }


    }
}
