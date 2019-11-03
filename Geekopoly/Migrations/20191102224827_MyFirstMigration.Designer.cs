﻿// <auto-generated />
using System;
using Geekopoly.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Geekopoly.Migrations
{
    [DbContext(typeof(GeekopolyContext))]
    [Migration("20191102224827_MyFirstMigration")]
    partial class MyFirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Geekopoly.Models.Board", b =>
                {
                    b.Property<int>("id_board")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("id_board");

                    b.ToTable("Boards");
                });

            modelBuilder.Entity("Geekopoly.Models.Category", b =>
                {
                    b.Property<int>("id_category")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("id_category");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Geekopoly.Models.Dice", b =>
                {
                    b.Property<int>("id_dice")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("value");

                    b.HasKey("id_dice");

                    b.ToTable("Dices");
                });

            modelBuilder.Entity("Geekopoly.Models.Field", b =>
                {
                    b.Property<int>("id_field")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name");

                    b.HasKey("id_field");

                    b.ToTable("Fields");
                });

            modelBuilder.Entity("Geekopoly.Models.GoToPrison", b =>
                {
                    b.Property<int>("id_go_to_prison")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("description");

                    b.HasKey("id_go_to_prison");

                    b.ToTable("GoToPrisons");
                });

            modelBuilder.Entity("Geekopoly.Models.MysteriousCard", b =>
                {
                    b.Property<int>("id_mysterious_card")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("id_mysterious_card");

                    b.ToTable("MysteriousCards");
                });

            modelBuilder.Entity("Geekopoly.Models.Player", b =>
                {
                    b.Property<int>("id_player")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("amount_of_cash");

                    b.Property<bool>("is_in_jail");

                    b.Property<string>("name");

                    b.Property<int>("position");

                    b.HasKey("id_player");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("Geekopoly.Models.Prison", b =>
                {
                    b.Property<int>("id_prison")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("description");

                    b.Property<string>("name");

                    b.HasKey("id_prison");

                    b.ToTable("Prisons");
                });

            modelBuilder.Entity("Geekopoly.Models.Property", b =>
                {
                    b.Property<int>("id_property")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("id_category");

                    b.Property<int?>("ownerid_player");

                    b.Property<int>("type_of_property");

                    b.HasKey("id_property");

                    b.HasIndex("ownerid_player");

                    b.ToTable("Properties");
                });

            modelBuilder.Entity("Geekopoly.Models.Start", b =>
                {
                    b.Property<int>("id_start")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name");

                    b.HasKey("id_start");

                    b.ToTable("Starts");
                });

            modelBuilder.Entity("Geekopoly.Models.Property", b =>
                {
                    b.HasOne("Geekopoly.Models.Player", "owner")
                        .WithMany("Properties")
                        .HasForeignKey("ownerid_player");
                });
#pragma warning restore 612, 618
        }
    }
}
