using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class GoToPrison 
    {
        [Key]
        public int id_go_to_prison { get; set; }
        public string description { get; set; }
        private int id_prison = 10;

        public GoToPrison(int id, string name, string description) 
        {
            this.description = description;
           
        }

        public GoToPrison()
        {
        }
    }
}
