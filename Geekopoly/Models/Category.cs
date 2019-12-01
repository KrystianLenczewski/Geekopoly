using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Category
    {
        [Key]
        public int id_category { get; private set; }
        public string name { get; set; }

        // Value to buy
        public int entry_value { get; set; }
        public int upgrade_cost { get; set; }
        //private int[] prices = new int[3];
        //private int[] normal_penalties = new int[3];
        //private int[] neighbour_penalties = new int[3];
        public Category()
        {
            //prices[0] = entry_value;
            //prices[1] = prices[0] + upgrade_cost;
            //prices[2] = prices[1] + upgrade_cost;
            //normal_penalties[0] = prices[0] - 50;
            //normal_penalties[1] = prices[1] - 50;
            //normal_penalties[2] = prices[2] - 50;
            //neighbour_penalties[0] = prices[0];
            //neighbour_penalties[1] = prices[0];
            //neighbour_penalties[2] = prices[0];
        }

        

    }
}
