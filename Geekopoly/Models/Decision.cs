using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Decision
    {
        [Key]
        public int id_decision { get; set; }
        public int decision_value { get; set; }
    }
}
