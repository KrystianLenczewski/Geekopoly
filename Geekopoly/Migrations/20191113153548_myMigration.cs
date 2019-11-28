using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Geekopoly.Migrations
{
    public partial class myMigration : Migration
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
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true),
                    entry_value = table.Column<int>(nullable: false),
                    upgrade_cost = table.Column<int>(nullable: false)
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
                name: "GoToPrisons",
                columns: table => new
                {
                    id_go_to_prison = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    description = table.Column<string>(nullable: true),
                    fieldFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoToPrisons", x => x.id_go_to_prison);
                    table.ForeignKey(
                        name: "FK_GoToPrisons_Fields_fieldFK",
                        column: x => x.fieldFK,
                        principalTable: "Fields",
                        principalColumn: "id_field",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MysteriousCards",
                columns: table => new
                {
                    id_mysterious_card = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FieldFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MysteriousCards", x => x.id_mysterious_card);
                    table.ForeignKey(
                        name: "FK_MysteriousCards_Fields_FieldFK",
                        column: x => x.FieldFK,
                        principalTable: "Fields",
                        principalColumn: "id_field",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Prisons",
                columns: table => new
                {
                    id_prison = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    description = table.Column<string>(nullable: true),
                    fieldFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prisons", x => x.id_prison);
                    table.ForeignKey(
                        name: "FK_Prisons_Fields_fieldFK",
                        column: x => x.fieldFK,
                        principalTable: "Fields",
                        principalColumn: "id_field",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Starts",
                columns: table => new
                {
                    id_start = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    reward = table.Column<int>(nullable: false),
                    fieldFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Starts", x => x.id_start);
                    table.ForeignKey(
                        name: "FK_Starts_Fields_fieldFK",
                        column: x => x.fieldFK,
                        principalTable: "Fields",
                        principalColumn: "id_field",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    id_property = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    type_of_property = table.Column<int>(nullable: true),
                    ownerFK = table.Column<int>(nullable: true),
                    fieldFK = table.Column<int>(nullable: false),
                    categoryFK = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.id_property);
                    table.ForeignKey(
                        name: "FK_Properties_Fields_fieldFK",
                        column: x => x.fieldFK,
                        principalTable: "Fields",
                        principalColumn: "id_field",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Properties_Players_ownerFK",
                        column: x => x.ownerFK,
                        principalTable: "Players",
                        principalColumn: "id_player",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GoToPrisons_fieldFK",
                table: "GoToPrisons",
                column: "fieldFK");

            migrationBuilder.CreateIndex(
                name: "IX_MysteriousCards_FieldFK",
                table: "MysteriousCards",
                column: "FieldFK");

            migrationBuilder.CreateIndex(
                name: "IX_Prisons_fieldFK",
                table: "Prisons",
                column: "fieldFK");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_fieldFK",
                table: "Properties",
                column: "fieldFK");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_ownerFK",
                table: "Properties",
                column: "ownerFK");

            migrationBuilder.CreateIndex(
                name: "IX_Starts_fieldFK",
                table: "Starts",
                column: "fieldFK");
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

            migrationBuilder.DropTable(
                name: "Fields");
        }
    }
}
