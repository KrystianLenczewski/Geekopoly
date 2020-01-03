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
        public bool is_in_jail { get; set; } = false;
        public bool is_active { get; set; } = true;
        //public List<Property> Properties { get; set; } = new List<Property>();


        public Player(int id_player, string name)
        {
            this.id_player = id_player;
            this.name = name;
            this.position = position;
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

            int type_of_field = current_field.field_type;


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
                            
                        }
                    }
                    
                    this.position = 10;
                    goto case 3;
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
                    this.is_in_jail = true;
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

        public int find_next_free_player_id(int current_player_id)
        {
            GeekopolyContext gp = new GeekopolyContext();
            List<Player> player = gp.Players.ToList();
            bool found_flag = false;
            int value;
            int minimum = 0;
            int maximum = 0;
            int counter = 0;
            int current_position;
            int return_value = 0;

            switch (current_player_id){
                case 1:
                    value = 4;
                    int difference = 4;
                    foreach(Player p in player)
                    {
                        if (p.id_player != current_player_id && p.is_in_jail == false && p.is_active==true)
                        {
                            if (Math.Abs(current_player_id - p.id_player) < difference )
                            {
                                difference = Math.Abs(current_player_id - p.id_player);
                                value = p.id_player;
                                found_flag = true;
                            }
                        }
                    }
                    if(value == 4)
                    {
                        return_value = 0;
                    }
                    else
                    {
                        return_value = value;
                    }
                    break;
                case 2:
                    counter = 0;
                    current_position = current_player_id-1;
                    int min_difference = 3;
                    int max_difference = 0;
                    while (counter<3)
                    {
                        if (player[current_position].id_player != current_player_id && player[current_position].is_in_jail == false && player[current_position].is_active==true)
                        {
                            if (Math.Abs(current_player_id - player[current_position].id_player) < min_difference   && player[current_position].id_player > current_player_id)
                            {
                                min_difference = Math.Abs(current_player_id - player[current_position].id_player);
                                minimum = player[current_position].id_player;
                                found_flag = true;
                            }
                            else if(max_difference < Math.Abs(current_player_id - player[current_position].id_player) && player[current_position].id_player > current_player_id)
                            {
                                max_difference = Math.Abs(current_player_id - player[current_position].id_player);
                                maximum = player[current_position].id_player;
                                found_flag = true;
                            }
                            else if(minimum == 3 && maximum == 0){
                                minimum = player[current_position].id_player;
                                found_flag = true;
                            }
                        }
                        current_position = (current_position + 1) % 4;
                        counter++;
                    }
                    if (found_flag)
                    {
                        if (minimum>current_player_id)
                        {
                            return_value = minimum;
                        }
                        else if(minimum<current_player_id && maximum == 3)
                        {
                            return_value = minimum;
                        }
                        else
                        {
                            return_value = maximum;
                        }
                    }
                    else
                    {
                        return_value = 0;
                    }
                    current_position++;
                    break;
                case 3:
                    counter = 0;
                    min_difference = 3;
                    max_difference = 0;
                    current_position = current_player_id - 1;
                    while (counter < 3)
                    {
                        if (player[current_position].id_player != current_player_id && player[current_position].is_in_jail == false && player[current_position].is_active==true)
                        {
                            if (min_difference > Math.Abs(current_player_id - player[current_position].id_player) && player[current_position].id_player > current_player_id)
                            {
                                min_difference = Math.Abs(current_player_id - player[current_position].id_player);
                                minimum = player[current_position].id_player;
                                found_flag = true;
                            }
                            else if (max_difference < Math.Abs(current_player_id - player[current_position].id_player) && player[current_position].id_player > current_player_id)
                            {
                                max_difference = Math.Abs(current_player_id - player[current_position].id_player);
                                maximum = player[current_position].id_player;
                                found_flag = true;
                            }
                            else if (minimum == 3 && maximum == 0)
                            {
                                minimum = player[current_position].id_player;
                                found_flag = true;
                            }
                        }
                        current_position = (current_position + 1) % 4;
                        counter++;
                    }
                    if (found_flag)
                    {
                        if (minimum > current_player_id)
                        {
                            return_value = minimum;
                        }
                        else if (minimum < current_player_id && maximum == 3)
                        {
                            return_value = minimum;
                        }
                        else
                        {
                            return_value = maximum;
                        }
                    }
                    else
                    {
                        return_value = 0;
                    }
                    current_position++;
                    break;
                case 4:
                    value = 0;
                    difference = 0;
                    foreach (Player p in player)
                    {
                        if (p.id_player != current_player_id && p.is_in_jail == false && p.is_active==true)
                        {
                            if (difference < Math.Abs(current_player_id - p.id_player))
                            {
                                difference = Math.Abs(current_player_id - p.id_player);
                                value = p.id_player;
                                found_flag = true;
                            }
                        }
                    }
                    if (value == 0)
                    {
                        return_value = 0;
                    }
                    else
                    {
                        return_value = value;
                    }
                    break;
                default:
                    break;
            }

            return return_value;

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
