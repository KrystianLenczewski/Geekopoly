using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class GoToPrison 
    {
        [Key]
        public int id_go_to_prison { get; set; }
        public string description { get; set; }
        public Field field { get; set; }
        [ForeignKey("field")]
        public int fieldFK { get; set; }

        public GoToPrison(int id, string name, string description) 
        {
            this.description = description;
           
        }

        public GoToPrison()
        {
        }
    }
}
