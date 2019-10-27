using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Geekopoly.Migrations
{
    public partial class newdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fields_Players_ownerid_player",
                table: "Fields");

            migrationBuilder.DropIndex(
                name: "IX_Fields_ownerid_player",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "description",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "id_prison",
                table: "Fields");

            migrationBuilder.DropColumn(
                name: "ownerid_player",
                table: "Fields");

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

            migrationBuilder.CreateIndex(
                name: "IX_Properties_ownerid_player",
                table: "Properties",
                column: "ownerid_player");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Fields",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "Fields",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "id_prison",
                table: "Fields",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ownerid_player",
                table: "Fields",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fields_ownerid_player",
                table: "Fields",
                column: "ownerid_player");

            migrationBuilder.AddForeignKey(
                name: "FK_Fields_Players_ownerid_player",
                table: "Fields",
                column: "ownerid_player",
                principalTable: "Players",
                principalColumn: "id_player",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
