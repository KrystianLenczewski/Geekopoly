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
        [HttpGet]
        public JsonResult Json()
        {
            GeekopolyContext _context = new GeekopolyContext();

            List<Field> fields = _context.Fields.ToList();
            fields = _context.Fields.ToList();
            return Json(fields);
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

        [HttpPost]
        public IActionResult Game([FromBody] Dice dice)
        {

            GeekopolyContext _context = new GeekopolyContext();
            int dices_value = dice.numbers;
            int current_player_index = 0;
            List<Dice> dices = _context.Dices.ToList();
            List<Player> player = _context.Players.ToList();
            List<Board> board = _context.Boards.ToList();
            List<Field> field = _context.Fields.ToList();

            var current_dices = (from d in dices
                                 select d);

            foreach (Dice d in current_dices)
            {
                d.numbers = dices_value;
            }

            var selected_board = (from b in board
                                  select b
                                 );

            foreach (Board b in board)
            {
                current_player_index = b.current_player_index;
            }


            var current_player = (from p in player
                                  where p.id_player == current_player_index + 1
                                  select p
                               );
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
            return RedirectToAction(nameof(Index));
        }


        // GET: Boards
        public async Task<IActionResult> Index()
        {
            return View(await _context.Boards.ToListAsync());
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
        public IActionResult Create()
        {
            return View();
        }

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

        // GET: Boards/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var board = await _context.Boards.FindAsync(id);
            if (board == null)
            {
                return NotFound();
            }
            return View(board);
        }

        // POST: Boards/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("id_board")] Board board)
        {
            if (id != board.id_board)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(board);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BoardExists(board.id_board))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(board);
        }

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