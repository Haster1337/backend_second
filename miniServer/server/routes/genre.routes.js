const Router = require('../framework/Router');
const genreController = require('../controller/genre.controller');

const router = new Router();

router.post('/genres', genreController.createGenre);
router.get('/genres', genreController.getGenres);
router.get('/genres:id', genreController.getOneGenre);  // для получения нужно ввести /genres:id?(*)
                                                             // * - номер id элемента
router.put('/genres', genreController.updateGenre);
router.delete('/genres:id', genreController.deleteGenre);
//реализовать связь c genre и при смене жанра менять и инфу в таблице films_genre

module.exports = router;