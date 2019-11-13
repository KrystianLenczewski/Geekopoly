using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Geekopoly.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    id_board = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    current_player_index = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.id_board);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    id_category = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.id_category);
                });

            migrationBuilder.CreateTable(
                name: "Decisions",
                columns: table => new
                {
                    id_decision = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    decision_value = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Decisions", x => x.id_decision);
                });

            migrationBuilder.CreateTable(
                name: "Dices",
                columns: table => new
                {
                    id_dices = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    numbers = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dices", x => x.id_dices);
                });

            migrationBuilder.CreateTable(
                name: "Fields",
                columns: table => new
                {
                    id_field = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true),
                    field_type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fields", x => x.id_field);
                });

            migrationBuilder.CreateTable(
                name: "GoToPrisons",
                columns: table => new
                {
                    id_go_to_prison = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoToPrisons", x => x.id_go_to_prison);
                });

            migrationBuilder.CreateTable(
                name: "MysteriousCards",
                columns: table => new
                {
                    id_mysterious_card = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MysteriousCards", x => x.id_mysterious_card);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    id_player = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true),
                    amount_of_cash = table.Column<int>(nullable: false),
                    position = table.Column<int>(nullable: false),
                    is_in_jail = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.id_player);
                });

            migrationBuilder.CreateTable(
                name: "Prisons",
                columns: table => new
                {
                    id_prison = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prisons", x => x.id_prison);
                });

            migrationBuilder.CreateTable(
                name: "Starts",
                columns: table => new
                {
                    id_start = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Starts", x => x.id_start);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    id_property = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    id_category = table.Column<int>(nullable: false),
                    type_of_property = table.Column<int>(nullable: false),
                    ownerid_player = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.id_property);
                    table.ForeignKey(
                        name: "FK_Properties_Players_ownerid_player",
                        column: x => x.ownerid_player,
                        principalTable: "Players",
                        principalColumn: "id_player",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Properties_ownerid_player",
                table: "Properties",
                column: "ownerid_player");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Boards");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Decisions");

            migrationBuilder.DropTable(
                name: "Dices");

            migrationBuilder.DropTable(
                name: "Fields");

            migrationBuilder.DropTable(
                name: "GoToPrisons");

            migrationBuilder.DropTable(
                name: "MysteriousCards");

            migrationBuilder.DropTable(
                name: "Prisons");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "Starts");

            migrationBuilder.DropTable(
                name: "Players");
        }
    }
}
