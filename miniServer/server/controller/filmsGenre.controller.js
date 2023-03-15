const db = require('../db');

class FilmsGenreController {
  async createConnection(req, res){
    const {film_id, genre_id} = req.body;
    const newConnection = await db.query(`INSERT INTO films_genre (film_id, genre_id) values ($1, $2) RETURNING *`, [film_id, genre_id])
    res.send(newConnection.rows[0]);
  }

  async getConnections(req, res){
    const connections = await db.query(`SELECT * FROM films_genre`);
    res.send(connections.rows);
  }

  async getOneConnection(req, res){
    const id = req.params.id
    const connection = await db.query(`SELECT * FROM films_genre WHERE films_genre_id = ($1)`, [id]);
    res.send(connection.rows);
  }

  async updateConnection(req, res){
    const {connectionID, filmID, genreID} = req.body;
    const connection = await db.query(`UPDATE films_genre set film_id = $1, genre_id = $2 WHERE films_genre_id = $3 RETURNING *`,
      [filmID, genreID, connectionID])
    res.send(connection.rows[0]);
  }

  async deleteConnection(req, res){
    const id = req.params.id
    const film = await db.query(`DELETE FROM films_genre WHERE films_genre_id = ($1)`, [id]);
    res.send(film.rows);
  }
}

module.exports = new FilmsGenreController();
