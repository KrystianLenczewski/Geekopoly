using Geekopoly.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Geekopoly.Data
{
    public class GeekopolyContext : DbContext
    {
        public GeekopolyContext(DbContextOptions<GeekopolyContext> options)
            : base(options)
        {
        }

        public GeekopolyContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Server = (localdb)\\mssqllocaldb;Database=GeekopolyContext-22");
            }
        }



        public DbSet<Decision> Decisions { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Dice> Dices { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<GoToPrison> GoToPrisons { get; set; }
        public DbSet<MysteriousCard> MysteriousCards { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Prison> Prisons { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Start> Starts { get; set; }
    }
}
