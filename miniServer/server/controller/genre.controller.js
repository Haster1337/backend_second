const db = require('../db');

class GenreController {
  async createGenre(req, res){
    const {name} = req.body;
    const newGenre = await db.query(`INSERT INTO genre (genre_name) values ($1) RETURNING *`, [name])
    res.send(newGenre.rows[0]);
  }

  async getGenres(req, res){
    const genres = await db.query(`SELECT * FROM genre`);
    res.send(genres.rows);
  }

  async getOneGenre(req, res){
    const id = req.params.id
    const genre = await db.query(`SELECT * FROM genre where genre.genre_id = ($1)`, [id]);
    res.send(genre.rows);
  }

  async updateGenre(req, res){
    const {id, name} = req.body;
    const genre = await db.query(`UPDATE genre set genre_name = $1 WHERE genre_id = $2 RETURNING *`,
      [name, id])
    res.send(genre.rows[0]);
  }

  async deleteGenre(req, res){
    const id = req.params.id
    const genre = await db.query(`DELETE FROM genre where genre.genre_id = ($1)`, [id]);
    res.send(genre.rows);
  }
}

module.exports = new GenreController();
