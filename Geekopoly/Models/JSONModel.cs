using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class JSONModel
    {
        public List<Field> field_list { get; set; }
        public List<Property> property_list { get; set; }
        public List<Category> category_list { get; set; }
        public List<Player> player_list { get; set; }
    }
}
