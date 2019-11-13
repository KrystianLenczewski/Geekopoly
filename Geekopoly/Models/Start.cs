using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{

    public class Start 
    {
        [Key]
        public int id_start { get; set; }
        public int reward { get; set; }
        public Field field { get; set; }
        [ForeignKey("field")]
        public int fieldFK { get; set; }
        public Start()
        {

        }
        public Start(int id, string name) { }
    }
}
