using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class GameModel
    {
        public List<Board> board { get; set; }
        public List<Player> player_list { get; set; }
        public List<Dice> dices_value { get; set; }

    }
}
