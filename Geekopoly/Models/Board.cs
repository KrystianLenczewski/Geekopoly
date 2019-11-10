using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Board
    {

        [Key]
        public int id_board { get; private set; }
        public List<Player> players;
        public List<Field> fields;
        private MysteriousCard[] mysterious_cards = new MysteriousCard[40];
        public int current_player_index { get; set; }
        public Board()
        {
        }

        public Board(Player player1, Player player2)
        {
            players = new List<Player>();
            // Method to get Fields
            players.Add(player1);
            players.Add(player2);
        }

        public Board(Player player1, Player player2, Player player3)
        {
            players = new List<Player>();
            // Method to get Fields
            players.Add(player1);
            players.Add(player2);
            players.Add(player3);
        }

        public Board(Player player1, Player player2, Player player3, Player player4)
        {
            players = new List<Player>();
            // Method to get Fields
            players.Add(player1);
            players.Add(player2);
            players.Add(player3);
            players.Add(player4);
        }

        public void initialize_board()
        {
            current_player_index = 0;
            players = new List<Player>()
            {
                new Player(0,"Krystian"),
                new Player(1,"Tomek"),
                new Player(2,"Maciej"),
                new Player(3,"Zbigniew")
            };
            fields = new List<Field>()
            {
                new Field(0,"Start")
            };
        }

        // Method to get the Field list

    
}
}
