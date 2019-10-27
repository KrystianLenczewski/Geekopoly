using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class MysteriousCardGenerator
    {
        private static readonly Random rng = new Random();
        private static List<Func<Player, string>> list_of_mysterious_cards = new List<Func<Player, string>>
            {

            bank_is_giving_money,
        you_are_receive_bonus,
        give_cash_to_other_player

    };

        private static string bank_is_giving_money(Player player)
        {
            player.increment_money(200);
            return "Player receive 200 cash";
        }
        private static string you_are_receive_bonus(Player player)
        {
            player.increment_money(50);
            return "You receive 50";
        }
        private static string give_cash_to_other_player(Player player)
        {
            return "Other player receive cash";
        }

        public static string GeneratorRandomCard(Player player)
        {
            list_of_mysterious_cards = list_of_mysterious_cards.OrderBy(x => rng.Next()).ToList();

            Func<Player, string> random_mysterious_card = list_of_mysterious_cards[rng.Next(0, 3)];
            return random_mysterious_card.Invoke(player);
        }


    }
}
