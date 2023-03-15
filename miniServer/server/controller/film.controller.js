const db = require('../db');

class FilmController {
  async createFilm(req, res){
    const {film_name, film_year} = req.body;
    console.log(req.body)
    const newFilm = await db.query(`INSERT INTO films (film_name, film_year) values ($1, $2) RETURNING *`, [film_name, film_year])
    res.send(newFilm.rows[0]);
  }

  async getFilms(req, res){
    const films = await db.query(`SELECT * FROM films`);
    const genres = await db.query(`SELECT * from genre`);
    const connections = await db.query(`SELECT * from films_genre`);
    films.rows.forEach(film => {
      film.genre = [];
      connections.rows.forEach(connection => {
        if(connection.film_id === film.film_id){
          film.genre.push(genres.rows[connection.genre_id - 1].genre_name);
        }
      })
    })
    res.send(films.rows);
  }

  async getOneFilm(req, res){
    const film_id = req.params.id;
    const films = await db.query(`SELECT * FROM films`);
    const genres = await db.query(`SELECT * from genre`);
    const connections = await db.query(`SELECT * from films_genre`);
    films.rows.forEach(film => {
      film.genre = [];
      connections.rows.forEach(connection => {
        if(connection.film_id === film.film_id){
          film.genre.push(genres.rows[connection.genre_id - 1].genre_name);
        }
      })
    })
    films.rows.forEach(film => {
      if(film.film_id === +film_id){
        res.send(film);
      }
    })
  }

  async updateFilm(req, res){
    const {film_id, film_name, film_year} = req.body;
    const film = await db.query(`UPDATE films set film_name = $1, film_year = $2 WHERE film_id = $3 RETURNING *`,
      [film_name, film_year, film_id]);
    const deleteGen = await db.query(`DELETE FROM films_genre WHERE film_id = $1`, [film_id]);
    res.send(film.rows);
  }

  async deleteFilm(req, res){
    const film_id = req.params.id;
    const deleteGen = await db.query(`DELETE FROM films_genre WHERE film_id = $1`, [film_id]);
    const film = await db.query(`DELETE FROM films where films.film_id = ($1)`, [film_id]);
    res.send(film.rows);
  }
}

module.exports = new FilmController();
