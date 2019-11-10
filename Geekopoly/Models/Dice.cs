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
        public int id_dices {get;set;}
        public int numbers { get; set; }

        public Dice(int value) {
        
            this.numbers = value;
        }

        public Dice()
        {
        }
    }
}
