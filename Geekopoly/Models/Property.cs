using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Models
{
    public class Property
    {
        [Key]
        public int id_property { get; set; }
        public int? type_of_property { get; set; }
        public virtual Player owner { get; set; }
        [ForeignKey("owner")]
        public int? ownerFK { get; set; }
        public virtual Field field { get; set; }
        [ForeignKey("field")]
        public int fieldFK { get; set; }
        public int categoryFK { get; set; }
        public Property()
        {

        }
        public Property(int id, string name, int id_property, int id_category, int type_of_property, Player owner) 
        {
            this.id_property = id_property;
            this.categoryFK = id_category;
            this.type_of_property = type_of_property;
            this.owner = owner;
        }

       /* public override string ActOnPlayer(Player player)
        {
            if(this.owner==player)
            {
                return "You alerady own this";
            }
            else if(this.owner==null)
            {
                return "This you can buy";
            }
            else
            {
                player.decrement_money(100);
                this.owner.increment_money(100);
                return string.Format("{0}\n is owned by Player{1}.\nYou padi him!", this.name, player.id_player);

            }
        }*/

    }
}
