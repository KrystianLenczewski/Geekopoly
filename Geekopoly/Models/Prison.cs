using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Prison
    {
        [Key]
        public int id_prison { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public Prison()
        {
        }


    }
}
