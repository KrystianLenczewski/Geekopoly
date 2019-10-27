using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{

    public class Start 
    {
        [Key]
        public int id_start { get; set; }
        public string name { get; set; }
        public static int reward { get; } = 200;
        public Start()
        {

        }
        public Start(int id, string name) { }
    }
}
