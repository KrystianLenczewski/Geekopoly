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
    [Migration("20191020132628_initialmig22222")]
    partial class initialmig22222
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
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

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("name");

                    b.HasKey("id_field");

                    b.ToTable("Fields");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Field");
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

            modelBuilder.Entity("Geekopoly.Models.GoToPrison", b =>
                {
                    b.HasBaseType("Geekopoly.Models.Field");

                    b.Property<string>("description");

                    b.Property<int>("id_prison");

                    b.ToTable("GoToPrison");

                    b.HasDiscriminator().HasValue("GoToPrison");
                });

            modelBuilder.Entity("Geekopoly.Models.MysteriousCard", b =>
                {
                    b.HasBaseType("Geekopoly.Models.Field");


                    b.ToTable("MysteriousCard");

                    b.HasDiscriminator().HasValue("MysteriousCard");
                });

            modelBuilder.Entity("Geekopoly.Models.Prison", b =>
                {
                    b.HasBaseType("Geekopoly.Models.Field");


                    b.ToTable("Prison");

                    b.HasDiscriminator().HasValue("Prison");
                });

            modelBuilder.Entity("Geekopoly.Models.Property", b =>
                {
                    b.HasBaseType("Geekopoly.Models.Field");

                    b.Property<int?>("ownerid_player");

                    b.HasIndex("ownerid_player");

                    b.ToTable("Property");

                    b.HasDiscriminator().HasValue("Property");
                });

            modelBuilder.Entity("Geekopoly.Models.Start", b =>
                {
                    b.HasBaseType("Geekopoly.Models.Field");


                    b.ToTable("Start");

                    b.HasDiscriminator().HasValue("Start");
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