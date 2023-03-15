const Router = require('../framework/Router');
const filmsGenreController = require('../controller/filmsGenre.controller');

const router = new Router();

router.post('/connections', filmsGenreController.createConnection);
router.get('/connections', filmsGenreController.getConnections);
router.get('/connections:id', filmsGenreController.getOneConnection);  // для получения нужно ввести /genres:id?(*)
// * - номер id элемента
router.put('/connections', filmsGenreController.updateConnection);
router.delete('/connections:id', filmsGenreController.deleteConnection);

module.exports = router;