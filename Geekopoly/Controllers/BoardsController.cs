using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Geekopoly.Data;
using Geekopoly.Models;
using System.Data.SqlClient;

namespace Geekopoly.Controllers
{
    public class BoardsController : Controller
    {
        private readonly GeekopolyContext _context;
        public BoardsController(GeekopolyContext context)
        {
            _context = context;
        }
        [HttpGet]
        public JsonResult Json()
        {
            GeekopolyContext _context = new GeekopolyContext();

            List<Field> fields = _context.Fields.ToList();
            List<Property> properties = _context.Properties.ToList();
            List<Board> boards = _context.Boards.ToList();
            List<Category> categories = _context.Categories.ToList();
            List<Player> players = _context.Players.ToList();

            properties = _context.Properties.ToList();
            categories = _context.Categories.ToList();
            fields = _context.Fields.ToList();
            players = _context.Players.ToList();
            boards = _context.Boards.ToList();
            JSONModel jsonmodel = new JSONModel();
            jsonmodel.category_list = categories;
            jsonmodel.field_list = fields;
            jsonmodel.property_list = properties;
            jsonmodel.player_list = players;
            jsonmodel.board_list = boards;
            return Json(jsonmodel);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_player,name,amount_of_cash,position,is_in_jail")] Player player)
        {
            if (ModelState.IsValid)
            {
                _context.Add(player);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(player);
        }

        public IActionResult Game()
        {
            GeekopolyContext _context = new GeekopolyContext();
            List<Player> players = new List<Player>();
            List<Board> board = _context.Boards.ToList();
            List<Dice> dices = _context.Dices.ToList();
            List<Field> fields = _context.Fields.ToList();
            players = _context.Players.ToList();
            board = _context.Boards.ToList();
            fields = _context.Fields.ToList();
            GameModel game = new GameModel();
            game.board = board;
            game.player_list = players;
            game.dices_value = dices;
            game.field_list = fields;
            
                    var json = Json();
            
            return View(game);
        }

        //[HttpPost]
        //public IActionResult Game(int value)
        //{
        //    var received_value = value;
        //    return View();
        //}

        [HttpPost]
        public IActionResult Game([FromBody] RollingDicesReturnModel return_model)
        {

            GeekopolyContext _context = new GeekopolyContext();
            int dices_value = return_model.numbers;
            int value_of_decision = return_model.decision_value;
            int current_player_index = 0;
            List<Dice> dices = _context.Dices.ToList();
            List<Player> player = _context.Players.ToList();
            List<Board> board = _context.Boards.ToList();
            List<Field> field = _context.Fields.ToList();
            List<Property> property = _context.Properties.ToList();
            List<Category> category = _context.Categories.ToList();
            List<Decision> decision = _context.Decisions.ToList();
            List<Start> start = _context.Starts.ToList();

            var selected_board = (from b in board
                                  select b
                     );

            foreach(Board b in selected_board)
            {
                current_player_index = b.current_player_index;
            }

            var current_decision = (from d in decision
                                    select d);

            foreach (Decision d in current_decision)
            {
                d.decision_value = value_of_decision;
            }

            var current_player = (from p in player
                                  where p.id_player == current_player_index + 1
                                  select p
                   );

            if (value_of_decision < 0)
            {

                var current_dices = (from d in dices
                                     select d);

                foreach (Dice d in current_dices)
                {
                    d.numbers = dices_value;
                }


                foreach (Board b in board)
                {
                    current_player_index = b.current_player_index;
                    if (player[current_player_index].is_in_jail == true)
                    {
                        int next_index = player[current_player_index].find_next_free_player_id(current_player_index + 1) - 1;
                        if (next_index >= 0)
                        {
                            player[current_player_index].is_in_jail = false;
                            current_player_index = next_index;

                        }
                        else
                        {
                            foreach (Player p in player)
                            {
                                p.is_in_jail = false;
                            }
                            b.current_player_index = 0;
                            current_player_index = 0;
                        }
                    }
                }

                foreach (Player p in current_player)
                {
                    int current_position = p.position;
                    if (((current_position + dices_value) % 40) <= current_position)
                    {
                        p.amount_of_cash += 200;
                    }
                    p.position = (current_position + dices_value) % 40;
                }
                player[current_player_index].field_action();

            }

            if (dices_value < 0)
            {
                switch (value_of_decision) {
                    case 1:
                        if (current_player_index != 0) current_player_index = current_player_index - 1;
                        else current_player_index = 3;
                             var field_idd = player[current_player_index].position;
                            var current_propertyy = new Property();
                            var current_categoryy = new Category();
                            foreach (Property pr in property)
                            {
                                if (pr.fieldFK == field_idd)
                                {
                                current_propertyy = pr;
                                }
                            }

                            foreach (Category c in category)
                            {
                                if (c.id_category == current_propertyy.categoryFK)
                                {
                                current_categoryy = c;
                                }
                            }
                            if (current_propertyy.ownerFK == null)
                            {
                                if (player[current_player_index].amount_of_cash < current_categoryy.entry_value)
                                {
                                    break;
                                }
                                else
                                {
                                player[current_player_index].amount_of_cash -= current_categoryy.entry_value;
                                current_propertyy.owner = player[current_player_index];
                                current_propertyy.ownerFK = player[current_player_index].id_player;
                                current_propertyy.type_of_property = 1;
                                }
                            
                        }
                        break;
                    case 2:
                        if (current_player_index != 0) current_player_index = current_player_index - 1;
                        else current_player_index = 3;
                        var field_id_upgrade = player[current_player_index].position;
                        var current_property_upgrade = new Property();
                        var current_category_upgrade = new Category();
                        foreach (Property pr in property)
                            {
                                if (pr.fieldFK == field_id_upgrade)
                                {
                                current_property_upgrade = pr;
                                }
                            }

                            foreach (Category c in category)
                            {
                                if (c.id_category == current_property_upgrade.categoryFK)
                                {
                                current_category_upgrade = c;
                                }
                            }
                            if (current_property_upgrade.ownerFK == player[current_player_index].id_player)
                            {
                                if (player[current_player_index].amount_of_cash < current_category_upgrade.entry_value)
                                {
                                    break;
                                }
                                else
                                {
                                player[current_player_index].amount_of_cash -= current_category_upgrade.entry_value;
                                current_property_upgrade.type_of_property += 1;
                                }
                            }
                        
                        break;
                    case 3:
                        if (current_player_index != 0) current_player_index = current_player_index - 1;
                        else current_player_index = 3;
                        var field_id = player[current_player_index].position;
                            var enemy_player = new Player();
                            var current_property = new Property();
                            var current_category = new Category();
                            foreach (Property pr in property)
                            {
                                if (pr.fieldFK == field_id)
                                {
                                    current_property = pr;
                                }
                            }

                            foreach (Category c in category)
                            {
                                if (c.id_category == current_property.categoryFK)
                                {
                                    current_category = c;
                                }
                            }
                        
                            for (var i = 0; i < 4; i++) { 
                                if(player[i].id_player == current_property.ownerFK)
                                {
                                enemy_player.id_player = player[i].id_player;
                               
                                enemy_player.amount_of_cash = player[i].amount_of_cash;
                                }
                            }

                            int penalty = current_category.entry_value + ((current_category.upgrade_cost*(current_property.type_of_property.Value - 1)) - 50);

                        player[current_player_index].amount_of_cash -= penalty;
                         enemy_player.amount_of_cash += penalty;
                        if (enemy_player.id_player == 0) enemy_player.id_player = 4;
                        else enemy_player.id_player = enemy_player.id_player - 1;
                         player[enemy_player.id_player].amount_of_cash += penalty;
                        // player[enemy_player.id_player].amount_of_cash += penalty;
                        break;
                    case 4:
                        if (current_player_index != 0) current_player_index = current_player_index - 1;
                        else current_player_index = 3;
                        
                            player[current_player_index].is_in_jail = false;
                        
                        break;
                    case 5:
                        if (current_player_index != 0) current_player_index = current_player_index - 1;
                        else current_player_index = 3;
                        player[current_player_index].amount_of_cash -= 100;
                        player[current_player_index].is_in_jail = false;
                        
                        break;
                    case 6:
                        foreach (Player p in current_player)
                        {
                            var current_field_id = p.position;
                            var current_reward_field = new Start();
                            foreach (Start s in start)
                            {
                                if (s.fieldFK == current_field_id)
                                {
                                    current_reward_field = s;
                                }
                            }
                            p.amount_of_cash += current_reward_field.reward;
                            
                        }
                        break;

                }



            }
                foreach (Board b in board)
                {
                    b.current_player_index = (current_player_index + 1) % 4;
                }

            try
            {
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }



            return View();
        }


        public IActionResult Quit()
        {
            
          
           
            return RedirectToAction("Index", "Players", new { area = "Admin" });
        }


        public IActionResult NewGame()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> NewGame([Bind("id_player,name,amount_of_cash,position,is_in_jail")] Player player)
        {
            if (ModelState.IsValid)
            {
                _context.Add(player);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(player);
        }
        // GET: Boards
        public async Task<IActionResult> Index()
        {

            return RedirectToAction("Edit", new { id = 1 });
        }

        // GET: Boards/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var board = await _context.Boards
                .FirstOrDefaultAsync(m => m.id_board == id);
            if (board == null)
            {
                return NotFound();
            }

            return View(board);
        }

        // GET: Boards/Create
       
     

        // POST: Boards/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("id_board")] Board board)
        {


            board.initialize_board();

            if (ModelState.IsValid)
            {
                _context.Add(board);
                await _context.SaveChangesAsync();
                return RedirectToAction("Game", "Boards");
            }
            return View(board);
        }


        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var board = await _context.Boards.FindAsync(id);
            board.current_player_index = 0;
            _context.Update(board);
            await _context.SaveChangesAsync();
            return RedirectToAction("Game");

        }

        // POST: Boards/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
       

        // GET: Boards/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var board = await _context.Boards
                .FirstOrDefaultAsync(m => m.id_board == id);
            if (board == null)
            {
                return NotFound();
            }

            return View(board);
        }

        // POST: Boards/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var board = await _context.Boards.FindAsync(id);
            _context.Boards.Remove(board);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BoardExists(int id)
        {
            return _context.Boards.Any(e => e.id_board == id);
        }
    }
}