using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Geekopoly.Data;
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
        public int amount_of_cash { get; set; } = initial_player_money;
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

        public void field_action()
        {
            GeekopolyContext gp = new GeekopolyContext();

            List<Field> fields = new List<Field>();
            List<MysteriousCard> mysterious_cards = new List<MysteriousCard>();
            List<Start> starts = new List<Start>();
            List<GoToPrison> go_to_prisons = new List<GoToPrison>();
            List<Prison> prisons = new List<Prison>();
            List<Property> properties = new List<Property>();

            Field current_field = null;
            MysteriousCard mysterious_card = null;
            Start start = null;
            GoToPrison go_to_prison = null;
            Prison prison = null;
            Property property = null;

            int current_position = this.position;

            fields = gp.Fields.ToList();

            foreach(Field f in fields)
            {
                if(f.id_field == current_position)
                {
                    current_field = f;
                    break;
                }
            }

            int type_of_field = current_field.type;

            switch (type_of_field)
            {
                // Mysterious Card
                case 0:
                    foreach (MysteriousCard m in mysterious_cards)
                    {
                        if (m.id_mysterious_card == current_field.id_field)
                        {
                            mysterious_card = m;
                            break;
                        }
                    }
                    break;
                // Start
                case 1:
                    foreach (Start s in starts)
                    {
                        if (s.id_start == current_field.id_field) {
                            start = s;
                            break;
                        }
                    }
                    break;
                // Go To Prison
                case 2:
                    foreach (GoToPrison gtp in go_to_prisons)
                    {
                        if (gtp.id_go_to_prison == current_field.id_field)
                        {
                            go_to_prison = gtp;
                            break;
                        }
                    }
                    break;
                // Prison
                case 3:
                    foreach (Prison p in prisons)
                    {
                        if (p.id_prison == current_field.id_field)
                        {
                            prison = p;
                            break;
                        }
                    }
                    break;
                // Property
                case 4:
                    foreach (Property pr in properties)
                    {
                        if(pr.id_property == current_field.id_field)
                        {
                            property = pr;
                            break;
                        }
                    }
                    break;
                default:

                    break;
            }
                




        }

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
