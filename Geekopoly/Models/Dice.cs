using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Dice
    {
        [Key]
        public int id_dice { get; private set; }
        public int value { get; set; }

        public Dice(int id_dice, int value)
        {
            this.id_dice = id_dice;
            this.value = value;
        }

        public Dice()
        {
        }
    }
}
