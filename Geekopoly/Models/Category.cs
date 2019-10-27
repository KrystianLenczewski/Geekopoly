using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Category
    {
        [Key]
        public int id_category { get; private set; }
        public string name { get; }
        private int[] prices = new int[3];
        private int[] normal_penalties = new int[3];
        private int[] neighbour_penalties = new int[3];
        public Category()
        {
            prices[0] = 0;
            prices[1] = 0;
            prices[2] = 0;
            normal_penalties[0] = 0;
            normal_penalties[0] = 0;
            normal_penalties[0] = 0;
            neighbour_penalties[0] = 0;
            neighbour_penalties[0] = 0;
            neighbour_penalties[0] = 0;
        }

        

    }
}
