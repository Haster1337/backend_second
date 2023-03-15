const Router = require('../framework/Router');
const filmController = require('../controller/film.controller');

const router = new Router();

router.post('/films', filmController.createFilm);
router.get('/films', filmController.getFilms);
router.get('/films:id', filmController.getOneFilm);  // для получения нужно ввести /genres:id?(*)
                                                          // * - номер id элемента
router.put('/films', filmController.updateFilm);
router.delete('/films:id', filmController.deleteFilm);
//реализовать связь c genre и при смене жанра менять и инфу в таблице films_genre

module.exports = router;